const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Vui lòng nhập vào loại danh mục");
  const respone = await Category.create(req.body);
  return res.status(200).json({
    success: respone ? true : false,
    mes: respone ? respone : "Tạo danh mục thất bại",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const respone = await Category.find();
  const count = respone.length;
  return res.status(200).json({
    success: respone ? true : false,
    categories: count === 0 || !respone ? "Không có danh mục nào" : respone,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Vui lòng nhập vào loại danh mục cần update");
  const respone = await Category.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: respone ? true : false,
    updateCate: respone ? respone : "Update thất bại",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid) throw new Error("Vui lòng chọn danh mục cần sửa");
  const respone = await Category.findByIdAndDelete(cid);
  return res.status(200).json({
    success: respone ? true : false,
    deleteCate: respone ? respone : "Xóa thất bại",
  });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
