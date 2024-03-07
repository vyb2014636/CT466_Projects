const router = require("express").Router();
const user = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/getUser", verifyToken, user.getUser);
router.post("/refreshToken", user.refreshAccessToken);
router.get("/logout", user.logout);
router.get("/forgotpassword", user.forgotPassword);
router.put("/resetpassword", user.resetPassword);
module.exports = router;
