import { SET_LOADING_OFF, SET_LOADING_ON } from "../constant/spinner";

export const setLoadingOn = () => {
  return dispatch => {
    const action = {
      type: SET_LOADING_ON,
    };
    dispatch(action);
  };
};

export const setLoadingOff = () => {
  return dispatch => {
    const action = {
      type: SET_LOADING_OFF,
    };
    dispatch(action);
  };
};
