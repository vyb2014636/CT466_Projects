import React, { useEffect } from "react";
import Navigation from "./Navigation";
import logo from "assets/logo.png";
import icons from "ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "ultils/path";
import { getCurrentUser } from "store/user/asyncAction"; //sẽ chạy vào userSlice để check
import { useDispatch, useSelector } from "react-redux";
import { logout, clearMessage } from "store/user/userSlice";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Swal from "sweetalert2";
import { Loading } from "components";
import { showModal } from "store/app/appSlice";

const Header = () => {
  const { IoMdSearch, IoCartOutline, MdFavoriteBorder, HiOutlineUser, IoMdLogOut } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, mes } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrentUser());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (mes)
      Swal.fire("Thông báo!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);

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
              <IoMdSearch size={24} />
              {/* <img src="img/icon/search.png" alt="" /> */}
            </Link>
            <Link className="border-r px-4 flex justify-center items-center">
              {/* <img src="img/icon/heart.png" alt="" /> */}
              <MdFavoriteBorder size={24} />
            </Link>
            <Link className="border-r px-4 relative">
              {/* <img src="img/icon/cart.png" alt="" /> */}
              <IoCartOutline size={24} />
              <span className="absolute -top-1 right-2  h-3 w-3 bg-black rounded-full text-white text-xs flex items-center justify-center">
                0
              </span>
            </Link>
            {isLoggedIn && currentUser ? (
              <Link
                to={`/profile/${currentUser?._id}`}
                className="border-r px-4 flex justify-center items-center gap-2"
              >
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],
                    width: 32,
                    height: 24,
                    fontSize: 14,
                  }}
                  className="text-sm"
                >
                  {currentUser?.lastname[0]}
                </Avatar>
              </Link>
            ) : (
              <Link to={`/${path.LOGIN}`} className="border-r px-4 flex justify-center items-center gap-2">
                <HiOutlineUser size={24} />
              </Link>
            )}
            {isLoggedIn && (
              <span
                to={`/${path.LOGOUT}`}
                className=" px-4 flex justify-center items-center cursor-pointer"
                onClick={() => dispatch(logout())}
              >
                <IoMdLogOut size={24} />
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
