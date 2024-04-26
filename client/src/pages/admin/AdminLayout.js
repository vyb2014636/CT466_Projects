import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { AdminSidebar, HeaderAdmin } from "components";

const AdminLayout = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  if (!isLoggedIn || !currentUser || +currentUser.role !== 1945)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="flex w-full bg-[#F9FAFB] min-h-screen relative gap-1">
      <div className="w-[327px] fixed top-0 bottom-0 flex-none">
        <AdminSidebar />
      </div>
      <div className="w-[327px] "></div>
      <div className="flex-auto flex flex-col gap-8">
        <div className="">
          <HeaderAdmin />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
