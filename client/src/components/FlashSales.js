import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../apis/";
import { CountDown, ProductFS } from "./";
import moment from "moment";
import { secondsToHms } from "../ultils/helpers";
import Slider from "react-slick";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};
let idInterval;

const FlashSales = () => {
  const [ProductsFS, setProductsFS] = useState([]);
  const [Hour, setHour] = useState(0);
  const [Minute, setMinute] = useState(0);
  const [Second, setSecond] = useState(0);
  const [ExpireDeal, setExpireDeal] = useState(false);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 5 });
    if (response.success) {
      setProductsFS(response.products);
      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = secondsToHms(seconds);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchProducts();
  }, [ExpireDeal]);

  useEffect(() => {
    idInterval = setInterval(() => {
      console.log(1);
      if (Second > 0) setSecond((prev) => prev - 1);
      else {
        if (Minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (Hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else setExpireDeal(!ExpireDeal);
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [Second, Minute, Hour, ExpireDeal]);

  return (
    <>
      <div className="w-full md:w-full lg:w-full px-4 flex justify-start items-center ">
        <div className="w-[10%]">
          <img
            className="h-[4rem] object-contain"
            src="https://png.pngtree.com/png-clipart/20200812/ourlarge/pngtree-flash-sale-promotion-big-sale-elements-png-image_2324245.jpg"
            alt="flashSales"
          />
        </div>
        <div className="flex gap-2 w-[20%]  items-center">
          <CountDown number={Hour} unit={"Hour"} />:
          <CountDown number={Minute} unit={"Minute"} />:
          <CountDown number={Second} unit={"Second"} />
        </div>
        <div></div>
      </div>
      <Slider {...settings}>
        {ProductsFS.map((el) => (
          <ProductFS productData={el}></ProductFS>
        ))}
      </Slider>
    </>
  );
};

export default FlashSales;
