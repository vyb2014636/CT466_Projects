import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { apiGetProductDetail, apiGetProducts, apiUpdateCart } from "../../apis";
import { formatMoney, renderStarFromNumber } from "../../ultils/helpers";
import { Button, Breadcrum, CustomQuantity, InfoProduct, CustomSlider } from "../../components";
import Slider from "react-slick";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "ultils/path";
import withBase from "hocs/withBase";
import { toast } from "react-toastify";
import { getCurrentUser } from "store/user/asyncAction";

const DetailProduct = ({ navigate, location, dispatch }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { pid, category } = useParams();
  const [size, setSize] = useState("");
  const [quantityNumber, setQuantityNumber] = useState(1);
  const [varriant, setVarriant] = useState(null);
  const [descriptions, setDescriptions] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    color: "",
    images: [],
    price: "",
    thumb: "",
    size: [],
    stock: "",
  });

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
  //Khi ta cập nhật j đó thì sẽ trích suất cơ sở dữ liệu
  const [update, setUpdate] = useState(false);
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  //Khi ta cập nhật j đó thì sẽ trích suất cơ sở dữ liệu!------

  useEffect(() => {
    if (varriant) {
      setCurrentProduct({
        title: productDetail?.varriants?.find((el) => el.SKU === varriant)?.title,
        color: productDetail?.varriants?.find((el) => el.SKU === varriant)?.color,
        images: productDetail?.varriants?.find((el) => el.SKU === varriant)?.images,
        price: productDetail?.varriants?.find((el) => el.SKU === varriant)?.price,
        size: productDetail?.varriants?.find((el) => el.SKU === varriant)?.size,
        thumb: productDetail?.varriants?.find((el) => el.SKU === varriant)?.thumb,
      });
    } else {
      setCurrentProduct({
        title: productDetail?.title,
        color: productDetail?.color,
        images: productDetail?.images || [],
        price: productDetail?.price,
        thumb: productDetail?.thumb,
        size: productDetail?.size,
      });
    }
  }, [varriant, productDetail]);

  useEffect(() => {
    fetchProducts();
  }, [varriant, productDetail]);

  useEffect(() => {
    if (pid) {
      fetchProductDetail();
    }
    window.scrollTo(0, 0);
  }, [pid, update]);

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

  const fetchProductDetail = async () => {
    const response = await apiGetProductDetail(pid);
    if (response?.success) {
      setProductDetail(response.product);
      setDescriptions(response.product?.description?.split("\n")?.filter((line) => line.trim() !== ""));
    }
  };

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category: category });
    if (response?.success) {
      setRelatedProducts(response?.products);
    }
  };

  const handleAddtoCart = async () => {
    if (!currentUser)
      return Swal.fire({
        title: "Nhắc nhở!",
        text: "Vui lòng đăng nhập để tiếp tục.",
        icon: "info",
        cancelButtonText: "Hủy",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
      }).then((res) => {
        if (res.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({ redirect: location.pathname }).toString(),
          });
      });

    const response = await apiUpdateCart({
      pid,
      color: currentProduct?.color || productDetail?.color,
      quantity: quantityNumber,
      size,
      price: currentProduct?.price || productDetail?.price,
      thumbnail: currentProduct?.thumb || productDetail?.thumb,
      title: currentProduct?.title || productDetail?.title,
    });
    if (response.success) {
      toast.success(response.mes);
      dispatch(getCurrentUser());
    } else toast.error(response.mes);
  };

  return (
    <div className="w-full  md:min-h-[800px] sm:h-full flex flex-col items-center py-4">
      <div className="detail-header w-full h-[8%] bg-gray-200 py-3 mb-3">
        <div className="w-main h-full m-auto text-black flex gap-2 ">
          <Breadcrum title={currentProduct?.title || productDetail?.title} category={category} />
        </div>
      </div>
      <div className="detail-body w-main h-[100%] border-orange-500  border-b-4 py-10">
        <div className="w-full h-[74%] flex gap-1">
          <div className="md:w-1/6 lg:w-1/6 w-full  h-full"></div>
          <div className="details-left md:w-2/6 lg:w-2/6 w-full h-full px-8 flex flex-col gap-2">
            <Slider className="details-left-top h-[77%] sm:w-[20%] md:w-full " asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
              {currentProduct?.images?.map((image) => (
                <img src={image} className="object-contain border" alt="" />
              ))}
            </Slider>
            <Slider
              className="details-left-bottom flex-grow sm:w-full"
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={3}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {currentProduct?.images?.map((image) => (
                <img src={image} className="object-contain n h-full w-full" alt="" />
              ))}
            </Slider>
          </div>
          <div className="details-right md:w-2/6 lg:w-2/6 border ">
            <div className="flex flex-col  w-full  h-full gap-2 border px-5">
              <div className="title-describe mb-2">
                <h1 className="font-[700] tracking-widest leading-6 text-[1.3rem] text-[#555555] my-3">{currentProduct?.title || productDetail?.title}</h1>
                <div className="flex items-center">
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
              <div className="mt-auto flex flex-col gap-2">
                <div class="relative min-w-[100px] my-2">
                  <TextField select label="Size" className="w-full ">
                    {currentProduct?.size?.map((el, index) => (
                      <MenuItem value={el.title} key={index} onClick={() => setSize(el.title)}>
                        {el.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    onClick={() => setVarriant(null)}
                    className={clsx(`border cursor-pointer p-3 rounded-md flex items-center gap-2`, !varriant && "border-orange-500 text-orange-500")}
                  >
                    <img src={productDetail?.thumb} alt="thumb" className="w-10 h-10" />
                    <span>{productDetail?.color}</span>
                  </span>
                  {productDetail?.varriants?.map((el) => (
                    <span
                      onClick={() => setVarriant(el.SKU)}
                      className={clsx("border cursor-pointer p-3 rounded-md flex items-center gap-2", varriant === el.SKU && "border-orange-500 text-orange-500")}
                    >
                      <img src={el?.thumb} alt="thumb" className="w-10 h-10" />
                      <span>{el?.color}</span>
                    </span>
                  ))}
                  <h1 className="text-orange-500 text-end flex-grow">
                    Số lượng {"   "}
                    {currentProduct?.size?.find((el) => el.title === size)?.quantity}
                  </h1>
                </div>
                <div className="price-describe  font-[1000] text-[2rem]">
                  {`${formatMoney(currentProduct?.price || productDetail?.price)}`}
                  <span class="align-text-top text-[1rem]">₫</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    name="THÊM VÀO GIỎ HÀNG"
                    styled={"bg-orange-600 bg-opacity-60 py-2 text-white rounded-lg font-semibold  w-full w-[80%]"}
                    handleOnClick={handleAddtoCart}
                  ></Button>
                  <div className="flex w-[20%]">
                    <CustomQuantity quantity={quantityNumber} handleOnchangeQuantityNumber={handleOnChangeQuantityNumber} handleChangeNumber={handleChangeNumber} />
                  </div>
                </div>
                <div className="border-t-2 border-black h-[20%] py-2">
                  <p className="text-[#7e7e7e] text-center text-[0.8rem]">Đổi trả miễn phí trong 7 ngày</p>
                  <p className="text-[#7e7e7e] text-center text-[0.8rem]">Miễn phí giao hàng với hóa đơn trên 500K</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/6 lg:w-1/6  w-full  h-full"></div>
        </div>
        <div className="detail-rating w-full h-[25%]"></div>
      </div>
      <div className="detail-info w-main mt-8">
        <InfoProduct totalRatings={productDetail?.totalsRatings} ratings={productDetail?.rating} nameProduct={productDetail?.title} pid={productDetail?._id} rerender={rerender} />
      </div>
      <div className="detail-info w-main my-8">
        <h3 className="border-orange-500 border-b-2 font-bold track mb-4">SẢN PHẨM LIÊN QUAN</h3>
        <div className="mx-[-10px]">
          <CustomSlider products={relatedProducts} normal={true} scroll={relatedProducts?.length < 5 && relatedProducts?.length} />
        </div>
      </div>
    </div>
  );
};
export default withBase(DetailProduct);
