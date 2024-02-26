const routerUser = require("express").Router();
const user = require("../controllers/user"); // tương tác với controller user

routerUser.get("/", user.getUser);
//

module.exports = routerUser;
