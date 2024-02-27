const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      success: false,
      mes: "Chưa nhập đủ thông tin",
    });
  }
  if (!findUser) {
    const respone = await User.create(req.body);
    return res.status(200).json({
      success: respone ? true : false,
      respone,
    });
  } else {
    throw new Error("Email đã tồn tại");
    // return res.status(350).json({
    //   success: false,
    //   mes: "Email đã tồn tại",
    // });
  }
});

module.exports = {
  register,
};
