// import { CheckBox } from "@mui/icons-material";
// import { Checkbox } from "@mui/material";
import { Breadcrum, Button } from "components";
import OrderItem from "components/Products/OrderItem";
import withBase from "hocs/withBase";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatMoney } from "ultils/helpers";
import path from "ultils/path";

const DetailsCart = ({ navigate, dispatch, location }) => {
  // const [listChecked, setlistChecked] = useState([]);
  const { currentUser, currentCart } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) navigate(`/${path.HOME}`);
  }, [currentUser]);

  // const onchangeOnes = (e) => {
  //   if (e.target.checked) {
  //   } else {
  //   }
  // };

  // const handleRemoveAllOrder = () => {
  //   if(listChecked?.length === +currentUser?.cart.length)

  //  }

  // const handleOnChangeCheckAll = (e) => {
  //   if (e.target.checked) {
  //     const newListChecked = [];
  //     currentUser?.cart?.forEach((item) => {
  //       newListChecked.push(item);
  //     });
  //     setlistChecked(newListChecked);
  //   } else {
  //     setlistChecked([]);
  //   }
  // };

  return (
    <div className="w-full">
      <div className="detail-header w-full  bg-gray-200 py-3 mb-3">
        <div className="w-main h-full m-auto text-black flex gap-2 ">
          <Breadcrum category={location?.pathname?.replace("/", "")?.split("-")?.join(" ")} />
        </div>
      </div>
      <div className="w-main mx-auto md:flex sm:block my-2">
        <div className="sm:w-full md:w-[70%] pr-4">
          <div className="flex w-full justify-center items-center border-b-2">
            {/* <span className="w-[5%] text-center">
              <Checkbox onChange={handleOnChangeCheckAll} checked={listChecked?.length === currentUser?.cart?.length} />
            </span> */}
            <span className="w-[60%] text-center text-gray-500 font-bold">Sản phẩm</span>
            <span className="w-[10%] text-center text-gray-500 font-bold">Số lượng</span>
            <span className="w-[10%] text-center text-gray-500 font-bold">Size</span>
            <span className="w-[20%] text-center text-gray-500 font-bold">Giá</span>
          </div>
          {currentCart?.map((el) => (
            <OrderItem el={el} key={el._id} defaulQuantity={el.quantity} />
          ))}
        </div>
        <div className="sm:w-full md:w-[29%] pl-4  border-l-2">
          <div className="w-full flex justify-center items-center  border-b-2 ">
            <span className="text-gray-500 font-bold">Tổng giỏ hàng</span>
          </div>
          <div className="flex flex-col w-full border-b ">
            <div className="flex border-b py-4 justify-between text-gray-500 font-semibold">
              <span>Tạm tính:</span>
              <span>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0)) + " vnđ"}</span>
            </div>
            <div className="flex border-b py-4 justify-between text-gray-500 font-semibold">
              <span>Giao hàng:</span>
              <span>Giao hàng miễn phí</span>
            </div>
            <div className="flex border-b py-4 justify-between text-gray-500 font-semibold">
              <span>Tổng:</span>
              <span>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0)) + " vnđ"}</span>
            </div>

            <div className="flex border-b py-4 justify-between">
              <Link to={`/${path.CHECKOUT}`} className="bg-[#474747] py-2 text-white flex items-center justify-center rounded-lg font-semibold w-full">
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(DetailsCart);
