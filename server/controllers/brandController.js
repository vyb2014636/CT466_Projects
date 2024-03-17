const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Vui lòng nhập vào loại brand");
  const respone = await Brand.create(req.body);
  return res.status(200).json({
    success: respone ? true : false,
    createdBrand: respone ? respone : "Tạo brand thất bại",
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const respone = await Brand.find();
  const count = respone.length;
  return res.status(200).json({
    success: respone ? true : false,
    brands: count === 0 || !respone ? "Không có brand nào" : respone,
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Vui lòng nhập vào loại brand cần update");
  const respone = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: respone ? true : false,
    updatedBrand: respone ? respone : "Update thất bại",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) throw new Error("Vui lòng chọn brand cần sửa");
  const respone = await Brand.findByIdAndDelete(bid);
  return res.status(200).json({
    success: respone ? true : false,
    deletedBrand: respone ? respone : "Xóa thất bại",
  });
});

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
