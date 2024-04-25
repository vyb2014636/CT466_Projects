import React, { memo } from "react";
import Slider from "react-slick";
import { ProductFS } from "components";

const CustomSlider = ({ products, normal, scroll }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: scroll || "5",
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((el, index) => (
            <ProductFS productData={el} key={index} normal={normal} />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
