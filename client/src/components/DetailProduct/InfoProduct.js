import React, { memo, useState, useEffect } from "react";
import { tabsInfoProduct } from "../../ultils/contants";

const InfoProduct = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <div className="flex gap-2 items-center">
        {tabsInfoProduct?.map((el) => (
          <span
            key={el.id}
            className={`py-2 px-4  cursor-pointer ${
              activeTab === el.id ? "bg-white border border-b-0 " : "bg-gray-200 "
            }`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border p-4">
        {tabsInfoProduct.some((el) => el.id === activeTab) &&
          tabsInfoProduct.find((el) => el.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default memo(InfoProduct);
