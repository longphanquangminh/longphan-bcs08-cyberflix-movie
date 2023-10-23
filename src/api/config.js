import axios from "axios";
import { adminLocalStorage } from "./localService";
import { store } from "../redux/store";
import { SET_LOADING_OFF, SET_LOADING_ON } from "../redux/constant/spinner";

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

https.interceptors.request.use(
  function (config) {
    store.dispatch({ type: SET_LOADING_ON });
    return config;
  },
  function (error) {
    store.dispatch({ type: SET_LOADING_OFF });
    return Promise.reject(error);
  },
);

https.interceptors.response.use(
  function (response) {
    store.dispatch({ type: SET_LOADING_OFF });
    return response;
  },
  function (error) {
    store.dispatch({ type: SET_LOADING_OFF });
    return Promise.reject(error);
  },
);
