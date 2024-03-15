const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;
  if (!title || !category || !description) throw new Error("Vui lòng nhập đầy đủ các trường");
  const createBlog = await Blog.create(req.body);
  return res.json({
    success: createBlog ? true : false,
    createdNew: createBlog ? createBlog : "Không tạo được",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body) === 0) throw new Error("Vui lòng nhập đầy đủ các trường");
  const updateBlog = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.json({
    success: updateBlog ? true : false,
    createdNew: updateBlog ? updateBlog : "Không update được",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const findBlog = await Blog.find();
  return res.json({
    success: findBlog ? true : false,
    createdNew: findBlog ? findBlog : "Không tìm được",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Vui lòng nhập id bài blog");
  const blog = await Blog.findById(bid);
  const alreadyDislike = blog?.dislikes?.find((el) => el.toString() === _id);
  if (alreadyDislike) {
    const respone = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
    return res.json({
      success: respone ? true : false,
      respone,
    });
  }

  alreadyLike = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLike) {
    const respone = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
    return res.json({
      success: respone ? true : false,
      respone,
    });
  } else {
    const respone = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
    return res.json({
      success: respone ? true : false,
      respone,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Vui lòng nhập id bài blog");
  const blog = await Blog.findById(bid);
  const alreadyLike = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLike) {
    const respone = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
    return res.json({
      success: respone ? true : false,
      respone,
    });
  }

  alreadydisLike = blog?.dislikes?.find((el) => el.toString() === _id);
  if (alreadydisLike) {
    const respone = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
    return res.json({
      success: respone ? true : false,
      respone,
    });
  } else {
    const respone = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true });
    return res.json({
      success: respone ? true : false,
      respone,
    });
  }
});

const excludedFields = "-refreshToken -password -role -createdAt -updatedAt";
const getOneBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const respone = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
    .populate("likes", "firstname lastname -_id")
    .populate("dislikes", "firstname lastname -_id");
  return res.json({
    success: respone ? true : false,
    respone,
  });
});

module.exports = {
  createNewBlog,
  updateBlog,
  getBlogs,
  likeBlog,
  dislikeBlog,
  getOneBlog,
};
