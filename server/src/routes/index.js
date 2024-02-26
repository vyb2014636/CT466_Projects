const user = require("./user");
const admin = require("./admin");

const router = (app) => {
  app.use("/user", user);
  app.use("/user/register", user);

  app.use("/admin", admin);
  return app.use("/", (req, res) => {
    return res.send("SERVER ONNNNN");
  });
};

module.exports = router;
