import React, { memo } from "react";

const CountDown = ({ unit, number }) => {
  return (
    <div className="w-[30%] h-[4rem] flex flex-col justify-center items-center bg-[#F4F4F4] rounded-md  ">
      <span className="text-[1rem] text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unit}</span>
    </div>
  );
};

export default memo(CountDown);
