import React from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="w-[38px] h-[36px] rounded-full shadow-md flex justify-center items-center bg-slate-300 cursor-pointer hover:bg-black hover:text-white  ">
      {icon}
    </div>
  );
};

export default SelectOption;
