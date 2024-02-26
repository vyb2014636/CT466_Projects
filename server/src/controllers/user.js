const getUser = (req, res) => {
  return res.send("Controller user");
};
const postUser = (req, res) => {
  return res.send("Controller post user");
};
module.exports = {
  getUser,
};
