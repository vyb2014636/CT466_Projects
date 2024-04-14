import axios from "../axios";

export const apiGetProducts = (params) =>
  axios({
    url: "/product/getProduct",
    method: "get",
    params,
  });

export const apiGetProductDetail = (pid) =>
  axios({
    url: "/product/getProductId/" + pid,
    method: "get",
  });
export const getFromCategory = (cate_Id, product_Id) =>
  axios({
    url: "/product/getProductsFromCategory",
    method: "get",
    params: {
      cate_Id: cate_Id,
      product_Id: product_Id,
    },
  });
