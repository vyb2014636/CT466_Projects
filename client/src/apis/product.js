import axios from "../axios";

export const apiGetProducts = (params) =>
  axios({
    url: "/product/getProduct",
    method: "get",
    params,
  });
