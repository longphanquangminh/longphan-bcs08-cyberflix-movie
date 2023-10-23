import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/config";
import { CHOOSE_TRAILER, SET_INFO } from "../constant/user";

export const loginAction = values => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/QuanLyNguoiDung/DangNhap`, values, {
        headers: configHeaders(),
      })
      .then(res => {
        const action = {
          type: SET_INFO,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const chooseTrailer = values => {
  return dispatch => {
    const action = {
      type: CHOOSE_TRAILER,
      payload: values,
    };
    dispatch(action);
  };
};
