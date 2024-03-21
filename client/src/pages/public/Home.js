import React from "react";
import { Slide, BestSeller } from "../../components";
const Home = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full pb-5 text-center ">
        <Slide />
      </div>
      <div className="w-main pb-5 text-center">
        <BestSeller />
      </div>
      <div className="w-main pb-5 text-center">
        <span>Blog</span>
      </div>
    </div>
  );
};

export default Home;
