const { response } = require("express");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");

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
//Refresh Token => cấp mới access token
//AccessToken => Xác thực người dùng , phân quyền người dùng
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Chưa nhập đủ thông tin",
    });
  }
  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isCheckPassword(password))) {
    const { password, role, ...userData } = findUser.toObject(); //Do mongo là kiểu plain object nên ta phải dùng hàm toObject để show cho người dùng userData trừ password với role
    //tạo accesstoken
    const AccessToken = generateAccessToken(findUser._id, role);
    //tạo refreshtoken
    const RefreshToken = generateRefreshToken(findUser._id);
    //Lưu refreshToken vào database
    await User.findByIdAndUpdate(
      findUser._id,
      { refreshToken: RefreshToken },
      { new: true }
    );
    //Lưu refreshToken vào cookie
    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      AccessToken,
      userData,
    });
  } else {
    throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const findUser = await User.findById({ _id: _id }).select(
    "-refreshToken -role -password"
  );
  return res.status(200).json({
    success: true,
    rs: findUser ? findUser : "Không tìm thấy người dùng",
  });
});

module.exports = {
  register,
  login,
  getUser,
};
