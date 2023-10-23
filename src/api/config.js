import axios from "axios";
import { adminLocalStorage } from "./localService";
import { store } from "../redux/store";

export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg";

export const configHeaders = () => {
  return {
    TokenCybersoft: TOKEN_CYBER,
  };
};

export const BASE_URL = "https://movie0706.cybersoft.edu.vn/api";
export const BASE_URL_2 = "https://movienew.cybersoft.edu.vn/api";
export const MA_NHOM = "GP09";

const accessToken = adminLocalStorage.get()?.accessToken;

export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    TokenCybersoft: TOKEN_CYBER,
  },
});

// axios interceptor: can thiệp vào request và response từ api

// xây dựng chức năng login: config 1 lần, sau đó áp dụng cho mọi api
// 1. spinnerSlice ~ giữ trạng thái bật tắt loading
// 2. dispatch => dispatch ngoài component

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // store.dispatch(setLoadingOn());
    console.log("api đi");
    return config;
  },
  function (error) {
    // Do something with request error
    // store.dispatch(setLoadingOff());
    return Promise.reject(error);
  },
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // store.dispatch(setLoadingOff());
    console.log("api về");
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // store.dispatch(setLoadingOff());
    return Promise.reject(error);
  },
);
