import React from "react";
import { Header, Navigation, Sidebar, Banner, Head, Slide } from "../../components";
const Home = () => {
  return (
    <div className="flex w-main flex-col">
      <div className="w-main pb-5 text-center">
        <Slide />
      </div>
      <div className="w-main pb-5 text-center">
        <span>Best Seller</span>
      </div>
      <div className="w-main pb-5 text-center">
        <span>Blog</span>
      </div>
    </div>
  );
};

export default Home;
