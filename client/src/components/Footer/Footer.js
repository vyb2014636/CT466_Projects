import React, { memo } from "react";
import icons from "ultils/icons";
import logo from "assets/logo.png";
const { IoIosHeartEmpty, IoIosMail } = icons;
const Footer = () => {
  return (
    <div className="w-full mt-auto h-[384px] bg-[#474747]">
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
  );
};

export default memo(Footer);
