const routerAdmin = require("express").Router();
const admin = require("../controllers/admin"); // tương tác với controller admin

routerAdmin.get("/", admin.getAdmin);

module.exports = routerAdmin;
