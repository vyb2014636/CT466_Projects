import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../apis/";
import Product from "./Product";
import "../css/filter.css";
import { useDispatch, useSelector } from "react-redux";
import { getNewProducts } from "../store/products/asyncAction";
const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [activedTab, setActivedTab] = useState(1);
  const [productsActive, setProductsActive] = useState([]);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold", limit: 10 });
    if (response.success) {
      setBestSeller(response.products);
      setProductsActive(response.products);
    }
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, []);

  useEffect(() => {
    if (activedTab === 1) setProductsActive(bestSeller);
    if (activedTab === 2) setProductsActive(newProducts);
  }, [activedTab]);
  return (
    <div className="w-full">
      <div className="w-full md:w-full lg:w-full flex justify-center">
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
      <div className="flex flex-wrap mx-[-1rem]">
        {productsActive?.map((el, i) => (
          <Product key={el._id} productData={el} isNew={activedTab === 1 ? false : true} transI={i} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
