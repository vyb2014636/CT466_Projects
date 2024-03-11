const userRoute = require("./user");
const productRoute = require("./product");

const { notFound, errHandler } = require("../middlewares/errorHandler");
//....
const routes = (app) => {
  app.use("/api/user", userRoute);
  app.use("/api/product", productRoute);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = routes;
