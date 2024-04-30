const { response } = require("express");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const slugify = require("slugify");
const product = require("../models/product");

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, brand, category, color } = req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req.files?.images?.map((el) => el.path);
  if (!(title && price && description && brand && category && color)) throw new Error("Vui lòng nhập đủ thông tin");
  req.body.slug = slugify(title);
  if (thumb) req.body.thumb = thumb;
  if (images) req.body.images = images;
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    mes: newProduct ? "Sản phẩm đã được tạo" : "Không tạo được sản phẩm",
  });
});
const getProductId = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await Product.findById(pid)
    .populate("category", "title")
    .populate({
      path: "rating",
      populate: {
        path: "postedBy",
        select: "firstname lastname",
      },
    });
  return res.json({
    success: response ? true : false,
    product: response ? response : "Không tìm thấy sản phẩm",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const queries = { ...req.query }; //tạo ra thêm 1 vùng dữ liệu nữa ở đó queries->vùngDLCopy và req.query->vùngDL ban đầu (Nếu không có ... trước req.query thì cả queries và req.query sẽ -> cùng 1 vùng DL)
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  //Lọc theo filter
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // có nghĩa là nếu toán tử trong chuỗi VD: 'price[gt]' thì nó sẽ chuyển 'price[$gt]' để truy vấn monggo
  let formatQueries = JSON.parse(queryString);
  let colorQueryObject = {};
  if (queries?.category) {
    formatQueries.category = formatQueries.category
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .split("-")
      .join(" ");
    formatQueries.category = { $regex: formatQueries.category, $options: "i" };
  }
  if (queries?.title) formatQueries.title = { $regex: queries.title, $options: "i" }; //Nếu tìm theo tên SP thì ta sẽ thêm vào object formatQueries một key title có thể tìm tương đối bất kể hoa thường
  if (queries?.color) {
    delete formatQueries.color;
    const colorArr = queries.color?.split(",");
    const colorQuery = colorArr.map((el) => ({ color: { $regex: el, $options: "i" } }));
    colorQueryObject = { $or: colorQuery };
  } //Nếu tìm theo tên SP thì ta sẽ thêm vào object formatQueries một key title có thể tìm tương đối bất kể hoa thường
  const queryObject = {};
  if (queries?.q) {
    delete formatQueries.q;
    queryObject = {
      $or: [
        { color: { $regex: queries.q, $options: "i" } },
        { title: { $regex: queries.q, $options: "i" } },
        { category: { $regex: queries.q, $options: "i" } },
        { brand: { $regex: queries.q, $options: "i" } },
        { description: { $regex: queries.q, $options: "i" } },
      ],
    };
  }
  const query = { ...colorQueryObject, ...formatQueries };
  let queryCommand = Product.find(query); //Không cần thực hiện liền vì không có await thì đây chỉ là truy vấn chưa có excute
  //Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API

  //Sort sắp xếp
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy); //sắp xếp default là tăng dần
  }

  //
  //fields chọn theo trường
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  //
  //pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  queryCommand
    .exec()
    .then(async (response) => {
      const counts = await Product.find(query).countDocuments();
      // if (category) {
      //   let Refind;
      //   if (req.query.sort) {
      //     const sortBy = req.query.sort.split(",").join(" ");
      //     Refind = await Product.find(q).populate("category", "title").sort(sortBy);
      //   } else if (req.query.sort) {
      //     const fields = req.query.fields.split(",").join(" ");
      //     Refind = await Product.find(q).populate("category", "title").select(fields);
      //   } else {
      //     Refind = await Product.find(q).populate("category", "title");
      //   }

      //   const capitalizedCategory = category
      //     .replace(/\b\w/g, (char) => char.toUpperCase())
      //     .split("-")
      //     .join(" ");
      //   response = Refind.filter((product) => String(product.category.title) === String(capitalizedCategory));
      //   counts = response.length;
      // }
      return res.status(200).json({
        success: response ? true : false,
        counts,
        products: response ? response : "không tìm thấy cái cần tìm",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        products: err,
      });
    });
});

const getProductsFromCategory = asyncHandler(async (req, res) => {
  const { cate_Id, product_Id } = req.query;
  if (!cate_Id) throw new Error("Chưa có thể loại");
  const populatedProducts = await Product.find().populate("category", "title");
  let findProducts = populatedProducts.filter((product) => String(product.category._id) === String(cate_Id));
  findProducts = findProducts.filter((product) => String(product._id) !== String(product_Id));

  return res.status(200).json({
    success: findProducts ? true : false,
    relateProducts: findProducts ? findProducts : "Khong tim thay san pham",
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const findProducts = await Product.find();
  return res.status(200).json({
    success: findProducts ? true : false,
    products: findProducts ? findProducts : "Khong tim thay san pham",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updateProduct = await Product.findByIdAndUpdate({ _id: pid }, req.body, { new: true });
  return res.status(200).json({
    success: updateProduct ? true : false,
    detailProduct: updateProduct ? updateProduct : "Khong tim thay san pham can update",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const findProduct = await Product.findById({ _id: pid });
  const findDeleteProduct = await Product.findByIdAndDelete({ _id: pid });
  return res.status(200).json({
    success: findDeleteProduct ? true : false,
    detailProduct: findDeleteProduct
      ? `Xóa thành công sản phẩm '${upperCase(findProduct.title)}'`
      : "Sản phẩm cần xóa không tìm thấy",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid, updatedAt } = req.body;
  if (!star || !pid) throw new Error("Bạn chưa đánh giá sao hoặc chưa chọn sản phẩm");
  const findProductRating = await Product.findById(pid);
  const alreadyIdRating = findProductRating?.rating?.find((el) => el.postedBy.toString() === _id);
  if (alreadyIdRating) {
    await Product.updateOne(
      {
        rating: { $elemMatch: alreadyIdRating }, //nó sẽ tìm trong ratings những phần tử tương ứng với alreadyRating
      },
      {
        $set: { "rating.$.star": star, "rating.$.comment": comment, "rating.$.updatedAt": updatedAt }, // .$ tương ứng với elementMatch tìm được trong csdl
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { rating: { star, comment, postedBy: _id, updatedAt } },
      },
      { new: true }
    );
  }

  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct.rating.length;
  const sumRatings = updatedProduct.rating.reduce((sum, el) => +sum + +el.star, 0); // tính tổng số sao của sản phẩm
  updatedProduct.totalsRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatedProduct.save();

  return res.status(200).json({
    success: true,
    mes: "Đánh giá thành công",
    updatedProduct,
  });
});

const uploadImageProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Chưa có files");
  const respone = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    success: respone ? true : false,
    updatedImageProduct: respone ? respone : "Không thể upload ảnh sản phẩm",
  });
});
module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImageProduct,
  getProductId,
  getProductsFromCategory,
};
