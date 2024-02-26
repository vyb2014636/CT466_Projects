const router = require("express").Router();
const userRegis = require("../controllers/user");

router.post("/register", userRegis.register);

module.exports = router;
