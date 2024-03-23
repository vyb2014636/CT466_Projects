import React from "react";
import slide1 from "../assets/hero-1.jpg";
import slide2 from "../assets/hero-2.jpg";

import "../css/slideStyle.css";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Slide = () => {
  return (
    <div className="w-full pb-5 text-center h-[800px]">
      <Slider {...settings} className="h-full">
        <div className="h-full">
          <div
            className="hero__items set-bg h-full"
            style={{
              backgroundImage: `url(${slide1})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
              <div className="flex">
                <div className="xl:w-5/12 lg:w-7/12 md:w-8/12">
                  <div className="hero__text text-start">
                    <h6 className="opacity-100 top-0">Summer Collection</h6>
                    <h2 className="opacity-100 top-0">Fall - Winter Collections 2030</h2>
                    <p className="opacity-100 top-0">
                      A specialist label creating luxury essentials. Ethically crafted with an
                      unwavering commitment to exceptional quality.
                    </p>
                    <a
                      href="#"
                      className="primary-btn bg-black hover:bg-blue-700 text-white font-bold py-2 px-4  opacity-100 top-0"
                    >
                      Shop now <span className="arrow_right"></span>
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full">
          <div
            className="hero__items set-bg h-full"
            style={{
              backgroundImage: `url(${slide2})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
              <div className="flex">
                <div className="xl:w-5/12 lg:w-7/12 md:w-8/12">
                  <div className="hero__text text-start">
                    <h6 className="opacity-100 top-0">Summer Collection</h6>
                    <h2 className="opacity-100 top-0">Fall - Winter Collections 2030</h2>
                    <p className="opacity-100 top-0">
                      A specialist label creating luxury essentials. Ethically crafted with an
                      unwavering commitment to exceptional quality.
                    </p>
                    <a
                      href="#"
                      className="primary-btn bg-black hover:bg-blue-700 text-white font-bold py-2 px-4  opacity-100 top-0"
                    >
                      Shop now <span className="arrow_right"></span>
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
