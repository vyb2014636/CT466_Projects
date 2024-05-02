import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "ultils/path";
const TopHeader = () => {
  return (
    <div className="w-full flex justify-center bg-[#474747] h-[3rem]">
      <div className="w-main">
        <div className="flex justify-between items-center h-full">
          <div className="lg:w-1/2 md:w-[55%]">
            <p className="text-white">Free shipping, 30-day return or refund guarantee.</p>
          </div>
          <div className="lg:w-1/2 md:w-[44%] text-right flex gap-2 justify-end">
            <Link to={`/${path.LOGIN}`} className="text-white font-normal  text-[1rem] tracking-[2px] hover:text-orange-500">
              SIGN IN
            </Link>
            <Link to={`/${path.FAQS}`} className="text-white font-normal  text-[1rem] tracking-[2px] hover:text-orange-500">
              FAQS
            </Link>
            <span className=" text-white font-normal  text-[1rem] tracking-[2px] hover:text-orange-500">USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);
