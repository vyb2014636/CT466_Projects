import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { apiGetProductDetail, apiGetProducts, getFromCategory } from "../../apis";
import { formatMoney, renderStarFromNumber } from "../../ultils/helpers";
import { Button, Breadcrum, CustomQuantity, InfoProduct, CustomSlider } from "../../components";
import Slider from "react-slick";

const DetailProduct = () => {
  //Slick slider
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  //Slick slider

  const [quantityNumber, setQuantityNumber] = useState(1);
  const handleOnChangeQuantityNumber = useCallback(
    (quantity) => {
      if (!Number(quantity) || Number(quantity) < 1) return;
      else if (Number(quantity) > 100) setQuantityNumber(100);
      else setQuantityNumber(quantity);
    },
    [quantityNumber]
  );

  const handleChangeNumber = useCallback(
    (flag) => {
      if (flag === "Minus" && quantityNumber === 1) return;
      if (flag === "Plus" && quantityNumber === 100) return;
      if (flag === "Plus") setQuantityNumber((prev) => +prev + 1);
      if (flag === "Minus") setQuantityNumber((prev) => +prev - 1);
    },
    [quantityNumber]
  );

  const { pid, title, category } = useParams();
  const [descriptions, setDescriptions] = useState([]);
  const [categoryCurrent, setCategoryCurrent] = useState({
    _id: "",
    title: "",
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const fetchProductDetail = async () => {
    const response = await apiGetProductDetail(pid);
    if (response?.success) {
      setProductDetail(response.product);
      setDescriptions(response.product?.description?.split("\n")?.filter((line) => line.trim() !== ""));
      setCategoryCurrent({ _id: response.product?.category?._id, title: response.product?.category?.title });
    }
  };
  const fetchProducts = async () => {
    const findFollowCategory = await getFromCategory(categoryCurrent._id, pid);
    if (findFollowCategory?.success) {
      setRelatedProducts(findFollowCategory?.relateProducts);
    }
  };

  useEffect(() => {
    if (pid) fetchProductDetail();
    window.scrollTo(0, 0);
  }, [pid]);
  useEffect(() => {
    fetchProducts();
  }, [categoryCurrent]);

  return (
    <div className="w-full  md:min-h-[800px] sm:h-full flex flex-col items-center py-4">
      <div className="detail-header w-full h-[8%] bg-gray-200 py-3 mb-3">
        <div className="w-main h-full m-auto text-black flex gap-2 ">
          <Breadcrum title={title} category={category} />
        </div>
      </div>
      <div className="detail-body w-main h-[100%] border-orange-500  border-b-4 py-10">
        <div className="w-full h-[74%] flex gap-1">
          <div className="md:w-1/6 lg:w-1/6 w-full  h-full"></div>
          <div className="details-left md:w-2/6 lg:w-2/6 w-full h-full px-8 flex flex-col gap-2">
            <Slider
              className="details-left-top h-[77%] sm:w-[20%] md:w-full"
              asNavFor={nav2}
              ref={(slider) => (sliderRef1 = slider)}
            >
              <img src={productDetail?.thumb} className="object-contain h-full w-full" alt="" />
              <img
                src="https://slyclothing.vn/images/bigheart_w.webp"
                className="object-contain h-full w-full"
                alt=""
              />
              <img src={productDetail?.thumb} className="object-contain h-full w-full" alt="" />
              <img
                src="https://slyclothing.vn/images/bigheart_w.webp"
                className="object-contain h-full w-full"
                alt=""
              />
            </Slider>
            <Slider
              className="details-left-bottom flex-grow sm:w-full"
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {/* {productDetail?.images?.map((el) => ( */}
              <img src={productDetail?.thumb} className="object-contain h-full w-full " alt="" />
              <img
                src="https://slyclothing.vn/images/bigheart_w.webp"
                className="object-contain h-full w-full"
                alt=""
              />
              <img src={productDetail?.thumb} className="object-contain h-full w-full" alt="" />
              <img
                src="https://slyclothing.vn/images/bigheart_w.webp"
                className="object-contain h-full w-full"
                alt=""
              />
              {/* ))} */}
            </Slider>
          </div>
          <div className="details-right md:w-2/6 lg:w-2/6 border ">
            <div className="flex flex-col  w-full  h-full gap-2 border px-4">
              <div className="title-describe mb-2">
                <h1 className="font-[700] tracking-widest leading-6 text-[1.3rem] text-[#555555] my-3">{title}</h1>
                <div className="flex">
                  {renderStarFromNumber(productDetail?.totalsRatings)?.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </div>
              </div>
              <div className="body-describeborder-black relative my-2">
                <div className="absolute top-[20%] right-0 bottom-[20%] bg-black w-[0.1rem]"></div>
                {descriptions?.map((el, index) => {
                  if (el === "HƯỚNG DẪN BẢO QUẢN") {
                    return (
                      <React.Fragment key={el}>
                        <br />
                        <p key={index} className="leading-4 mx-1 text-[0.7rem] text-[#7e7e7e] font-semibold">
                          {el}
                        </p>
                      </React.Fragment>
                    );
                  }
                  return (
                    <p key={index} className="leading-4 mx-1 text-[0.7rem] text-[#7e7e7e]">
                      {el}
                    </p>
                  );
                })}
              </div>
              <div class="relative min-w-[100px] my-2">
                <select class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-gradient-to-r from-blue-gray-50 to-blue-gray-100 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 shadow-md">
                  <option value="" accessKey="">
                    Chọn 1 tùy chọn
                  </option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Size
                </label>
              </div>
              <div className="price-describe px-[0.75rem] font-[1000] text-[1.5rem]">
                {`${formatMoney(productDetail?.price)}`}
                <span class="align-text-top text-[1rem]">₫</span>
              </div>
              <div className="flex gap-1 mt-4 ">
                <Button
                  name="THÊM VÀO GIỎ HÀNG"
                  styles={"bg-orange-600 bg-opacity-60 py-2 text-white rounded-lg font-semibold  w-full w-[80%]"}
                ></Button>
                <div className="flex w-[20%]">
                  <CustomQuantity
                    quantity={quantityNumber}
                    handleOnchangeQuantityNumber={handleOnChangeQuantityNumber}
                    handleChangeNumber={handleChangeNumber}
                  />
                </div>
              </div>
              <div className="border-t-2 border-black pt-8 h-[20%] mt-auto">
                <p className="text-[#7e7e7e] text-center text-[0.8rem]">Đổi trả miễn phí trong 7 ngày</p>
                <p className="text-[#7e7e7e] text-center text-[0.8rem]">Miễn phí giao hàng với hóa đơn trên 500K</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/6 lg:w-1/6  w-full  h-full"></div>
        </div>
        <div className="detail-rating w-full h-[25%]"></div>
      </div>
      <div className="detail-info w-main mt-8">
        <InfoProduct totalRatings={productDetail?.totalsRatings} totalCount={18} nameProduct={productDetail?.title} />
      </div>
      <div className="detail-info w-main my-8">
        <h3 className="border-orange-500 border-b-2 font-bold track mb-4">SẢN PHẨM LIÊN QUAN</h3>
        <div className="mx-[-10px]">
          <CustomSlider
            products={relatedProducts}
            normal={true}
            scroll={relatedProducts.length < 5 && relatedProducts.length}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
