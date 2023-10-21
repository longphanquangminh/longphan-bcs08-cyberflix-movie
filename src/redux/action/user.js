import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/config";
import { CHOOSE_TRAILER, SET_INFO } from "../constant/user";

export let loginAction = values => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/QuanLyNguoiDung/DangNhap`, values, {
        headers: configHeaders(),
      })
      .then(res => {
        let action = {
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

export let chooseTrailer = values => {
  return dispatch => {
    let action = {
      type: CHOOSE_TRAILER,
      payload: values,
    };
    dispatch(action);
  };
};
