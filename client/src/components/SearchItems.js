import React, { memo, useState, useEffect } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/helpers";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import path from "../ultils/path";

const { FaChevronDown } = icons;

const SearchItems = ({ name, activeClick, changeActiveFilter, type = "checkbox" }) => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();
  const handleSelect = (e) => {
    const alreadyEl = selected?.find((el) => el === e.target.value);
    if (alreadyEl) setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };

  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        color: selected,
      }).toString(),
    });
  }, [selected]);

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
        </div>
      )}
    </div>
  );
};

export default memo(SearchItems);
