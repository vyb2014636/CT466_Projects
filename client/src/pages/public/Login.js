import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputFields, Button, Loading, TopHeader } from "components";
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from "apis";
import Swal from "sweetalert2";
import logo from "assets/logo.png";
import path from "ultils/path";
import { validate } from "ultils/helpers";
import { login } from "store/user/userSlice";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
let idInterval;

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
  const [secondOTP, setSecondOTP] = useState(0);
  const [expireOTP, setExpireOTP] = useState(false);
  const [focus, setFocus] = useState(false);
  const [valueCode, setValueCode] = useState("");
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [searchParams] = useSearchParams();

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

  //CLICK SUBMIT FORGOT PASSWORD
  const handleForgotPassword = async () => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiForgotPassword({ email: email.email });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      setIsForgotPassword(false);
      Swal.fire("Thành công", response.mes, "success");
    } else toast.info(response.mes);
  };
  //SUBMIT REGISTER ONCLICK
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, confirmPassword, ...data } = payload;
    const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          setSecondOTP(59);
          setIsVerifyEmail(true);
        } else {
          Swal.fire("Thất bại", response.mes, "error");
        }
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          if (!rs.userData.isBlocked) {
            dispatch(login({ isLoggedIn: true, token: rs.AccessToken, userData: rs.userData }));
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
            const setTimeoutId = setTimeout(() => {
              dispatch(showModal({ isShowModal: false, modalChildren: null }));
              searchParams.get("redirect") ? navigate(searchParams.get("redirect")) : navigate(`/${path.HOME}`);
            }, 1000);
            return () => {
              clearTimeout(setTimeoutId);
            };
          } else {
            Swal.fire("Thông báo", "Tài khoản của bạn đã bị khóa", "error");
          }
        } else {
          Swal.fire("Đăng nhập thất bại", rs.mes, "error");
        }
      }
    }
  }, [payload, isRegister]);

  //SUBMIT OTP REGISTER
  const handleSubmitOTP = async () => {
    const response = await apiFinalRegister(valueCode);
    if (response.success) {
      Swal.fire("Thành công", response.mes, "success").then(() => {
        setIsVerifyEmail(false);
        setIsRegister(false);
        setValueCode("");
        navigate(`/${path.LOGIN}`);
      });
    } else {
      Swal.fire("Thất bại", response.mes, "error").then(() => {
        setValueCode("");
      });
    }
  };

  //Dùng để xác minh OTP(Mã xác minh)

  useEffect(() => {
    resetPayload();
    setInvalidFields([]);
  }, [isRegister]);
  //Bộ đếm giờ để xác minh email
  useEffect(() => {
    idInterval && clearInterval(idInterval);
  }, [expireOTP]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (secondOTP > 0) setSecondOTP((prev) => prev - 1);
      else setExpireOTP(!expireOTP);
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [secondOTP, expireOTP]);

  return (
    <div className="w-full h-full bg-orange-500 flex flex-col justify-center items-center relative">
      {isVerifyEmail && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay z-50 flex justify-center py-8 items-center">
          <div className="bg-white w-[50%] h-[350px] flex flex-col items-center justify-center relative">
            <div className="grid gap-2 text-center w-[50%] mb-4">
              <h1 className="text-3xl font-bold">Xác minh đăng ký</h1>
              <p className="text-muted-foreground">
                Chúng tôi đã gửi OTP qua email của bạn,vui lòng kiểm tra email trong <span className="font-bold border px-1">{secondOTP}s</span>
                {/* {<CountDown number={secondOTP} unit={"s"} />} */}
              </p>
            </div>
            <div className="grid gap-4 w-[50%]">
              <div className="grid gap-2">
                <div className="w-full flex flex-col relative">
                  <div className="relative">
                    {valueCode?.trim() !== "" || focus ? (
                      <label className="text-[0.7rem] absolute top-[-8px] left-2  block bg-white px-1 animate-slide-top-focus " htmlFor={"OTP"}>
                        {"OTP"?.slice(0, 1)?.toUpperCase() + "OTP"?.slice(1)}
                      </label>
                    ) : (
                      !focus && (
                        <label
                          className="text-[1rem] absolute top-[50%] translate-y-[-50%] left-2 block bg-white px-1 select-none pointer-events-none text-gray-400"
                          htmlFor={"OTP"}
                        >
                          {"OTP"?.slice(0, 1)?.toUpperCase() + "OTP"?.slice(1)}
                        </label>
                      )
                    )}
                    <input
                      type="text"
                      className="w-full border p-2 rounded-lg outline-none"
                      value={valueCode}
                      onChange={(el) => setValueCode(el.target.value)}
                      onFocus={() => {
                        setFocus(true);
                      }}
                      onBlur={() => {
                        setFocus(false);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <Button name="Gửi" styles="border py-2 rounded-lg font-semibold bg-black text-white" fw handleOnClick={handleSubmitOTP} />
            </div>
            <div className="mt-4 text-center text-sm flex ">
              <span
                className="ml-auto text-orange-500 cursor-pointer hover:underline"
                onClick={() => {
                  setIsRegister(true);
                  setIsVerifyEmail(false);
                  setValueCode("");
                  resetPayload();
                }}
              >
                Đăng ký lại
              </span>
            </div>
          </div>
        </div>
      )}

      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay z-40 flex justify-center py-8 items-center">
          <div className="bg-white w-[50%] h-[350px] flex flex-col items-center justify-center relative">
            <div className="grid gap-2 text-center w-[50%] mb-4">
              <h1 className="text-3xl font-bold">Quên mật khẩu</h1>
              <p className="text-balance text-muted-foreground">Nhập email bạn đã đăng ký cho tài khoản</p>
            </div>
            <div className="grid gap-4 w-[50%]">
              <div className="grid gap-2">
                <InputFields value={email.email} nameKey="email" nameKeyVN="email" setValue={setEmail} invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
              </div>
              <Button name="Gửi" styles="border py-2 rounded-lg font-semibold bg-black text-white" fw handleOnClick={handleForgotPassword} />
            </div>
            <div className="mt-4 text-center text-sm flex ">
              <span className="ml-auto text-orange-500 cursor-pointer hover:underline" onClick={() => setIsForgotPassword(false)}>
                Login?
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="login-header w-full flex justify-center items-center bg-white mb-auto ">
        <div className="w-main flex h-[90px] py-[35px] justify-between mb-auto">
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
              <p className="text-balance text-muted-foreground">Nhập email của bạn dưới đây để đăng nhập vào tài khoản của bạn</p>
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
                <InputFields value={payload.email} nameKey="email" nameKeyVN="email" setValue={setPayload} invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
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
              <span className="ml-auto text-orange-500 cursor-pointer hover:underline" onClick={() => setIsForgotPassword(true)}>
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
