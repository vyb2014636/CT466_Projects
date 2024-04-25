import React, { useRef, useEffect, memo } from "react";
import icons from "ultils/icons";

const { FaStar } = icons;
const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();
  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 justify-around">
      <div className="flex w-[10%] items-center gap-1 text-sm justify-center">
        <span>{number}</span>
        <FaStar color="orange" />
      </div>
      <div className="w-[80%]">
        <div className="relative w-full h-[6px] bg-gray-200 rounded-l-full rounded-r-full">
          <div ref={percentRef} className="absolute inset-0 bg-orange-500 rounded-l-full rounded-r-full"></div>
        </div>
      </div>
      <div className="w-[10%] text-xs text-400">{`${ratingCount || 0} đánh giá`}</div>
    </div>
  );
};

export default memo(VoteBar);
