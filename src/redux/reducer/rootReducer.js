import { combineReducers } from "redux";
import userReducer from "./user";

export const rootReducer = combineReducers({ userReducer });
