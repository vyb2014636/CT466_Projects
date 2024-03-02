const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      success: false,
      mes: "Chưa nhập đủ thông tin",
    });
  }
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser
        ? "Đăng ký thành công, bạn có thẻ đăng nhập tại đây"
        : "Đăng ký không thành công ",
    });
  } else {
    throw new Error("Email đã tồn tại");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Chưa nhập đủ thông tin",
    });
  }
  const findUser = await User.findOne({ email: email });
  if (findUser && findUser.isCheckPassword(password)) {
    return res.status(200).json({
      success: true,
      userData: findUser,
    });
  } else {
    throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác");
  }
});
module.exports = {
  register,
  login,
};
