import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputFields, TopHeader, Button } from "../../components";
import { apiRegister, apiLogin } from "../../apis";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import path from "../../ultils/path";
import icons from "../../ultils/icons";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

const { IoIosMail, IoIosHeartEmpty } = icons;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
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
        dispatch(register({ isLoggedIn: true, token: rs.AccessToken, userData: rs.userData }));
        navigate(`/${path.HOME}`);
        console.log(register.token);
      } else {
        Swal.fire("Đăng nhập thất bại", rs.mes, "error");
      }
    }
  }, [payload, isRegister]);
  return (
    <div className="w-full h-[100%] bg-orange-500 flex flex-col justify-center items-center">
      <TopHeader />
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
      <div className="login-body w-main my-8 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
        <div></div>
        <div className="flex items-center justify-center py-12 bg-white rounded-lg">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{isRegister ? "Register" : "Login"}</h1>
              <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
            </div>
            <div className="grid gap-4">
              {isRegister && (
                <div className="flex gap-2">
                  <div className="grid gap-2">
                    <InputFields value={payload.firstname} nameKey="firstname" setValue={setPayload} />
                  </div>
                  <div className="grid gap-2">
                    <InputFields value={payload.lastname} nameKey="lastname" setValue={setPayload} />
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                <InputFields value={payload.email} nameKey="email" setValue={setPayload} />
              </div>
              {isRegister && (
                <div className="grid gap-2">
                  <InputFields value={payload.mobile} nameKey="mobile" setValue={setPayload} />
                </div>
              )}
              <div className="grid gap-2">
                <InputFields value={payload.password} type="password" nameKey="password" setValue={setPayload} />
              </div>
              <Button name={isRegister ? "Register" : "Login"} handleOnClick={handleSubmit} fw />
              <Button name="Login with Google" styles="border py-2 rounded-lg font-semibold" fw />
            </div>
            <div className="mt-4 text-center text-sm flex ">
              {!isRegister ? (
                <>
                  Don&apos;t have an account?{" "}
                  <span
                    className="text-orange-500 cursor-pointer hover:underline"
                    onClick={() => {
                      setIsRegister(true);
                      resetPayload();
                    }}
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <span
                  className="text-orange-500 cursor-pointer hover:underline"
                  onClick={() => {
                    setIsRegister(false);
                    resetPayload();
                  }}
                >
                  Go to sign in
                </span>
              )}
              <span className="ml-auto text-orange-500 cursor-pointer hover:underline">Forgot your password?</span>
            </div>
          </div>
        </div>
      </div>
      <div className="login-footer w-full mt-auto h-[384px] bg-[#474747]">
        <div className="w-full h-[30%] flex justify-center items-center">
          <div className="w-main flex justify-center items-center h-full ">
            <div className="flex flex-col md:flex-2 h-[40%]  sm:w-full">
              <span className="text-[20px] text-white">SIGN UP TO NEWSLETTER</span>
              <small className="text-[13px] text-white h-full">Subscribe now and receive weekly newletter </small>
            </div>
            <div className="md:flex-1 sm:w-full flex items-center h-[40%]">
              <input
                className="p-4 pr-0 rounded-l-full w-[90%] h-full  bg-[#707070] outline-none text-white placeholder:text-sm placeholder:text-white placeholder:opacity-50"
                type="text"
                name=""
                id=""
                placeholder="Email address"
              />
              <div className="h-full w-[9%] rounded-r-full bg-[#707070] flex items-center justify-center text-white">
                <IoIosMail size={18} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#474747] h-[70%] flex flex-col items-center">
          <div className="w-main flex flex-grow py-10">
            <div className="flex-2 flex flex-col gap-2 ">
              <img className="w-[60%] mb-[1rem]" src={logo} alt="" />
              <span className="text-white w-[60%]">
                The customer is at the heart of our unique business model, which includes design.
              </span>
            </div>
            <div className="flex-2 flex flex-col">
              <h3 className="mb-[1rem] text-[1rem] text-white font-medium border-l-2 border-orange-500 pl-[1rem]">
                About Us
              </h3>
              <span className="text-white">
                <span>Address:</span>
                <span className="opacity-70">Ninh Kieu,TP Can Thơ</span>
              </span>
              <span className="text-white">
                <span>Phone:</span>
                <span className="opacity-70">(+123)56789xxx</span>
              </span>
              <span className="text-white">
                <span>Mail:</span>
                <span className="opacity-70">admin@gmail.com</span>
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="mb-[1rem] text-[1rem]  text-white font-medium border-l-2 border-orange-500 pl-[1rem]">
                Information
              </h3>
              <span className="text-white">Typography</span>
              <span className="text-white">Gallery</span>
              <span className="text-white">Store Location</span>
              <span className="text-white">Contacts</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="mb-[1rem] text-[1rem]  text-white font-medium border-l-2 border-orange-500 pl-[1rem]">
                Who we are
              </h3>
              <span className="text-white">Help</span>
              <span className="text-white">Free Shipping</span>
              <span className="text-white">Return & Exchange</span>
              <span className="text-white">Testimonials</span>
            </div>
          </div>
          <div className="w-main text-yellow-50 h-[10%] ">
            <p className="flex justify-center items-center size-md">
              Copyright ©2024 2020 All rights reserved | This template is made with
              <IoIosHeartEmpty className="text-orange-500 mx-1" /> by
              <a href="https://colorlib.com" target="_blank" className="text-orange-500 mx-1">
                Colorlib
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
