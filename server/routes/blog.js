const router = require("express").Router();
const blog = require("../controllers/blogController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", blog.getBlogs);
router.get("/getOneBlog/:bid", blog.getOneBlog);
router.post("/createBlog", [verifyToken, isAdmin], blog.createNewBlog);
router.put("/updateBlog/:bid", [verifyToken, isAdmin], blog.updateBlog);
router.put("/likeBlog/:bid", verifyToken, blog.likeBlog);
router.put("/dislikeBlog/:bid", verifyToken, blog.dislikeBlog);
router.delete("/deleteBlog/:bid", [verifyToken, isAdmin], blog.deleteBlog);

module.exports = router;
