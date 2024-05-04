import React from "react";
import { Slide, BestSeller, Sidebar, FlashSales, Collection } from "components";
import { useSelector } from "react-redux";
const Home = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-main mb-8 text-center  h-[40rem]">
        <Slide />
      </div>
      <div className="w-main mb-8 text-center ">
        <BestSeller />
      </div>
      <div className="w-main mb-8 text-center">
        <FlashSales />
      </div>
    </div>
  );
};

export default Home;
