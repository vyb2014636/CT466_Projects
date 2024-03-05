const { response } = require("express");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const { Error } = require("mongoose");
const jwt = require("jsonwebtoken");

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

const refreshAccessToken = asyncHandler(async (req, res) => {
  //Lấy refreshtoken từ cookie
  const cookie = req.cookies;
  //check xem có token hay không
  if (!cookie && !cookie.RefreshToken)
    throw new Error("Không tồn tại refreshToken");
  //check token có hợp lệ hay không
  result = await jwt.verify(cookie.RefreshToken, process.env.JWT_SECRET);
  const checkToken = await User.findOne({
    _id: result._id,
    refreshToken: cookie.RefreshToken,
  });
  return res.status(200).json({
    success: checkToken ? true : false,
    newAccessToken: checkToken
      ? generateAccessToken(result._id, result.role)
      : "RefreshToken không khớp",
  });
  // jwt.verify(
  //   cookie.RefreshToken,
  //   process.env.JWT_SECRET,
  //   async (err, decode) => {
  //     if (err) throw new Error("Token đã hết hạn");
  //     const checkToken = await User.findOne({
  //       _id: decode._id,
  //       refreshToken: cookie.RefreshToken,
  //     });
  //     return res.status(200).json({
  //       success: checkToken ? true : false,
  //       newAccessToken: checkToken
  //         ? generateAccessToken(decode._id, decode.role)
  //         : "RefreshToken không khớp",
  //     });
  //   }
  // );
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.RefreshToken) throw new Error("Hiện chưa đăng nhập");
  await User.findOneAndUpdate(
    { refreshToken: cookie.RefreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "logout thành công",
  });
});
module.exports = {
  register,
  login,
  getUser,
  refreshAccessToken,
  logout,
};
