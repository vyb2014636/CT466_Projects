const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const Brand = require("../controllers/brandController");

router.post("/createBrand", [verifyToken, isAdmin], Brand.createBrand);
router.get("/", Brand.getBrands);
router.put("/updateBrand/:bid", [verifyToken, isAdmin], Brand.updateBrand);
router.delete("/deleteBrand/:bid", [verifyToken, isAdmin], Brand.deleteBrand);

module.exports = router;
