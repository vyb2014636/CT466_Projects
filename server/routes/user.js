const router = require("express").Router();
const user = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", user.register);
router.get("/finalregister/:token", user.finalRegister);

router.post("/login", user.login);
router.get("/getUser", verifyToken, user.getUser);
router.post("/refreshToken", user.refreshAccessToken);
router.get("/logout", user.logout);
router.post("/forgotpassword", user.forgotPassword);
router.put("/resetpassword", user.resetPassword);
router.get("/", [verifyToken, isAdmin], user.getAllUser);
router.delete("/", [verifyToken, isAdmin], user.deleteUser);
router.put("/updateUser", verifyToken, user.updateUser);
router.put("/updateAddress", verifyToken, user.updateAddressUser);
router.put("/addToCart", verifyToken, user.addToCart);
router.put("/updateUserByAdmin/:userID", [verifyToken, isAdmin], user.updateUser);

module.exports = router;
