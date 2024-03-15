const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const blogCategory = require("../controllers/blogCateController");

router.post("/createblogCategory", [verifyToken, isAdmin], blogCategory.createblogCategory);
router.get("/", blogCategory.getCategories);
router.put("/updateblogCategory/:bid", [verifyToken, isAdmin], blogCategory.updateblogCategory);
router.delete("/deleteblogCategory/:bid", [verifyToken, isAdmin], blogCategory.deleteblogCategory);

module.exports = router;
