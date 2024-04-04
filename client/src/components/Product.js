import React, { useState } from "react";
import { formatMoney, renderStarFromNumber } from "../ultils/helpers";
import { SelectOption } from "./";
import { motion } from "framer-motion"; // Import motion từ framer-motion
import icons from "../ultils/icons";
const { AiOutlineMenu, IoCart, FaEye } = icons;

const Product = ({ productData, isNew }) => {
  const [isShowOptions, setisShowOptions] = useState(false);

  return (
    <motion.div // Thay thế div bằng motion.div
      className="iso-product md:w-1/4 lg:w-1/5 sm:w-1/2 mix new-arrivals px-5 py-4"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }} // Thêm hiệu ứng scale khi rê chuột vào
    >
      <div
        className="product__item flex flex-col "
        style={{
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.12), 0 -2px 2px 0 rgba(0,0,0,.04)",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setisShowOptions(true);
        }} // Loại bỏ tham số event không cần thiết
        onMouseLeave={() => setisShowOptions(false)} // Loại bỏ tham số event không cần thiết
      >
        <div className="product__item__pic set-bg  outline-8 relative overflow-hidden flex-none h-[60%]">
          <img
            src={
              productData?.thumb ||
              "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg "
            }
            className="object-contain"
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
          <motion.div // Thay thế div bằng motion.div
            className="product__hover absolute top-2 right-2 flex flex-col items-center gap-2 "
            initial={{ opacity: 0, x: 30 }} // Ban đầu ẩn và đặt vị trí x là 0
            animate={{ opacity: isShowOptions ? 1 : 0, x: isShowOptions ? 0 : 30 }} // Thêm animation cho việc hiển thị và ẩn options
            transition={{ duration: 0.4 }}
            whileHover={{ x: 0 }}
          >
            <SelectOption icon={<FaEye />} />
            <SelectOption icon={<IoCart />} />
            <SelectOption icon={<AiOutlineMenu />} />
          </motion.div>
        </div>
        <div className="product__item__text flex flex-col items-start pt-4 px-2 gap-2 flex-grow">
          {isShowOptions ? (
            <motion.div // Thay thế div bằng motion.div
              className="add-cart text-red-800 animate-slide-bottom cursor-pointer text-[15px]"
              animate={{ opacity: 1 }} // Thêm animation cho việc hiển thị option khi isShowOptions là true
            >
              + Add To Cart
            </motion.div>
          ) : (
            <h6 className="line-clamp-1  font-semibold text-left text-[15px] ">
              {productData?.title}
            </h6>
          )}
          <h5 className="font-bold">{`${formatMoney(productData?.price)} VNĐ`}</h5>
          <span className="rating flex h-4">
            {renderStarFromNumber(productData?.totalsRatings)}
          </span>
          <div className="product__color__select"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
