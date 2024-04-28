import React, { memo } from "react";

const Button = ({ name, handleOnClick, styles, iconsBefore, iconsAfter, fw, type = "button", fh }) => {
  return (
    <button
      type={type}
      className={
        styles
          ? styles
          : `bg-[#18181b] py-2 text-white flex items-center justify-center rounded-lg font-semibold ${
              fw ? "w-full" : "w-fit px-2 "
            } ${fh ? "h-[30%]" : "h-fit px-2"}`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      <span>{name}</span>
    </button>
  );
};

export default memo(Button);
