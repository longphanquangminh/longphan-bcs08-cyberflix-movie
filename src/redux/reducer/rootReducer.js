import { combineReducers } from "redux";
import userReducer from "./user";

export let rootReducer = combineReducers({ userReducer });
