import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });
export const apiFinalRegister = (token) =>
  axios({
    url: "/user/finalregister/" + token,
    method: "put",
  });
export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data: data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data: data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data: data,
  });

export const apiGetCurrentUser = () =>
  axios({
    url: "/user/getUser",
    method: "get",
  });

export const apiGetAllUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });
