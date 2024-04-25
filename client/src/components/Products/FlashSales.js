import React, { useState, useEffect, memo } from "react";
import { apiGetProducts } from "apis";
import { CountDown, CustomSlider } from "components";
import moment from "moment";
import { secondsToHms } from "ultils/helpers";

let idInterval;

const FlashSales = () => {
  const [ProductsFS, setProductsFS] = useState([]);
  const [Hour, setHour] = useState(0);
  const [Minute, setMinute] = useState(0);
  const [Second, setSecond] = useState(0);
  const [ExpireDeal, setExpireDeal] = useState(false);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 12, page: Math.round() * 5 });
    if (response?.success) {
      setProductsFS(response?.products);
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
    <div className="w-full">
      <div className="w-full md:w-full lg:w-full flex justify-start items-center border-b-4 border-orange-500 py-[15px]">
        <div className="w-[20%]">
          {/* <img
            className="h-[4rem] object-contain"
            src="https://png.pngtree.com/png-clipart/20200812/ourlarge/pngtree-flash-sale-promotion-big-sale-elements-png-image_2324245.jpg"
            alt="flashSales"
          /> */}
          <h2 className="font-semibold text-left text-orange-500 text-[1.5rem]">Flash Sales</h2>
        </div>
        <div className="flex gap-2 w-[20%]  items-center">
          <CountDown number={Hour} unit={"Hour"} />:
          <CountDown number={Minute} unit={"Minute"} />:
          <CountDown number={Second} unit={"Second"} />
        </div>
        <div></div>
      </div>
      <div className="my-4 py-1">
        <CustomSlider products={ProductsFS}></CustomSlider>
      </div>
      <div className="flex justify-between mt-10">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
          className="w-[49%] "
        ></img>
        <div className="flex flex-col justify-between w-[24%] ">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          ></img>
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          ></img>
        </div>
        <img
          className="w-[24%] "
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default memo(FlashSales);
