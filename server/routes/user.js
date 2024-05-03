const router = require("express").Router();
const user = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary.config");

router.post("/register", user.register);
router.put("/finalregister/:token", user.finalRegister);

router.post("/login", user.login);
router.get("/getUser", verifyToken, user.getUser);
router.post("/refreshToken", user.refreshAccessToken);
router.get("/logout", user.logout);
router.post("/forgotpassword", user.forgotPassword);
router.put("/resetpassword", user.resetPassword);
router.get("/", [verifyToken, isAdmin], user.getAllUser);
router.delete("/:uid", [verifyToken, isAdmin], user.deleteUser);
router.put("/updateUser", verifyToken, uploadCloud.single("avatar"), user.updateUser);
router.put("/updateAddress", verifyToken, user.updateAddressUser);
router.put("/addToCart", verifyToken, user.addToCart);
router.delete("/removeProductCart/:pid", verifyToken, user.removeProductCart);
router.put("/updateUserByAdmin/:uid", [verifyToken, isAdmin], user.updateUserByAdmin);

module.exports = router;
