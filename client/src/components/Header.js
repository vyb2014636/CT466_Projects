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
    <div className="container flex justify-center">
      <div className="border w-main flex  h-[110px] py-[35px]">
        <div className="w-full md:w-1/4 lg:w-1/4 px-4 flex flex-col items-center justify-center">
          <div className="header__logo ">
            <Link to={`/${path.HOME}`}>
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>

        <Navigation />

        <div className="w-full md:w-1/4 lg:w-1/4 px-4 flex flex-col items-center justify-center">
          <div className="header__nav__option flex gap-4 ">
            <a href="#" className="border-r px-4 search-switch">
              <GoSearch />
              {/* <img src="img/icon/search.png" alt="" /> */}
            </a>
            <a href="#" className="border-r px-4">
              {/* <img src="img/icon/heart.png" alt="" /> */}
              <MdFavoriteBorder />
            </a>
            <a href="#" className="border-r px-4 relative">
              {/* <img src="img/icon/cart.png" alt="" /> */}
              <BsCart2 />
              <span className="absolute -top-1 right-2 block h-3 w-3 bg-black rounded-full text-white text-xs flex items-center justify-center">
                0
              </span>
            </a>
            <a href="#" className="border-r px-4">
              {/* <img src="img/icon/cart.png" alt="" /> */}
              <FaRegUser />
            </a>
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
