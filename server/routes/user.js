const router = require("express").Router();
const userRegis = require("../controllers/user");

router.post("/register", userRegis.register);
router.post("/login", userRegis.login);

module.exports = router;
