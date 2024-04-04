import React, { useState } from "react";
import { formatMoney, renderStarFromNumber } from "../ultils/helpers";
import { SelectOption } from "./";
import { motion } from "framer-motion"; // Import motion từ framer-motion
import icons from "../ultils/icons";
const { AiOutlineMenu, IoCart, FaEye } = icons;

const ProductFS = ({ productData }) => {
  const [isShowOptions, setisShowOptions] = useState(false);
  return (
    <div // Thay thế div bằng motion.div
      className="px-4 py-4"
    >
      <div
        className="product__item flex flex-col "
        style={{
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.12), 0 -2px 2px 0 rgba(0,0,0,.04)",
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setisShowOptions(true);
        }} // Loại bỏ tham số event không cần thiết
        onMouseLeave={() => setisShowOptions(false)} // Loại bỏ tham số event không cần thiết
      >
        <div className="relative set-bg  outline-8  overflow-hidden flex-none h-[60%]">
          <img
            className="object-contain h-[212px] w-full"
            src={
              productData?.thumb ||
              "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg "
            }
            alt=""
          />
          <motion.ul // Thay thế div bằng motion.div
            className="product__hover absolute bottom-2 flex flex-row items-center gap-2 h-[36px]"
            initial={{ opacity: 0, y: -50, left: "50%", translateX: "-50%" }} // Ban đầu ẩn và đặt vị trí y là 0
            animate={{ opacity: isShowOptions ? 1 : 0, y: isShowOptions ? 0 : 30 }} // Thêm animation cho việc hiển thị và ẩn options
            transition={{ duration: 0.4 }}
            whileHover={{ y: 0 }}
          >
            <SelectOption icon={<FaEye />} />
            <SelectOption icon={<IoCart />} />
            <SelectOption icon={<AiOutlineMenu />} />
          </motion.ul>
        </div>
        <div className="flex flex-col items-start py-4 px-4 gap-2 ">
          {isShowOptions ? (
            <motion.span // Thay thế div bằng motion.div
              className="add-cart text-red-800 animate-slide-bottom cursor-pointer text-[15px]"
              animate={{ opacity: 1 }} // Thêm animation cho việc hiển thị option khi isShowOptions là true
            >
              + Add To Cart
            </motion.span>
          ) : (
            <h6 className="line-clamp-1 font-semibold text-left text-[15px] ">
              {productData?.title}
            </h6>
          )}
          <h5 className="font-bold">{`${formatMoney(productData?.price)} VNĐ`}</h5>
          <span className="rating flex h-4">
            {renderStarFromNumber(productData?.totalsRatings)}
          </span>
          {/* <div className="product__color__select"></div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductFS;
