import axios from "../axios";

export const apiGetProducts = (params) =>
  axios({
    url: "/product/getProduct",
    method: "get",
    params,
  });

export const apiGetProductDetail = (params) =>
  axios({
    url: "/product/getProduct",
    method: "get",
    params,
  });
