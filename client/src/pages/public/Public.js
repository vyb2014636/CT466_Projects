import React from "react";
import { Header, TopHeader, Footer } from "../../components";
import { Outlet } from "react-router-dom";
const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
