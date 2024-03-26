import React from "react";
import { Slide, BestSeller, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full pb-5 text-center  h-[800px]">
        <Slide />
      </div>
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
