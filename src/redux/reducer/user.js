import { userLocalStorage } from "../../api/localService.js";
import { CHOOSE_TRAILER, SET_INFO } from "../constant/user.js";

const initialState = {
  info: userLocalStorage.get(),
  chosenTrailer: "",
};

let userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFO:
      //   state.info = payload;
      //   return { ...state };
      return { ...state, info: payload };
    case CHOOSE_TRAILER:
      return { ...state, chosenTrailer: payload };
    default:
      return state;
  }
};

export default userReducer;
