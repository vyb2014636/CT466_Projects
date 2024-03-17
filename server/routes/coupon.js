const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const Coupon = require("../controllers/couponController");

router.post("/createCoupon", [verifyToken, isAdmin], Coupon.createCoupon);
router.get("/", Coupon.getCoupons);
router.put("/updateCoupon/:bid", [verifyToken, isAdmin], Coupon.updateCoupon);
router.delete("/deleteCoupon/:bid", [verifyToken, isAdmin], Coupon.deleteCoupon);

module.exports = router;
