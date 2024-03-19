const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id).select("cart").populate("cart.product", "title price");

  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));
  // console.log(products);

  let total = userCart?.cart?.reduce((sum, el) => +el.product.price * el.quantity + +sum, 0); //dùng let để có thể gán lại giá trị
  const createData = { products, total, orderBy: _id };
  if (coupon) {
    const selectCoupon = await Coupon.findById(coupon);
    total = Math.round((total * (1 - selectCoupon.discount / 100)) / 1000) * 1000 || total;
    createData.total = total;
    createData.coupon = coupon;
  }

  const respone = await Order.create(createData);
  return res.status(200).json({
    success: respone ? true : false,
    createdOrder: respone ? respone : "Có lỗi",
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
  const { _id } = req.user;

  const respone = await Order.find({ orderBy: _id });

  return res.status(200).json({
    success: respone ? true : false,
    updateStatus: respone ? respone : "Có lỗi",
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const respone = await Order.find();

  return res.status(200).json({
    success: respone ? true : false,
    updateStatus: respone ? respone : "Có lỗi",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
};
