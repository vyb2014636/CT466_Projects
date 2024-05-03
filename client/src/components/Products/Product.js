import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { formatMoney, renderStarFromNumber } from "ultils/helpers";
import { SelectOption } from "components";
import { motion } from "framer-motion"; // Import motion từ framer-motion
import icons from "ultils/icons";
import withBase from "hocs/withBase";
import { Favorite } from "@mui/icons-material";
import { apiUpdateCart } from "apis";
import { toast } from "react-toastify";
import { getCurrentUser } from "store/user/asyncAction";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "ultils/path";

const { FaEye, BsFillCartCheckFill, BsCartPlusFill } = icons;

const Product = ({ productData, isNew, normal, navigate, dispatch }) => {
  const [isShowOptions, setisShowOptions] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === "DETAIL") navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`);
    if (flag === "CART") {
      if (!currentUser)
        return Swal.fire({
          title: "Nhắc nhở!",
          text: "Vui lòng đăng nhập để tiếp tục.",
          icon: "info",
          cancelButtonText: "Hủy",
          showCancelButton: true,
          confirmButtonText: "Đăng nhập",
        }).then((res) => {
          if (res.isConfirmed) navigate(`/${path.LOGIN}`);
        });
      const response = await apiUpdateCart({ pid: productData._id, color: productData.color });
      if (response.success) {
        toast.success(response.mes);
        dispatch(getCurrentUser());
      } else toast.error(response.mes);
    }
    if (flag === "WISHLIST") console.log("WISSHLIST");
  };

  return (
    <motion.div // Thay thế div bằng motion.div
      className="md:w-1/4 lg:w-1/5 sm:w-1/2 px-3 py-4 h-[343px]"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }} // Thêm hiệu ứng scale khi rê chuột vào
    >
      <Link
        className="flex flex-col"
        to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}
        style={{
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.12), 0 -2px 2px 0 rgba(0,0,0,.04)",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setisShowOptions(true);
        }} // Loại bỏ tham số event không cần thiết
        onMouseLeave={() => setisShowOptions(false)}
      >
        <div className="outline-8 relative overflow-hidden flex-none h-[65%]">
          <img
            loading="lazy"
            src={productData?.thumb || "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg "}
            className="object-contain h-full w-full"
            alt=""
          />
          {!normal &&
            (isNew ? (
              <span className="absolute top-3 left-0 text-center z-10 bg-black w-[50px] leading-6 text-white tracking-widest border-r border-solid border-black rounded-tr-full rounded-br-full">
                New
              </span>
            ) : (
              <span className="border-r border-solid border-amber-600 rounded-tr-full rounded-br-full label absolute top-3 left-0 text-center z-10 bg-amber-600 w-[55px] leading-6 text-white tracking-widest">
                Sales
              </span>
            ))}
          <motion.div
            className="absolute top-2 right-2 flex flex-col items-center gap-2 "
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isShowOptions ? 1 : 0, x: isShowOptions ? 0 : 50 }} // Thêm animation cho việc hiển thị và ẩn options
            transition={{ duration: 0.5 }}
            whileHover={{ x: 0 }}
          >
            <span title="Chi tiết sản phẩm" onClick={(e) => handleClickOptions(e, "DETAIL")}>
              <SelectOption icon={<FaEye />} />
            </span>
            {currentUser?.cart?.some((el) => el.product._id === productData._id) ? (
              <span title="Xóa khỏi giỏ">
                <SelectOption icon={<BsFillCartCheckFill color="orange" />} />
              </span>
            ) : (
              <span title="Thêm vào giỏ" onClick={(e) => handleClickOptions(e, "CART")}>
                <SelectOption icon={<BsCartPlusFill />} />
              </span>
            )}

            <span title="Thêm yêu thích" onClick={(e) => handleClickOptions(e, "WISHLIST")}>
              <SelectOption icon={<Favorite />} />
            </span>
          </motion.div>
        </div>
        <div className="flex flex-col items-start  py-4 px-4 gap-2 flex-grow">
          <h6 className="line-clamp-1  font-semibold text-left text-[15px] ">{productData?.title}</h6>
          <h5 className="font-bold">{`${formatMoney(productData?.price)} VNĐ`}</h5>
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalsRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <div className="product__color__select"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default withBase(memo(Product));
