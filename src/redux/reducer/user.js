import { userLocalStorage } from "../../api/localService.js";
import { SET_INFO } from "../constant/user.js";

const initialState = {
  info: userLocalStorage.get(),
};

let userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFO:
      //   state.info = payload;
      //   return { ...state };
      return { ...state, info: payload };
    default:
      return state;
  }
};

export default userReducer;
