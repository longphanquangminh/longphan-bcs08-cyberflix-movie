import { combineReducers } from "redux";
import userReducer from "./user";
import adminReducer from "./admin";

export const rootReducer = combineReducers({ userReducer, adminReducer });
