const Order = require("../models/order");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, orderBy: _id };
  data.total = Math.round(data.total * 25410);
  if (status) data.status = status;
  const response = await Order.create(data);
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "Có lỗi",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;

  if (!status) throw new Error("Bạn cần nhập trạng thái đơn hàng");

  const respone = await Order.findByIdAndUpdate(oid, { status }, { new: true });

  return res.status(200).json({
    success: respone ? true : false,
    updateStatus: respone ? respone : "Có lỗi",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const queries = { ...req.query }; //tạo ra thêm 1 vùng dữ liệu nữa ở đó queries->vùngDLCopy và req.query->vùngDL ban đầu (Nếu không có ... trước req.query thì cả queries và req.query sẽ -> cùng 1 vùng DL)
  const { _id } = req.user;
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  //Lọc theo filter
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // có nghĩa là nếu toán tử trong chuỗi VD: 'price[gt]' thì nó sẽ chuyển 'price[$gt]' để truy vấn monggo
  let formatQueries = JSON.parse(queryString);
  // let colorQueryObject = {};
  // if (queries?.category) {
  //   formatQueries.category = formatQueries.category
  //     .replace(/\b\w/g, (char) => char.toUpperCase())
  //     .split("-")
  //     .join(" ");
  //   formatQueries.category = { $regex: formatQueries.category, $options: "i" };
  // }
  // if (queries?.title) formatQueries.title = { $regex: queries.title, $options: "i" }; //Nếu tìm theo tên SP thì ta sẽ thêm vào object formatQueries một key title có thể tìm tương đối bất kể hoa thường
  // if (queries?.color) {
  //   delete formatQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({ color: { $regex: el, $options: "i" } }));
  //   colorQueryObject = { $or: colorQuery };
  // } //Nếu tìm theo tên SP thì ta sẽ thêm vào object formatQueries một key title có thể tìm tương đối bất kể hoa thường
  // const queryObject = {};
  // if (queries?.q) {
  //   delete formatQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //       // { description: { $regex: queries.q, $options: "i" } },
  //     ],
  //   };
  // }
  const query = { ...formatQueries, orderBy: _id };
  let queryCommand = Order.find(query); //Không cần thực hiện liền vì không có await thì đây chỉ là truy vấn chưa có excute
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
      const counts = await Order.find(query).countDocuments();

      return res.status(200).json({
        success: response ? true : false,
        counts,
        order: response ? response : "không tìm thấy cái cần tìm",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        products: err,
      });
    });
});

const getOrders = asyncHandler(async (req, res) => {
  // const queries = { ...req.query }; //tạo ra thêm 1 vùng dữ liệu nữa ở đó queries->vùngDLCopy và req.query->vùngDL ban đầu (Nếu không có ... trước req.query thì cả queries và req.query sẽ -> cùng 1 vùng DL)
  // const excludedFields = ["page", "sort", "limit", "fields"];
  // excludedFields.forEach((el) => delete queries[el]);

  // //Lọc theo filter
  // let queryString = JSON.stringify(queries);
  // queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // có nghĩa là nếu toán tử trong chuỗi VD: 'price[gt]' thì nó sẽ chuyển 'price[$gt]' để truy vấn monggo
  // let formatQueries = JSON.parse(queryString);
  // // let colorQueryObject = {};
  // // if (queries?.category) {
  // //   formatQueries.category = formatQueries.category
  // //     .replace(/\b\w/g, (char) => char.toUpperCase())
  // //     .split("-")
  // //     .join(" ");
  // //   formatQueries.category = { $regex: formatQueries.category, $options: "i" };
  // // }
  // // if (queries?.title) formatQueries.title = { $regex: queries.title, $options: "i" }; //Nếu tìm theo tên SP thì ta sẽ thêm vào object formatQueries một key title có thể tìm tương đối bất kể hoa thường
  // // if (queries?.color) {
  // //   delete formatQueries.color;
  // //   const colorArr = queries.color?.split(",");
  // //   const colorQuery = colorArr.map((el) => ({ color: { $regex: el, $options: "i" } }));
  // //   colorQueryObject = { $or: colorQuery };
  // // } //Nếu tìm theo tên SP thì ta sẽ thêm vào object formatQueries một key title có thể tìm tương đối bất kể hoa thường
  // // const queryObject = {};
  // // if (queries?.q) {
  // //   delete formatQueries.q;
  // //   queryObject = {
  // //     $or: [
  // //       { color: { $regex: queries.q, $options: "i" } },
  // //       { title: { $regex: queries.q, $options: "i" } },
  // //       { category: { $regex: queries.q, $options: "i" } },
  // //       { brand: { $regex: queries.q, $options: "i" } },
  // //       // { description: { $regex: queries.q, $options: "i" } },
  // //     ],
  // //   };
  // // }
  // const query = { formatQueries };
  // let queryCommand = Order.find(query); //Không cần thực hiện liền vì không có await thì đây chỉ là truy vấn chưa có excute
  // //Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API

  // //Sort sắp xếp
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   queryCommand = queryCommand.sort(sortBy); //sắp xếp default là tăng dần
  // }

  // //
  // //fields chọn theo trường
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   queryCommand = queryCommand.select(fields);
  // }
  // //
  // //pagination
  // const page = +req.query.page || 1;
  // const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  // const skip = (page - 1) * limit;
  // queryCommand.skip(skip).limit(limit);

  // queryCommand
  //   .exec()
  // .then(async (response) => {
  //   const counts = await Order.find(query).countDocuments();

  //   return res.status(200).json({
  //     success: response ? true : false,
  //     counts,
  //     order: response ? response : "không tìm thấy cái cần tìm",
  //   });
  // })
  // .catch((err) => {
  //   return res.status(400).json({
  //     success: false,
  //     products: err,
  //   });
  // });
  const response = await Order.find();
  const counts = response.length;
  return res.status(200).json({
    success: response ? true : false,
    counts,
    order: response ? response : "không tìm thấy cái cần tìm",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
};
