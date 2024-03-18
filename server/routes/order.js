const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const Order = require("../controllers/orderController");

router.post("/createOrder", [verifyToken], Order.createOrder);

module.exports = router;
