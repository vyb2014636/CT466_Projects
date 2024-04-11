import React, { useEffect } from "react";
import Navigation from "./Navigation";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { getCurrentUser } from "../store/user/asyncAction"; //sẽ chạy vào userSlice để check
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user/userSlice";

const Header = () => {
  const { IoMdSearch, IoCartOutline, MdFavoriteBorder, HiOutlineUser, IoMdLogOut } = icons;
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrentUser());
  }, [dispatch, isLoggedIn]);

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
          <div className="header__nav__option flex justify-center items-center">
            <Link className="border-r px-3 search-switch flex justify-center items-center">
              <IoMdSearch size={18} />
              {/* <img src="img/icon/search.png" alt="" /> */}
            </Link>
            <Link className="border-r px-4 flex justify-center items-center">
              {/* <img src="img/icon/heart.png" alt="" /> */}
              <MdFavoriteBorder size={18} />
            </Link>
            <Link className="border-r px-4 relative">
              {/* <img src="img/icon/cart.png" alt="" /> */}
              <IoCartOutline size={18} />
              <span className="absolute -top-1 right-2  h-3 w-3 bg-black rounded-full text-white text-xs flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to={`/${path.LOGIN}`} className="border-r px-4 flex justify-center items-center gap-2">
              <HiOutlineUser size={18} />
              <span className="font-[15px]">{isLoggedIn ? currentUser?.lastname : "Profiles"}</span>
            </Link>
            {isLoggedIn && (
              <span
                to={`/${path.LOGOUT}`}
                className=" px-4 flex justify-center items-center cursor-pointer"
                onClick={() => dispatch(logout())}
              >
                <IoMdLogOut size={18} />
              </span>
            )}
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
