import axios from "axios";
import { BASE_URL, BASE_URL_2, configHeaders } from "./config";

export let getListMovie = () => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
    method: "GET",
    headers: configHeaders(),
  });
};

export let getDetailMovie = id => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export let postTickets = (id, seats, info) => {
  return axios({
    url: `${BASE_URL}/QuanLyDatVe/DatVe`,
    method: "POST",
    headers: { ...configHeaders(), Authorization: `Bearer ${info.accessToken}` },
    data: {
      maLichChieu: id,
      danhSachVe: seats,
      taiKhoanNguoiDung: info.taiKhoan,
    },
  });
};

export let layUserInfo = userName => {
  return axios({
    url: `${BASE_URL}/QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
    headers: { ...configHeaders() },
    data: {
      taiKhoan: userName,
    },
  });
};

export let getDetailMovieShow = id => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export let getSeatListByFilm = id => {
  return axios({
    url: `${BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export let getMovieByTheater = () => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
    method: "GET",
    headers: configHeaders(),
  });
};

export let getDataSlider = () => {
  return axios({
    url: `${BASE_URL_2}/QuanLyPhim/LayDanhSachBanner`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const putUserInfo = (values, accessToken) => {
  return axios({
    url: `${BASE_URL}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "PUT",
    headers: { ...configHeaders(), Authorization: `Bearer ${accessToken}` },
    data: values,
  });
};
