import { adminLocalStorage } from "../../api/localService.js";
import { LOG_OUT_ADMIN, SET_INFO_ADMIN } from "../constant/admin.js";

const initialState = {
  info: adminLocalStorage.get(),
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFO_ADMIN:
      //   state.info = payload;
      //   return { ...state };
      return { ...state, info: payload };
    case LOG_OUT_ADMIN:
      state.info = null;
      return { ...state };
    default:
      return state;
  }
};

export default adminReducer;
