import React from "react";
import slide1 from "assets/hero-1.jpg";
import banner_acc from "assets/banner_acc.jpg";

import "css/slideStyle.css";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 2000,
  cssEase: "ease",
};

const Slide = () => {
  return (
    <Slider {...settings} className="h-full w-full">
      <div>
        <div
          className="hero__items set-bg "
          style={{
            backgroundImage: `url(${banner_acc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        ></div>
      </div>
      <div>
        <div
          className="hero__items set-bg"
          style={{
            backgroundImage: `url(${slide1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className="sm:px-6 lg:pl-[60px] max-w-screen-xl">
            <div className="xl:w-5/12 lg:w-7/12 md:w-8/12">
              <div className="hero__text text-start">
                <h6 className="opacity-100 top-0">Summer Collection</h6>
                <h2 className="opacity-100 top-0">Fall - Winter Collections 2030</h2>
                <p className="opacity-100 top-0">A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.</p>
                <button className="primary-btn bg-black hover:bg-blue-700 text-white font-bold py-2 px-4  opacity-100 top-0">
                  Shop now <span className="arrow_right"></span>
                </button>
                <div className="hero__social">
                  <button>
                    <i className="fa fa-facebook"></i>
                  </button>
                  <button>
                    <i className="fa fa-twitter"></i>
                  </button>
                  <button>
                    <i className="fa fa-pinterest"></i>
                  </button>
                  <button>
                    <i className="fa fa-instagram"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Slide;
