import React from "react";
import { Link } from "react-router-dom";
const SelectOption = ({ icon, navi }) => {
  return (
    <Link
      className="w-[38px] h-[36px] rounded-full shadow-md flex justify-center items-center bg-slate-300 cursor-pointer hover:bg-black hover:text-white  "
      to={navi}
    >
      {icon}
    </Link>
  );
};

export default SelectOption;
