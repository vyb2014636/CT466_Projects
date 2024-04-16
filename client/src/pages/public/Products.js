import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Breadcrum, ProductFS, SearchItems } from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const Products = () => {
  const [activeClick, setActiveClick] = useState(null);
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const [params] = useSearchParams();
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );
  const fetchSearchs = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response.success) {
      if (response.productsCategory === 0) setProducts(response.products);
      else setProducts(response.productsCategory);
    }
  };
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];
    fetchSearchs(queries);
  }, [params]);

  return (
    <div className="w-full  md:min-h-[800px] sm:h-full flex flex-col items-center py-4">
      <div className="products-header w-full h-[8%] bg-gray-200 py-3 mb-3">
        <div className="w-main h-full m-auto text-black flex gap-2 ">
          <Breadcrum category={category} />
        </div>
      </div>
      <div className="products-body w-main ">
        <div className="products-body-top border">
          <div className="products-title">
            <h1 className="font-bold text-center text-[2rem]">{category}</h1>
          </div>
          <div className="products-filter flex justify-between p-4">
            <div className="w-4/5 flex gap-3 items-center">
              <span className="text-sm font-semibold">Bộ lọc</span>
              <div className="flex gap-4 items-center">
                <SearchItems
                  name="giá"
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  type="price"
                />
                <SearchItems name="màu" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
                <SearchItems name="lượt bán" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
              </div>
            </div>
            <div className="w-1/5 text-center">sort by</div>
          </div>
        </div>
        <div className="products-body-middle">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products?.map((el) => (
              <ProductFS key={el._id} productData={el} normal={true} />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default memo(Products);
