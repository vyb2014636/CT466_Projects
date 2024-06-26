const { response } = require("express");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const slugify = require("slugify");
const makeSKU = require("uniqid");
const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, brand, category, color, size } = req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req.files?.images?.map((el) => el.path);
  if (!(title && price && description && brand && category && color && size)) throw new Error("Vui lòng nhập đủ thông tin");

  // Kiểm tra xem có sản phẩm nào trùng tên hay không
  let findProduct = await Product.find({ title: { $regex: title, $options: "i" } });
  if (findProduct.length > 0) {
    throw new Error("Sản phẩm bạn tạo bị trùng tên");
  }

  // Chuyển đổi chuỗi JSON đại diện cho đối tượng size thành mảng các đối tượng size
  const sizeArray = size.map((sizeStr) => JSON.parse(sizeStr));

  // Tạo slug từ title
  const slug = slugify(title);

  // Tạo mới sản phẩm
  const newProduct = await Product.create({
    title,
    price,
    description,
    brand,
    category,
    color,
    size: sizeArray, // Sử dụng mảng các đối tượng size đã được chuyển đổi
    thumb,
    images,
    slug,
  });

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
  const files = req.files;
  if (files?.thumb) req.body.thumb = files?.thumb[0]?.path;

  if (files?.images) req.body.images = files?.images?.map((el) => el.path);
  req.body.size = req.body.size.map((sizeStr) => JSON.parse(sizeStr));
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
  return res.status(200).json({
    success: updateProduct ? true : false,
    mes: updateProduct ? "Cập nhật thành công" : "Không thành công",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const findDeleteProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: findDeleteProduct ? true : false,
    mes: findDeleteProduct ? `Xóa thành công sản phẩm` : "Sản phẩm cần xóa không tìm thấy",
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

const addVarriant = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { title, price, color, size } = req.body; //size là 1 đối tượng {title ,quantity} =size
  const files = req.files;

  // const thumb = req?.files?.thumb[0]?.path;
  // const images = req?.files?.images?.map((el) => el.path);

  if (files?.thumb) thumb = req?.files?.thumb[0]?.path;
  if (files?.images) images = req?.files?.images?.map((el) => el.path);

  if (!(title && price && color && size)) throw new Error("Chưa đủ thông tin");

  let findProduct = await Product.findById(pid);
  if (!findProduct) {
    throw new Error("Không tìm thấy sản phẩm");
  }

  let variant = findProduct.varriants.find((variant) => variant.color === color);
  if (!variant) {
    // Nếu không tìm thấy biến thể với màu đã cho, thêm một biến thể mới vào mảng varriants
    variant = {
      color,
      size: [{ title: size.title, quantity: size.quantity }],
      price,
      title,
      thumb,
      images,
      SKU: makeSKU().toUpperCase(),
    };
    findProduct.varriants.push(variant);
  } else {
    // Kiểm tra xem đã có kích thước đã cho chưa
    const sizeIndex = variant.size.findIndex((sizeObj) => sizeObj.title === size.title);
    if (sizeIndex === -1) {
      // Nếu kích thước không tồn tại, thêm mới vào mảng size
      variant.size.push({ title: size.title, quantity: size.quantity });
    } else {
      // Nếu kích thước đã tồn tại, cập nhật thông tin của nó
      variant.size[sizeIndex].quantity = +variant.size[sizeIndex].quantity + +size.quantity;
    }
  }

  // Lưu lại thông tin sản phẩm sau khi cập nhật
  findProduct = await findProduct.save();

  return res.status(200).json({
    success: true,
    mes: "Thành công",
    product: findProduct, // Trả về thông tin sản phẩm sau khi cập nhật
  });

  // const response = await Product.findByIdAndUpdate(
  //   pid,
  //   {
  //     $push: { varriants: { color, price, title, size, thumb, images, SKU: makeSKU().toUpperCase() } },
  //   },
  //   { new: true }
  // );
  // return res.status(200).json({
  //   success: response ? true : false,
  //   mes: response ? "Thành công" : "Không thể upload ảnh sản phẩm",
  // });
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
  addVarriant,
};
