import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrum } from "../../components";

const Product = () => {
  const { category } = useParams();
  return (
    <div className="w-full  md:min-h-[800px] sm:h-full flex flex-col items-center py-4">
      <div className="detail-header w-full h-[8%] bg-gray-200 py-3 mb-3">
        <div className="w-main h-full m-auto text-black flex gap-2 ">
          <Breadcrum category={category} />
        </div>
      </div>
    </div>
  );
};

export default Product;
