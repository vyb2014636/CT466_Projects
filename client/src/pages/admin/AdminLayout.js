import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { AdminSidebar } from "components";

const AdminLayout = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  if (!isLoggedIn || !currentUser || +currentUser.role !== 1945)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex w-full bg-[#f8f1f1] min-h-screen relative">
      <div className="w-[327px] fixed top-0 bottom-0 flex-none">
        <AdminSidebar />
      </div>
      <div className="w-[327px] "></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
