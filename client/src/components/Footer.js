import React, { memo } from "react";
import icons from "../ultils/icons";

const { IoIosHeartEmpty } = icons;
const Footer = () => {
  return (
    <div className="w-full  mt-auto h-[384px] ">
      <div className="w-full text-yellow-50 bg-[#D5CDCD] h-[30%] flex justify-center items-center">
        <div className="w-main flex justify-center items-center">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-[#474747]">SIGN UP TO NEWSLETTER</span>
            <small className="text-[13px] text-[#353535]">Subscribe now and receive weekly newletter </small>
          </div>
          <input
            className="p-4 rounded-l-full rounded-r-full flex-1 bg-[#e3dddd] outline-none text-[#474747]  placeholder:text-sm placeholder:text-gray-200 placeholder:opacity-50"
            type="text"
            name=""
            id=""
            placeholder="Email address"
          />
        </div>
      </div>
      <div className="w-full bg-[#474747] h-[70%] flex flex-col items-center">
        <div className="w-main text-yellow-50 ">HELLO</div>
        <div className="w-main text-yellow-50 h-[10%] ">
          <p className="flex justify-center items-center size-md">
            Copyright ©2024 2020 All rights reserved | This template is made with
            <IoIosHeartEmpty className="text-red-600 mx-1" /> by
            <a href="https://colorlib.com" target="_blank" className="text-red-600 mx-1">
              Colorlib
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
