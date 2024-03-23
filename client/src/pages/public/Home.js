import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../../apis/";
import { NavLink } from "react-router-dom";
import { Slide, BestSeller, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <Slide />
      <div className="w-main pb-5 text-center">
        <BestSeller />
      </div>
      <div className="w-main pb-5 text-center">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
