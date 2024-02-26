const userRoute = require("../routes/user");
//....
const routes = (app) => {
  app.use("/api/user", userRoute);
};

module.exports = routes;
