import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { Breadcrum, ProductFS, SearchItems, InputSelect } from "../../components";
import { apiGetProducts } from "../../apis";
import { sorts } from "../../ultils/contants";
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

  //GỌI APT LẤY DỮ LIỆU CHO  TRANG SẢN PHẨM KHI BẮT ĐẦU
  useEffect(() => {
    if (category === "Sản phẩm") {
      fetchSearchs();
    } else {
      fetchSearchs({ category: category });
    }
  }, [category]);
  //GỌI APT LẤY DỮ LIỆU CHO  TRANG SẢN PHẨM KHI BẮT ĐẦU

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
    //Lọc theo giá
    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }],
      };
      delete queries.price;
    }
    if (queries.from) queries.price = { gte: queries.from };
    if (queries.to) queries.price = { lte: queries.to };

    delete queries.to;
    delete queries.from;
    //Lọc theo giá
    //GỌI API
    fetchSearchs({ ...priceQuery, ...queries });
    //GỌI API
  }, [params]);
  //XỬ LÝ KHI LỌC FILTER

  //XỬ LÝ SẮP XẾP SORT
  const changeValue = useCallback(
    (value) => {
      setValueSort(value);
    },
    [valueSort]
  );
  useEffect(() => {
    if (valueSort !== "") {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          sort: valueSort,
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [valueSort]);

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
            <h1 className="font-bold text-center text-[2rem] capitalize">{category.split("-").join(" ")}</h1>
          </div>
          <div className="products-filter flex justify-between p-4">
            <div className="w-7/10 flex gap-3 items-center">
              <span className="text-sm font-bold w-1/9">Bộ lọc</span>
              <div className="flex gap-4 items-center flex-grow">
                <SearchItems
                  name="giá"
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  type="input"
                />
                <SearchItems name="màu" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
                <SearchItems name="lượt bán" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
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
