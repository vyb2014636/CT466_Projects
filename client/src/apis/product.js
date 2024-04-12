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
