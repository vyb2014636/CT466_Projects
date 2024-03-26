import React, { useState } from "react";
import { formatMoney, renderStarFromNumber } from "../ultils/helpers";
import { SelectOption } from "./";
import icons from "../ultils/icons";
const { AiOutlineMenu, IoCart, FaEye } = icons;
const Product = ({ productData, isNew }) => {
  const [isShowOptions, setisShowOptions] = useState(false);
  return (
    <div className="iso-product md:w-1/4 lg:w-1/4 sm:w-1/2 mix new-arrivals px-5 py-4">
      <div
        className="product__item"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setisShowOptions(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setisShowOptions(false);
        }}
      >
        <div className="product__item__pic set-bg  outline-8 relative overflow-hidden">
          <img
            src={
              productData?.thumb ||
              "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg "
            }
            alt=""
          />
          {isNew ? (
            <span className="label absolute top-3 left-0 text-center z-10 bg-black w-[50px] leading-6 text-white tracking-widest border-r border-solid border-black rounded-tr-full rounded-br-full">
              New
            </span>
          ) : (
            <span className="border-r border-solid border-amber-600 rounded-tr-full rounded-br-full label absolute top-3 left-0 text-center z-10 bg-amber-600 w-[55px] leading-6 text-white tracking-widest">
              Sales
            </span>
          )}
          {isShowOptions ? (
            <div className="product__hover absolute right-2 top-2 flex flex-col items-center gap-2 animate-slide-left ">
              <SelectOption icon={<FaEye />} />
              <SelectOption icon={<IoCart />} />
              <SelectOption icon={<AiOutlineMenu />} />
            </div>
          ) : (
            <div className="product__hover absolute right-2 top-2 flex flex-col items-center gap-2 animate-slide-left-reverse ">
              <SelectOption icon={<FaEye />} />
              <SelectOption icon={<IoCart />} />
              <SelectOption icon={<AiOutlineMenu />} />
            </div>
          )}
        </div>
        <div className="product__item__text flex flex-col items-start pt-4 gap-2">
          {isShowOptions ? (
            <div className="add-cart text-red-800 animate-slide-bottom cursor-pointer">
              + Add To Cart
            </div>
          ) : (
            <h6 className="line-clamp-1  font-semibold text-left text-[15px] ">
              {productData?.title}
            </h6>
          )}
          <h5 className="font-bold">{`${formatMoney(productData?.price)} VNĐ`}</h5>
          <span className="rating flex h-4">
            {renderStarFromNumber(productData?.totalsRatings)}
          </span>
          <div className="product__color__select">
            {/* <label for="pc-1"> */}
            {/* <input type="radio" id="pc-1"> */}
            {/* </label> */}
            {/* <label className="active black" for="pc-2"> */}
            {/* <input type="radio" id="pc-2"> */}
            {/* </label> */}
            {/* <label className="grey" for="pc-3"> */}
            {/* <input type="radio" id="pc-3"> */}
            {/* </label> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
