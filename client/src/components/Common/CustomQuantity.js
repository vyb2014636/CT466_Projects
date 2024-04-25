import React, { memo } from "react";

const CustomQuantity = ({ quantity, handleOnchangeQuantityNumber, handleChangeNumber }) => {
  return (
    <div className="flex w-full">
      <input
        type="text"
        className="border outline-none text-center w-[60%] "
        value={quantity}
        onChange={(el) => handleOnchangeQuantityNumber(el.target.value)}
        size="4"
        min="1"
        max=""
        step="1"
      />
      <div className="w-[40%]">
        <div
          className="text-center bg-slate-200 border cursor-pointer hover:bg-orange-600 hover:text-white"
          onClick={() => handleChangeNumber("Plus")}
        >
          +
        </div>
        <div
          className="text-center bg-slate-200 border cursor-pointer hover:bg-orange-600 hover:text-white"
          onClick={() => handleChangeNumber("Minus")}
        >
          -
        </div>
      </div>
    </div>
  );
};

export default memo(CustomQuantity);
