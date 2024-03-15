const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const Category = require("../controllers/categoryController");

router.post("/createCategory", [verifyToken, isAdmin], Category.createCategory);
router.get("/", Category.getCategories);
router.put("/updateCategory/:cid", [verifyToken, isAdmin], Category.updateCategory);
router.delete("/deleteCategory/:cid", [verifyToken, isAdmin], Category.deleteCategory);

module.exports = router;
