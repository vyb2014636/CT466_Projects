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

export const apiRatings = (data) =>
  axios({
    url: "/product/ratings",
    method: "put",
    data,
  });

export const apiCreateProduct = (data) =>
  axios({
    url: "/product/",
    method: "post",
    data,
  });

export const apiAllProducts = () =>
  axios({
    url: "/product/getAllProducts",
    method: "get",
  });

export const apiUpdateProduct = (data, pid) =>
  axios({
    url: "/product/updateProduct/" + pid,
    method: "put",
    data,
  });

export const apiDeleteProduct = (pid) =>
  axios({
    url: "/product/deleteProduct/" + pid,
    method: "delete",
  });
