import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputFields, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import path from "../../ultils/path";
import { validate } from "../../ultils/helpers";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import icons from "../../ultils/icons";

const { FaGoogle } = icons;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ email: "" });
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
    confirmPassword: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
      confirmPassword: "",
    });
  };
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email: email.email });
    if (response.success) {
      toast.success(response.mes);
    } else toast.info(response.mes);
  };

  //SUBMIT ONCLICK
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
    console.log(invalids);
    if (invalids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload);
        if (response.success) {
          Swal.fire("Chúc mừng", response.mes, "success").then(() => {
            setIsRegister(false);
            resetPayload();
          });
        } else {
          Swal.fire("Thất bại", response.mes, "error");
        }
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(login({ isLoggedIn: true, token: rs.AccessToken, userData: rs.userData }));
          navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Đăng nhập thất bại", rs.mes, "error");
        }
      }
    }
  }, [payload, isRegister]);

  useEffect(() => {
    resetPayload();
    setInvalidFields([]);
  }, [isRegister]);

  return (
    <div className="w-full h-full bg-orange-500 flex flex-col justify-center items-center relative">
      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay z-50 flex justify-center py-8 items-center">
          <div className="bg-white w-[50%] h-[350px] flex flex-col items-center justify-center relative">
            <div className="grid gap-2 text-center w-[50%] mb-4">
              <h1 className="text-3xl font-bold">Quên mật khẩu</h1>
              <p className="text-balance text-muted-foreground">Nhập email bạn đã đăng ký cho tài khoản</p>
            </div>
            <div className="grid gap-4 w-[50%]">
              <div className="grid gap-2">
                <InputFields
                  value={email.email}
                  nameKey="email"
                  nameKeyVN="email"
                  setValue={setEmail}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>
              <Button
                name="Gửi"
                styles="border py-2 rounded-lg font-semibold bg-black text-white"
                fw
                handleOnClick={handleForgotPassword}
              />
            </div>
            <div className="mt-4 text-center text-sm flex ">
              <span
                className="ml-auto text-orange-500 cursor-pointer hover:underline"
                onClick={() => setIsForgotPassword(false)}
              >
                Login?
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="login-header w-full flex justify-center items-center bg-white ">
        <div className="w-main flex h-[90px] py-[35px] justify-between">
          <div className="w-full md:w-1/2 lg:w-1/2 pr-4 flex flex-col items-start justify-center">
            <Link to={`/${path.HOME}`}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col items-end justify-center">
            <Link to={`/${path.BLOGS}`} className="hover:text-orange-500">
              Bạn cần giúp đỡ?
            </Link>
          </div>
        </div>
        <div className="canvas__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
      <div className="login-body w-main my-8 lg:grid lg:min-h-[579px] lg:grid-cols-2 xl:min-h-[579px]">
        <div></div>
        <div className="flex items-center justify-center py-12 bg-white rounded-lg">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{isRegister ? "Đăng ký" : "Đăng nhập"}</h1>
              <p className="text-balance text-muted-foreground">
                Nhập email của bạn dưới đây để đăng nhập vào tài khoản của bạn
              </p>
            </div>
            <div className="grid gap-4">
              {isRegister && (
                <div className="flex gap-2">
                  <div className="grid gap-2">
                    <InputFields
                      value={payload.firstname}
                      nameKey="firstname"
                      nameKeyVN="Họ"
                      setValue={setPayload}
                      invalidFields={invalidFields}
                      setInvalidFields={setInvalidFields}
                    />
                  </div>
                  <div className="grid gap-2">
                    <InputFields
                      value={payload.lastname}
                      nameKey="lastname"
                      nameKeyVN="Tên"
                      setValue={setPayload}
                      invalidFields={invalidFields}
                      setInvalidFields={setInvalidFields}
                    />
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                <InputFields
                  value={payload.email}
                  nameKey="email"
                  nameKeyVN="email"
                  setValue={setPayload}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>
              {isRegister && (
                <div className="grid gap-2">
                  <InputFields
                    value={payload.mobile}
                    nameKey="mobile"
                    nameKeyVN="Số điện thoại"
                    setValue={setPayload}
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                  />
                </div>
              )}
              <div className="grid gap-2 ">
                <InputFields
                  value={payload.password}
                  type="password"
                  nameKey="password"
                  nameKeyVN="Mật khẩu"
                  setValue={setPayload}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>
              {isRegister && (
                <div className="grid gap-2 ">
                  <InputFields
                    value={payload.confirmPassword}
                    type="password"
                    nameKey="confirmPassword"
                    nameKeyVN="Nhập lại mật khẩu"
                    setValue={setPayload}
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                  />
                </div>
              )}
              <Button name={isRegister ? "Đăng ký" : "Đăng nhập"} handleOnClick={handleSubmit} fw />
              <Button
                name="Đăng nhập bằng google"
                iconsBefore={<FaGoogle />}
                styles="border p-2 rounded-lg font-semibold flex items-center justify-center gap-1"
                fw
              />
            </div>
            <div className="mt-4 text-center text-sm flex">
              {!isRegister ? (
                <>
                  Bạn chưa có tài khoản?{" "}
                  <span
                    className="text-orange-500 cursor-pointer hover:underline"
                    onClick={() => {
                      setIsRegister(true);
                    }}
                  >
                    Đăng ký
                  </span>
                </>
              ) : (
                <span
                  className="text-orange-500 cursor-pointer hover:underline"
                  onClick={() => {
                    setIsRegister(false);
                  }}
                >
                  Đi đến đăng nhập?
                </span>
              )}
              <span
                className="ml-auto text-orange-500 cursor-pointer hover:underline"
                onClick={() => setIsForgotPassword(true)}
              >
                Quên mật khẩu?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
