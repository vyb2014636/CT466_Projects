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
      <div className="w-main mb-8 text-center">
        <Collection />
      </div>
      <div className="w-main mb-8 text-center ">
        <h3 className="text-[1.3rem] font-semibold py-[1rem] border-b-2 border-b-orange-500">Blogs</h3>
      </div>
      <div className="w-main mb-8 text-center">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
