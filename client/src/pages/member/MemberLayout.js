import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";
import MemberSidebar from "./MemberSidebar";

const MemberLayout = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  if (!isLoggedIn || !currentUser) return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="w-full">
      <div className="w-full mx-auto border-y-2 py-6">
        <h1 className="text-5xl font-bold text-center pb-12 relative">
          Tài khoản của bạn<span className="absolute top-full w-16 h-1 bg-black left-[50%] translate-x-[-50%]"></span>
        </h1>
      </div>
      <div className="w-main mx-auto flex py-8">
        <div className="w-[25%] ">
          <MemberSidebar />
        </div>
        <div className="w-[75%] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberLayout;
