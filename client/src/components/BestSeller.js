import React, { useState, useEffect } from "react";
import { apiGetCategories } from "../apis/app";
import { NavLink } from "react-router-dom";

const BestSeller = () => {
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    if (response.success) setCategories(response.categories);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="w-full md:w-full lg:w-full px-4 flex justify-center">
      <ul className="filter__controls flex">
        <li className="active mixitup-control-active text-[18px] " data-filter="*"></li>
      </ul>
    </div>
  );
};

// {categories.map((el) => (
//   <li className="active mixitup-control-active text-[18px] " data-filter="*">
//     <NavLink
//       to="/login"
//       className={({ isActive }) =>
//         isActive ? "mr-4  " : "mr-4  text-gray-400 hover:text-black"
//       }
//     >
//       {el.title}
//     </NavLink>
//   </li>
// ))}

export default BestSeller;
