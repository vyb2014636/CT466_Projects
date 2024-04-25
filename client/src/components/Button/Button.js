import React, { memo } from "react";

const Button = ({ name, handleOnClick, styles, iconsBefore, iconsAfter, fw }) => {
  return (
    <button
      type="button"
      className={
        styles ? styles : `bg-[#18181b] py-2 text-white rounded-lg font-semibold ${fw ? "w-full" : "w-fit px-2 "}`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconsAfter}
    </button>
  );
};

export default memo(Button);
