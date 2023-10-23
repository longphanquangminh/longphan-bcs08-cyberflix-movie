import { SET_LOADING_OFF, SET_LOADING_ON } from "../constant/spinner";

const initialState = {
  isLoading: false,
};

const spinnerReducer = (state = initialState, { type }) => {
  switch (type) {
    case SET_LOADING_OFF:
      return { ...state, isLoading: false };
    case SET_LOADING_ON:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default spinnerReducer;
