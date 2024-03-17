const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expire } = req.body;
  if (Object.keys(req.body).length === 0) throw new Error("Vui lòng nhập vào loại Coupon");
  const respone = await Coupon.create({
    ...req.body,
    expire: Date.now() + +expire * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: respone ? true : false,
    createdCoupon: respone ? respone : "Tạo Coupon thất bại",
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const respone = await Coupon.find().select("-createdAt -updatedAt");
  const count = respone.length;
  return res.status(200).json({
    success: respone ? true : false,
    Coupons: count === 0 || !respone ? "Không có Coupon nào" : respone,
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Vui lòng nhập vào loại Coupon cần update");
  if (req.body.expire) req.body.expire = Date.now() + +req.body.expire * 24 * 60 * 60 * 1000;
  const respone = await Coupon.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: respone ? true : false,
    updatedCoupon: respone ? respone : "Update thất bại",
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) throw new Error("Vui lòng chọn Coupon cần sửa");
  const respone = await Coupon.findByIdAndDelete(bid);
  return res.status(200).json({
    success: respone ? true : false,
    deletedCoupon: respone ? respone : "Xóa thất bại",
  });
});

module.exports = {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
