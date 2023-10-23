import axios from "axios";
import { BASE_URL, BASE_URL_2, configHeaders, MA_NHOM } from "./config";

export const getListMovie = () => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const getDetailMovie = id => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const postTickets = (id, seats, info) => {
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

export const layUserInfo = userName => {
  return axios({
    url: `${BASE_URL}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${MA_NHOM}&tuKhoa=${userName}`,
    method: "GET",
    headers: { ...configHeaders() },
  });
};

export const getDetailMovieShow = id => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const getSeatListByFilm = id => {
  return axios({
    url: `${BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const getMovieByTheater = () => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MA_NHOM}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const getDataSlider = () => {
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
