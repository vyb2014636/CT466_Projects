import React, { memo, useState } from "react";
import { formatMoney, renderStarFromNumber } from "ultils/helpers";
import { SelectOption } from "components";
import { motion } from "framer-motion";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import withBase from "hocs/withBase";
import { Favorite } from "@mui/icons-material";
import Swal from "sweetalert2";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { apiUpdateCart } from "apis";
import { toast } from "react-toastify";
import { getCurrentUser } from "store/user/asyncAction";

const { BsCartPlusFill, FaEye, BsFillCartCheckFill } = icons;

const ProductFS = ({ productData, normal, navigate, dispatch }) => {
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
      const response = await apiUpdateCart({
        pid: productData._id,
        color: productData.color,
        price: productData?.price,
        thumbnail: productData?.thumb,
        title: productData?.title,
      });
      if (response.success) {
        toast.success(response.mes);
        dispatch(getCurrentUser());
      } else toast.error(response.mes);
    }
    if (flag === "WISHLIST") console.log("WISSHLIST");
  };

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

export default withBase(memo(ProductFS));
