import React, { memo, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
import { formatMoney, renderStarFromNumber } from "ultils/helpers";
import { SelectOption } from "components";
import { motion } from "framer-motion";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
const { AiOutlineMenu, IoCart, FaEye } = icons;

const ProductFS = ({ productData, normal }) => {
  const [isShowOptions, setisShowOptions] = useState(false);
  return (
    <Link to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}>
      <div
        className="product__item mx-2 my-2 border rounded-md "
        style={{
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.12), 0 -2px 2px 0 rgba(0,0,0,.04)",
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setisShowOptions(true);
        }}
        onMouseLeave={() => setisShowOptions(false)}
      >
        <div className="relative outline-8 overflow-hidden ">
          <img className="object-contain w-[100%] h-[180px]" src={productData?.thumb || "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg "} alt="" />
          <motion.ul
            className=" absolute bottom-2 flex flex-row items-center gap-2 h-[36px]"
            initial={{ opacity: 0, y: -50, left: "50%", translateX: "-50%" }}
            animate={{ opacity: isShowOptions ? 1 : 0, y: isShowOptions ? 0 : 30 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: 0 }}
          >
            <SelectOption icon={<FaEye />} navi={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`} />
            <SelectOption icon={<IoCart />} />
            <SelectOption icon={<AiOutlineMenu />} />
          </motion.ul>
          {!normal && (
            <span className="absolute top-3 left-0 text-center z-10 bg-orange-500 w-[50px] leading-6 text-white tracking-widest border-r border-solid border-orange-500 rounded-tr-full rounded-br-full">
              Sales
            </span>
          )}
        </div>
        <div className="flex flex-col items-start py-4 px-4 gap-2 ">
          <h6 className="line-clamp-1 font-semibold text-left text-[15px] ">{productData?.title}</h6>
          <h5 className="font-bold">{`${formatMoney(productData?.price)} VNĐ`}</h5>
          <span className="rating flex h-4">
            {renderStarFromNumber(productData?.totalsRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductFS);
