import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../apis/";
import Product from "./Product";
import "../css/filter.css";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [activedTab, setActivedTab] = useState(1);
  const [productsActive, setProductsActive] = useState([]);
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSeller(response[0].products);
      setProductsActive(response[0].products);
    }
    if (response[1]?.success) setNewProduct(response[1].products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activedTab === 1) setProductsActive(bestSeller);
    if (activedTab === 2) setProductsActive(newProduct);
  }, [activedTab]);
  return (
    <>
      <div className="w-full md:w-full lg:w-full px-4 flex justify-center">
        <ul className="filter__controls flex  border-black">
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
        </ul>
      </div>
      <div className="flex product__filter  flex-wrap ">
        {productsActive.map((el) => (
          <Product key={el.id} productData={el} isNew={activedTab === 1 ? false : true} />
        ))}
      </div>
    </>
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
