import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { Breadcrum, CustomQuantity } from "components";
import withBase from "hocs/withBase";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";

const DetailsCart = () => {
  const [listChecked, setlistChecked] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const handleOnChangeQuantityNumber = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) return;
      else if (Number(number) > 100) setQuantity(100);
      else setQuantity(number);
    },
    [quantity]
  );

  const handleChangeNumber = useCallback(
    (flag) => {
      if (flag === "Minus" && quantity === 1) return;
      if (flag === "Plus" && quantity === 100) return;
      if (flag === "Plus") setQuantity((prev) => +prev + 1);
      if (flag === "Minus") setQuantity((prev) => +prev - 1);
    },
    [quantity]
  );

  const onchangeOnes = (e) => {
    if (e.target.checked) {
    } else {
    }
  };

  // const handleRemoveAllOrder = () => {
  //   if(listChecked?.length === +currentUser?.cart.length)

  //  }

  const handleOnChangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      currentUser?.cart?.forEach((item) => {
        newListChecked.push(item);
      });
      setlistChecked(newListChecked);
    } else {
      setlistChecked([]);
    }
  };

  return (
    <div className="w-full">
      <div className="detail-header w-full  bg-gray-200 py-3 mb-3">
        <div className="w-main h-full m-auto text-black flex gap-2 ">
          <Breadcrum category="Giỏ hàng" />
        </div>
      </div>
      <div className="w-main mx-auto md:flex sm:block my-2">
        <div className="sm:w-full md:w-[70%]">
          <div className="flex w-full justify-center items-center border-b-2">
            <span className="w-[5%] text-center">
              <Checkbox onChange={handleOnChangeCheckAll} checked={listChecked?.length === currentUser?.cart?.length} />
            </span>
            <span className="w-[55%] text-center">Sản phẩm</span>
            <span className="w-[10%] text-center">Số lượng</span>
            <span className="w-[10%] text-center">Size</span>
            <span className="w-[20%] text-center">Giá</span>
          </div>
          {currentUser?.cart?.map((el) => (
            <div className="flex w-full justify-center items-center border-b">
              <span className="w-[5%] text-center">
                <Checkbox checked={listChecked.includes(el)} value={el} onChange={onchangeOnes} />
              </span>
              <span className="w-[55%] flex items-center ">
                <img src={el.product.thumb} alt="thumb-cart" className="w-16 h-full object-cover" />
                <div className="flex flex-col gap-1 w-full">
                  <span className="line-clamp-1">{el.product?.title}</span>
                  <span>Màu: {el.color}</span>
                </div>
              </span>
              <span className="w-[10%] text-center">
                <div className="flex items-center">
                  <CustomQuantity quantity={quantity} handleOnchangeQuantityNumber={handleOnChangeQuantityNumber} handleChangeNumber={handleChangeNumber} />
                </div>
              </span>
              <span className="w-[10%] line-clamp-1 text-gray-400 text-center">{el.size}</span>
              <span className="w-[20%] text-center font-bold text-lg"> {`${formatMoney(el.product.price * el.quantity)}đ`}</span>
            </div>
          ))}
        </div>
        <div className="sm:w-full md:w-[30%]"></div>
      </div>
    </div>
  );
};

export default withBase(DetailsCart);
