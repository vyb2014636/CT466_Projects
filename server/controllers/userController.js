const { response } = require("express");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt");
const { Error } = require("mongoose");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const sendMail = require("../untils/sendMails");
const crypto = require("crypto");

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
    const { password, role, refreshToken, ...userData } = findUser.toObject(); //Do mongo là kiểu plain object nên ta phải dùng hàm toObject để show cho người dùng userData trừ password với role
    //tạo accesstoken
    const AccessToken = generateAccessToken(findUser._id, role);
    //tạo refreshtoken
    const RefreshToken = generateRefreshToken(findUser._id);
    //Lưu refreshToken vào database
    await User.findByIdAndUpdate(findUser._id, { refreshToken: RefreshToken }, { new: true });
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

  const findUser = await User.findById({ _id: _id }).select("-refreshToken -role -password");

  return res.status(200).json({
    success: findUser ? true : false,
    rs: findUser ? findUser : "Không tìm thấy người dùng",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //Lấy refreshtoken từ cookie
  const cookie = req.cookies;
  //check xem có token hay không
  if (!cookie && !cookie.RefreshToken) throw new Error("Không tồn tại refreshToken");
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

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) throw new Error("Quên nhập email!");
  findUser = await User.findOne({ email });

  if (!user) throw new Error("Email không hợp lệ!");
  const ResetToken = findUser.createPasswordChangedToken();

  await findUser.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu. Link này sẽ hết hạn sau 15p kể từ bây giờ. <a href = ${process.env.URI_SERVER}/api/user/reset-password/${ResetToken} >click here </a>`;

  data = {
    email,
    html,
  };
  const rs = await sendMail(data);

  return res.status(200).json({
    success: true,
    rs,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, passwordNew } = req.body;

  if (!token || !passwordNew) throw new Error("Chưa nhập mật khẩu mới hoặc mã xác minh");

  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
  const findUser = await User.findOne({
    passwordResetToken: resetPasswordToken,
    passwordResetExpireToken: { $gt: Date.now() },
  });

  if (!findUser) throw new Error("Đã hết hạn token hoặc chưa đăng nhập");

  findUser.password = passwordNew;
  findUser.passwordResetToken = undefined;
  findUser.passwordChangedAt = Date.now();
  findUser.passwordResetExpireToken = undefined;

  await findUser.save();

  return res.status(200).json({
    success: findUser ? true : false,
    mes: findUser ? "Mật khẩu đã được cập nhật" : "Failed",
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -role -password");

  return res.status(200).json({
    success: response ? true : false,
    user: response,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  if (!_id) throw new Error("Chưa chọn id muốn xóa");

  const findUser = await User.findByIdAndDelete(_id);

  return res.status(200).json({
    success: findUser ? true : false,
    deleteUser: findUser ? `Người dùng ${findUser.email} đã được xóa` : "xóa thất bại",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id || Object.keys(req.body).length === 0) throw new Error("Chưa có dữ liệu cần update");

  const findUpdate = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-role -password");

  return res.status(200).json({
    success: findUpdate ? true : false,
    mes: findUpdate ? "cập nhật thành công" : "Cập nhật thất bại",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId || Object.keys(req.body).length === 0) throw new Error("Chưa có dữ liệu cần update");

  const findUpdate = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  }).select("-role -password");

  return res.status(200).json({
    success: findUpdate ? true : false,
    mes: findUpdate ? "cập nhật thành công" : "Cập nhật thất bại",
  });
});

const updateAddressUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!req.body.address) throw new Error("Bạn chưa nhập địa chỉ");

  const userId = await User.findById(_id);
  const alreadyAddress = userId.address.includes(req.body.address);

  if (alreadyAddress) {
    return res.status(200).json({
      success: false,
      addressIs: "Địa chỉ đã tồn tại",
    });
  } else {
    const respone = await User.findByIdAndUpdate(
      _id,
      { $push: { address: req.body.address } },
      // { $addToSet: { address: req.body.address } }, //Nếu địa chỉ đã tồn tại thì không thêm
      { new: true }
    ).select("-password -role -refreshToken");

    return res.status(200).json({
      success: respone ? true : false,
      addressIs: respone ? respone : "Địa chỉ không được thêm",
    });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;

  if (!pid || !quantity || !color) throw new Error("Missing input");

  const cartUser = await User.findById(_id);
  const alreadyProductCart = cartUser?.cart?.find(
    (el) => el.product.toString() === pid && el.color.toString() === color
  );
  if (alreadyProductCart) {
    // if (alreadyProductCart.color === color) {
    const respone = await User.updateOne(
      { cart: { $elemMatch: alreadyProductCart } },
      { $set: { "cart.$.quantity": +alreadyProductCart.quantity + +quantity } },
      { new: true }
    );

    return res.status(200).json({
      success: respone ? true : false,
      addressIs: respone ? respone : "failed",
    });
    // } else {
    //   const respone = await User.findByIdAndUpdate(
    //     _id,
    //     {
    //       $push: {
    //         cart: {
    //           product: pid,
    //           quantity: quantity,
    //           color: color,
    //         },
    //       },
    //     },
    //     { new: true }
    //   );
    //   return res.status(200).json({
    //     success: respone ? true : false,
    //     addressIs: respone ? respone : "failed",
    //   });
    // }
  } else {
    const respone = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          cart: {
            product: pid,
            quantity: quantity,
            color: color,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: respone ? true : false,
      addressIs: respone ? respone : "failed",
    });
  }
});
module.exports = {
  register,
  login,
  getUser,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getAllUser,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateAddressUser,
  addToCart,
};
