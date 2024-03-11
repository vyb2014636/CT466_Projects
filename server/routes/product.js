const router = require("express").Router();
const product = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyToken, isAdmin], product.createProduct);
router.get("/getProduct", product.getProduct);
router.get("/getAllProducts", product.getAllProducts);
router.put("/updateProduct", [verifyToken, isAdmin], product.updateProduct);
router.delete("/deleteProduct", [verifyToken, isAdmin], product.deleteProduct);

module.exports = router;
