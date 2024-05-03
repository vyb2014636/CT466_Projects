const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total } = req.body;

  // console.log(products);

  const respone = await Order.create({ products, total, postedBy: _id });
  return res.status(200).json({
    success: respone ? true : false,
    rs: respone ? respone : "Có lỗi",
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
