import { combineReducers } from "redux";
import userReducer from "./user";
import adminReducer from "./admin";
import spinnerReducer from "./spinner";

export const rootReducer = combineReducers({ userReducer, adminReducer, spinnerReducer });
