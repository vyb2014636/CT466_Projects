const userRoute = require("../routes/user");
const { notFound, errHandler } = require("../middlewares/errorHandler");
//....
const routes = (app) => {
  app.use("/api/user", userRoute);
  app.use(notFound);
  app.use(errHandler);
};

module.exports = routes;
