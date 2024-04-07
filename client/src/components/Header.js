import React from "react";
import Navigation from "./Navigation";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const Header = () => {
  const { GoSearch, BsCart2, MdFavoriteBorder, FaRegUser } = icons;
  return (
    // <div className="w-main border flex justify-around">
    <div className="w-main flex justify-center pb-5 text-center">
      <div className="flex w-full h-[90px] py-[35px]">
        <div className="w-full md:w-1/4 lg:w-1/4 pr-4 flex flex-col items-start justify-center">
          <div className="header__logo ">
            <Link to={`/${path.HOME}`}>
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>

        <Navigation />

        <div className="w-full md:w-1/4 lg:w-1/4 pl-4 flex flex-col items-end justify-center">
          <div className="header__nav__option flex gap-4 ">
            <Link href="#" className="border-r px-4 search-switch">
              <GoSearch />
              {/* <img src="img/icon/search.png" alt="" /> */}
            </Link>
            <Link href="#" className="border-r px-4">
              {/* <img src="img/icon/heart.png" alt="" /> */}
              <MdFavoriteBorder />
            </Link>
            <Link href="#" className="border-r px-4 relative">
              {/* <img src="img/icon/cart.png" alt="" /> */}
              <BsCart2 />
              <span className="absolute -top-1 right-2 block h-3 w-3 bg-black rounded-full text-white text-xs flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to={`/${path.LOGIN}`} className="border-r px-4">
              {/* <img src="img/icon/cart.png" alt="" /> */}
              <FaRegUser />
            </Link>
          </div>
        </div>
      </div>
      <div className="canvas__open">
        <i className="fa fa-bars"></i>
      </div>
    </div>
  );
};

export default Header;
