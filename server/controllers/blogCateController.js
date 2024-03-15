const blogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createblogCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Vui lòng nhập vào loại danh mục");
  const respone = await blogCategory.create(req.body);
  return res.status(200).json({
    success: respone ? true : false,
    mes: respone ? respone : "Tạo danh mục thất bại",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const respone = await blogCategory.find().select("title _id");
  const count = respone.length;
  return res.status(200).json({
    success: respone ? true : false,
    categories: count === 0 || !respone ? "Không có danh mục nào" : respone,
  });
});

const updateblogCategory = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Vui lòng nhập vào loại danh mục cần update");
  const respone = await blogCategory.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: respone ? true : false,
    updateCate: respone ? respone : "Update thất bại",
  });
});

const deleteblogCategory = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) throw new Error("Vui lòng chọn danh mục cần sửa");
  const respone = await blogCategory.findByIdAndDelete(bid);
  return res.status(200).json({
    success: respone ? true : false,
    deleteCate: respone ? respone : "Xóa thất bại",
  });
});

module.exports = {
  createblogCategory,
  getCategories,
  updateblogCategory,
  deleteblogCategory,
};
