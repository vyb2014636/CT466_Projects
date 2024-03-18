const router = require("express").Router();
const product = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary.config");

router.post("/", [verifyToken, isAdmin], product.createProduct);
router.get("/getProduct", product.getProduct);
router.put("/ratings", verifyToken, product.ratings);
router.get("/getAllProducts", product.getAllProducts);
router.put("/updateProduct/:pid", [verifyToken, isAdmin], product.updateProduct);
router.delete("/deleteProduct/:pid", [verifyToken, isAdmin], product.deleteProduct);
router.put(
  "/uploadImage/:pid",
  [verifyToken, isAdmin],
  uploadCloud.array("images", 10),
  product.uploadImageProduct
);

module.exports = router;
