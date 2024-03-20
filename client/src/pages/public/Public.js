import React from "react";
import { Header } from "../../components";
import { Outlet } from "react-router-dom";
const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      Public
      <Header />
      <div className="w-main">
        <Outlet />
      </div>
    </div>
  );
};

export default Public;
