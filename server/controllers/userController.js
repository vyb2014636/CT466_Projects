const { response } = require("express");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt");
const { Error } = require("mongoose");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const sendMail = require("../untils/sendMails");
const crypto = require("crypto");
const makeToken = require("uniqid");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;

  if (!email || !password || !firstname || !lastname || !mobile)
    return res.status(400).json({
      success: false,
      mes: "Chưa nhập đủ thông tin",
    });

  const findUser = await User.findOne({ email: email });
  if (findUser) {
    throw new Error("Email đã tồn tại");
  } else {
    const token = makeToken();
    const emailBTOA = btoa(email) + "@" + token;
    const newUser = await User.create({ email: emailBTOA, password, firstname, lastname, mobile });
    if (newUser) {
      const html = `<h2>Đây là mã xác minh đăng ký tài khoản của bạn: ${token}</h2>`;
      await sendMail({ email, html, subject: "Hoàn tất đăng ký tài khoản cho Local Brand" });
    }
    setTimeout(async () => {
      await User.deleteOne({ email: emailBTOA });
    }, 60000);

    return res.json({
      success: newUser ? true : false,
      mes: newUser ? "Vui lòng kiểm tra email của bạn" : "Đăng ký thất bại",
    });
  }
});

const finalRegister = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const activeEmail = await User.findOne({ email: new RegExp(`${token}$`) });
  if (activeEmail) {
    activeEmail.email = atob(activeEmail?.email?.split("@")[0]);
    activeEmail.save();
  }
  return res.json({
    success: activeEmail ? true : false,
    mes: activeEmail ? "Bạn đã tạo tài khoản thành công" : "OTP không hợp lệ",
  });
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
  const findUser = await User.findById({ _id: _id })
    .select("-refreshToken -password")
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "title thumb price quantity varriants",
      },
    });
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
    newAccessToken: checkToken ? generateAccessToken(result._id, result.role) : "RefreshToken không khớp",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie && !cookie.RefreshToken) throw new Error("Hiện chưa đăng nhập");

  await User.findOneAndUpdate({ refreshToken: cookie.RefreshToken }, { refreshToken: "" }, { new: true });

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
  const { email } = req.body;

  if (!email) throw new Error("Quên nhập email!");
  findUser = await User.findOne({ email });

  if (!findUser) throw new Error("Email không hợp lệ!");
  const ResetToken = findUser.createPasswordChangedToken();

  await findUser.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu. Link này sẽ hết hạn sau 15p kể từ bây giờ. <a href = ${process.env.CLIENT_URL}/reset-password/${ResetToken} >click here </a>`;

  data = {
    email,
    html,
    subject: "Quên mật khẩu",
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: rs.response?.includes("OK") ? true : false,
    mes: rs.response?.includes("OK") ? "Hãy kiểm tra mail của bạn để tìm mật khẩu." : "Đã có lỗi hãy thử lại sau.",
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
  const queries = { ...req.query }; //tạo ra thêm 1 vùng dữ liệu nữa ở đó queries->vùngDLCopy và req.query->vùngDL ban đầu (Nếu không có ... trước req.query thì cả queries và req.query sẽ -> cùng 1 vùng DL)
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  //Lọc theo filter
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // có nghĩa là nếu toán tử trong chuỗi VD: 'price[gt]' thì nó sẽ chuyển 'price[$gt]' để truy vấn monggo
  const formatQueries = JSON.parse(queryString);

  let queryCommand = User.find(formatQueries); //Không cần thực hiện liền vì không có await thì đây chỉ là truy vấn chưa có excute
  //Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API

  //Sort sắp xếp
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy); //sắp xếp default là tăng dần
  }

  //
  //fields chọn theo trường
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  //
  //pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  queryCommand
    .exec()
    .then(async (response) => {
      let counts = await User.find(formatQueries).countDocuments();

      return res.status(200).json({
        success: response ? true : false,
        counts,
        users: response ? response : "không tìm thấy người dùng",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        users: err,
      });
    });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;

  if (!uid) throw new Error("Chưa chọn id muốn xóa");

  const findUser = await User.findByIdAndDelete(uid);

  return res.status(200).json({
    success: findUser ? true : false,
    mes: findUser ? `Người dùng ${findUser.email} đã được xóa` : "xóa thất bại",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { firstname, lastname, email, mobile } = req.body;
  const data = { firstname, lastname, email, mobile };
  if (req.file) data.avatar = req.file.path;
  if (!_id || Object.keys(req.body).length === 0) throw new Error("Chưa có dữ liệu cần update");

  const response = await User.findByIdAndUpdate(_id, data, {
    new: true,
  }).select("-role -password -refreshToken");

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "cập nhật thành công" : "Cập nhật thất bại",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid || Object.keys(req.body).length === 0) throw new Error("Chưa có dữ liệu cần update");

  const findUpdate = await User.findByIdAndUpdate(uid, req.body, {
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
  const { pid, quantity = 1, color, size = "M", price, thumbnail, title } = req.body;

  if (!pid || !color) throw new Error("Missing input");

  let cartUser = await User.findById(_id).select("cart");

  const alreadyProductCart = cartUser?.cart?.find((el) => el.product.toString() === pid && el.color === color && el.size === size);

  if (alreadyProductCart && alreadyProductCart?.color === color && alreadyProductCart?.size === size) {
    const response = await User.updateOne(
      { cart: { $elemMatch: alreadyProductCart } },
      {
        $set: {
          "cart.$.quantity": +alreadyProductCart.quantity + +quantity,
          "cart.$.price": price,
          "cart.$.size": size,
          "cart.$.thumbnail": thumbnail,
          "cart.$.title": title,
          "cart.$.size": size,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Thêm thành công" : "failed",
    });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          cart: {
            product: pid,
            title,
            quantity,
            color,
            size,
            price,
            thumbnail,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Thêm thành công" : "failed",
    });
  }
});
const removeProductCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, color, size } = req.params;

  if (!pid) throw new Error("Không tìm thấy");

  const cartUser = await User.findById(_id).select("cart");
  const alreadyProductCart = cartUser?.cart?.find((el) => el.product.toString() === pid && el.color === color && el.size === size);
  if (!alreadyProductCart) {
    return res.status(200).json({
      success: true,
      mes: "Xóa thành công",
    });
  }
  const response = await User.findByIdAndUpdate(
    _id,
    {
      $pull: {
        cart: {
          product: pid,
          color,
          size,
        },
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    addressIs: response ? "Xóa thành công" : "failed",
  });
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
  finalRegister,
  removeProductCart,
};
