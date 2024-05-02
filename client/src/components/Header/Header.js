import React, { useEffect, Fragment } from "react";
import { Cart, Loading, Navigation } from "components";
import logo from "assets/logo.png";
import icons from "ultils/icons";
import path from "ultils/path";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "store/user/asyncAction"; //sẽ chạy vào userSlice để check
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "store/user/userSlice";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import Profiles from "./Profiles";

const Header = () => {
  const { IoMdSearch, MdFavoriteBorder, HiOutlineUser } = icons;
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
              <IconButton>
                <IoMdSearch size={24} />
              </IconButton>
            </Link>
            {isLoggedIn && currentUser ? (
              <Fragment>
                <Link className="border-r px-4 flex justify-center items-center">
                  <IconButton>
                    {/* aria-describedby={id} variant="contained" onClick={handleClick} */}
                    <MdFavoriteBorder size={24} />
                  </IconButton>
                </Link>
                <Link className="border-r px-4 relative">
                  <Cart />
                </Link>
                <Link className="border-r px-4 flex justify-center items-center gap-2 ">
                  <Profiles role={currentUser?.role} currentLogin={currentUser} />
                </Link>
              </Fragment>
            ) : (
              <Link to={`/${path.LOGIN}`} className="border-r px-4 flex justify-center items-center gap-2">
                <HiOutlineUser size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
