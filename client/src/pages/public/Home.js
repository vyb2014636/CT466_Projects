import React from "react";
import { Slide, BestSeller, Sidebar, FlashSales } from "../../components";

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-main mb-8 text-center  h-[30rem]">
        <Slide />
      </div>
      <div className="w-main mb-8 text-center ">
        <BestSeller />
      </div>
      <div className="w-main mb-8 text-center">
        <FlashSales />
      </div>
      <div className="w-main mb-8 text-center">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
