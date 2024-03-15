const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Vui lòng nhập thông tin sản phẩm");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "Không tạo được sản phẩm",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const queries = { ...req.query }; //tạo ra thêm 1 vùng dữ liệu nữa ở đó queries->vùngDLCopy và req.query->vùngDL ban đầu (Nếu không có ... trước req.query thì cả queries và req.query sẽ -> cùng 1 vùng DL)
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  //Lọc theo filter
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // có nghĩa là nếu toán tử trong chuỗi VD: 'price[gt]' thì nó sẽ chuyển 'price[$gt]' để truy vấn monggo
  const formatQueries = JSON.parse(queryString);
  if (queries?.title) formatQueries.title = { $regex: queries.title, $options: "i" }; //Nếu tìm theo tên SP thì ta sẽ thêm vào object formatQueries một key title có thể tìm tương đối bất kể hoa thường
  let queryCommand = Product.find(formatQueries); //Không cần thực hiện liền vì không có await thì đây chỉ là truy vấn chưa có excute
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
    .then(async (respone) => {
      const counts = await Product.find(formatQueries).countDocuments();
      if (counts === 0)
        return res.status(400).json({
          success: false,
          mes: "không tìm thấy sản phẩm",
        });
      return res.status(200).json({
        success: respone ? true : false,
        counts,
        products: respone ? respone : "không tìm thấy cái cần tìm",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        products: error,
      });
    });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const findProducts = await Product.find();
  return res.status(200).json({
    success: findProducts ? true : false,
    detailProduct: findProducts ? findProducts : "Khong tim thay san pham",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.query;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updateProduct = await Product.findByIdAndUpdate({ _id: pid }, req.body, { new: true });
  return res.status(200).json({
    success: updateProduct ? true : false,
    detailProduct: updateProduct ? updateProduct : "Khong tim thay san pham can update",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.query;
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
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Bạn chưa đánh giá sao hoặc chưa chọn sản phẩm");
  const findProductRating = await Product.findById(pid);
  const alreadyIdRating = findProductRating?.rating?.find((el) => el.postedBy.toString() === _id);
  if (alreadyIdRating) {
    // const updateRatingBy = await Product.findByIdAndUpdate(pid, {
    //   ratings: { star, comment, postedBy: _id },
    // });
    await Product.updateOne(
      {
        rating: { $elemMatch: alreadyIdRating }, //nó sẽ tìm trong ratings những phần tử tương ứng với alreadyRating
      },
      {
        $set: { "rating.$.star": star, "rating.$.comment": comment }, // .$ tương ứng với elementMatch tìm được trong csdl
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { rating: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
  }

  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct.rating.length;
  const sumRatings = updatedProduct.rating.reduce((sum, el) => +sum + +el.star, 0); // tính tổng số sao của sản phẩm
  updatedProduct.totalsRatings = Math.round((sumRatings * 10) / ratingCount) / 10;

  console.log(Math.round((sumRatings * 10) / ratingCount) / 10);
  await updatedProduct.save();

  return res.status(200).json({
    success: true,
    mes: "Đánh giá thành công",
    updatedProduct,
  });
});
module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  ratings,
};
