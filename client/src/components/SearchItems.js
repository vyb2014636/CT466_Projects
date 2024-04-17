import React, { memo, useState, useEffect } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/helpers";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "../apis";
import { formatMoney } from "../ultils/helpers";
import useDebounce from "../hooks/useDebounce";

const { FaChevronDown } = icons;

const SearchItems = ({ name, activeClick, changeActiveFilter, type = "checkbox" }) => {
  const [selected, setSelected] = useState([]);
  const [maxPrice, setMaxPrice] = useState(null);
  const [price, setPrice] = useState({
    from: 0,
    to: 500000,
  });

  const navigate = useNavigate();
  const { category } = useParams();

  //Lấy giá cao nhất
  const fetchPriceMax = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.products) setMaxPrice(response.products[0].price);
  };
  useEffect(() => {
    if (type === "input") fetchPriceMax();
  }, [type]);
  //Lấy giá cao nhất

  //XỬ LÝ KHI TA CHECKBOX VÀO MÀU SẮC
  const handleSelect = (e) => {
    const alreadyEl = selected?.find((el) => el === e.target.value);
    if (alreadyEl) setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
  };

  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [selected]);
  //XỬ LÝ KHI TA CHECKBOX VÀO MÀU SẮC

  //XỬ LÝ KHI TA NHẬP PRICE VÀO INPUT
  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);

  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) data.from = price.from;
    if (Number(price.to) > 0) if (Number(price.to) < 500000) data.to = price.to;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(data).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);

  useEffect(() => {
    if (price.from > price.to) alert("Vui lòng nhập giá trong phạm vi cho phép");
  }, [price]);

  //XỬ LÝ KHI TA NHẬP PRICE VÀO INPUT

  return (
    <div
      className="relative text-xs p-3 cursor-pointer border border-gray-800 text-gray-500 flex items-center justify-between gap-5"
      onClick={() => changeActiveFilter(name)}
    >
      <span className="capitalize">{name}</span>
      <FaChevronDown size={10} />
      {activeClick === name && (
        <div
          className="absolute top-[calc(100%+1px)] left-0 w-fit p-4 border z-10 bg-white min-w-[150px]"
          onClick={(e) => e.stopPropagation()}
        >
          {type === "checkbox" && (
            <div className="">
              <div className="flex justify-between items-center gap-8 p-4 border-b ">
                <span className="whitespace-nowrap">{`Chọn ${selected.length} `}</span>
                <span
                  className="underline hover:text-orange-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
                {colors?.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      name={el?.vn}
                      onClick={handleSelect}
                      value={el?.en}
                      checked={selected.some((selectedItem) => selectedItem === el.en)}
                    />
                    <label className="text-gray-700 capitalize" htmlFor={el?.vn}>
                      {el?.vn}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center gap-8 p-4 border-b ">
                <span className="whitespace-nowrap">Giá cao nhất là {`${formatMoney(maxPrice)}  VNĐ`}</span>
                <span
                  className="underline hover:text-orange-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({
                      from: "",
                      to: "",
                    });
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex w-full">
                <div className="flex items-center p-2 w-1/2">
                  <label htmlFor="from">Từ: </label>
                  <input
                    className="w-full border p-2 rounded-lg outline-none"
                    type="number"
                    id="from"
                    value={price.from}
                    onChange={(e) => setPrice((prev) => ({ ...prev, from: e.target.value }))}
                    min="0"
                  />
                </div>
                <div className="flex items-center p-2 w-1/2">
                  <label htmlFor="to">Đến: </label>
                  <input
                    className="w-full border p-2 rounded-lg outline-none"
                    type="number"
                    id="to"
                    max={maxPrice}
                    value={price.to}
                    onChange={(e) => setPrice((prev) => ({ ...prev, to: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItems);
