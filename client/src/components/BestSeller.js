import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../apis/";
import { NavLink } from "react-router-dom";
import {} from "./";
import "../css/filter.css";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [activedTab, setActivedTab] = useState(1);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) setBestSeller(response[0].products);
    if (response[1]?.success) setBestSeller(response[1].products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full md:w-full lg:w-full px-4 flex justify-center">
      <ul className="filter__controls flex border-b-2 border-black">
        {tabs.map((el) => (
          <li
            key={el.id}
            className={`font-semibold capitalize text-[24px] ${
              activedTab === el.id ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </li>
        ))}
        {/* <li data-filter=".new-arrivals" className="">
          New Arrivals
        </li> */}
      </ul>
    </div>
  );
};

export default BestSeller;

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
