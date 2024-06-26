import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { Breadcrum, ProductFS, SearchItems, InputSelect, Pagination } from "components";
import { apiGetProducts } from "apis";
import { sorts } from "ultils/contants";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const Products = () => {
  const navigate = useNavigate();
  const [activeClick, setActiveClick] = useState(null);
  const [products, setProducts] = useState(null);
  const [params] = useSearchParams();
  const [valueSort, setValueSort] = useState("");
  const { category } = useParams();
  const [countProducts, setCountProducts] = useState(0);

  //XỬ LÝ KHI TA CLICK VÀO BỘ LỌC FILTER
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );
  //XỬ LÝ KHI TA CLICK VÀO BỘ LỌC FILTER
  //XỬ LÝ KHI LỌC FILTER
  const fetchSearchs = async (queries) => {
    if (category && category !== "products") queries.category = category;
    const response = await apiGetProducts(queries);
    if (response.success) {
      setProducts(response.products);
      setCountProducts(response.counts);
    }
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    //Lọc theo giá
    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }],
      };
      delete queries.price;
    } else {
      if (queries.from) queries.price = { gte: queries.from };
      if (queries.to) queries.price = { lte: queries.to };
    }
    delete queries.to;
    delete queries.from;
    //Lọc theo giá
    //GỌI API
    fetchSearchs({ ...priceQuery, ...queries });
    //GỌI API
    window.scrollTo(0, 0);
  }, [params, category]);
  //XỬ LÝ KHI LỌC FILTER
  //XỬ LÝ SẮP XẾP SORT
  const changeValue = useCallback(
    (value) => {
      setValueSort(value);
    },
    [valueSort]
  );
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (valueSort) {
      queries.sort = valueSort;
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString(),
      });
    }
  }, [valueSort]);

  return (
    <div className="w-full  md:min-h-[800px] sm:h-full flex flex-col items-center py-4">
      <div className="products-header w-full h-[8%] bg-gray-200 py-3 mb-3">
        <div className="w-main h-full m-auto text-black flex gap-2 ">
          <Breadcrum category={category === "products" ? "Sản phẩm" : category} />
        </div>
      </div>
      <div className="products-body w-main ">
        <div className="products-body-top border">
          <div className="products-title">
            <h1 className="font-bold text-center text-[2rem] capitalize">{category === "products" ? "Sản phẩm" : category.split("-").join(" ")}</h1>
          </div>
          <div className="products-filter flex justify-between p-4">
            <div className="w-7/10 flex gap-3 items-center">
              <span className="text-sm font-bold w-1/9">Bộ lọc</span>
              <div className="flex gap-4 items-center flex-grow">
                <SearchItems name="giá" activeClick={activeClick} changeActiveFilter={changeActiveFilter} type="input" />
                <SearchItems name="màu" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
                {/* <SearchItems name="lượt bán" activeClick={activeClick} changeActiveFilter={changeActiveFilter} /> */}
              </div>
            </div>
            <div className="w-3/10 flex gap-3 items-center">
              <span className="font-bold w-[25%] text-end">Sắp xếp</span>
              <div className="flex-grow">
                <InputSelect value={valueSort} options={sorts} changeValue={changeValue} />
              </div>
            </div>
          </div>
        </div>
        <div className="products-body-middle my-8">
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {products?.map((el) => (
              <ProductFS key={el._id} productData={el} normal={true} />
            ))}
          </Masonry>
        </div>
      </div>
      <div className="products-pagination w-main flex justify-end">
        <Pagination totalCount={countProducts} pageSize={products?.length} />
      </div>
    </div>
  );
};

export default memo(Products);
