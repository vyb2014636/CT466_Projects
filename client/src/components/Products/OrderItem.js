import CustomQuantity from "components/Common/CustomQuantity";
import withBase from "hocs/withBase";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { updateCart } from "store/user/userSlice";
import { formatMoney } from "ultils/helpers";

const OrderItem = ({ el, dispatch, defaulQuantity = 1 }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(() => defaulQuantity);

  const handleOnChangeQuantityNumber = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) return;
      else if (Number(number) > 100) setQuantity(100);
      else setQuantity(number);
    },
    [quantity]
  );

  const handleChangeNumber = (flag) => {
    if (flag === "Minus" && quantity === 1) return;
    if (flag === "Plus" && quantity === 100) return;
    if (flag === "Plus") setQuantity((prev) => +prev + 1);
    if (flag === "Minus") setQuantity((prev) => +prev - 1);
  };
  useEffect(() => {
    dispatch(updateCart({ pid: el.product?._id, quantity, color: el.color }));
  }, [quantity]);

  return (
    <div className="flex w-full justify-center items-center border-b">
      {/* <span className="w-[5%] text-center">
    <Checkbox checked={listChecked.includes(el)} value={el} onChange={onchangeOnes} />
  </span> */}
      <span className="w-[60%] flex items-center gap-2">
        <img src={el.thumbnail || el?.thumb} alt="thumb-cart" className="w-[7rem] h-full object-cover" />
        <div className="flex flex-col gap-1 w-full font-bold">
          <span className="line-clamp-1">{el.title}</span>
          <span>Màu: {el.color}</span>
        </div>
      </span>
      <span className="w-[10%] text-center">
        <div className="flex items-center">
          <CustomQuantity quantity={quantity} handleOnchangeQuantityNumber={handleOnChangeQuantityNumber} handleChangeNumber={handleChangeNumber} />
        </div>
      </span>
      <span className="w-[10%] line-clamp-1 text-gray-400 text-center">{el.size}</span>
      <span className="w-[20%] text-center font-bold text-lg"> {`${formatMoney(el.price * quantity)}đ`}</span>
    </div>
  );
};

export default withBase(OrderItem);
