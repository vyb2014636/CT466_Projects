const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const Order = require("../controllers/orderController");

router.post("/createOrder", [verifyToken], Order.createOrder);
router.put("/updateStatus/:oid", [verifyToken, isAdmin], Order.updateStatus);
router.get("/getUserOrder", verifyToken, Order.getUserOrder);
router.get("/getOrderByAdmin", [verifyToken, isAdmin], Order.getOrders);

module.exports = router;
