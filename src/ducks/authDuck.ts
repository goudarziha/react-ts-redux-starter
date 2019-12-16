import { AnyAction } from "redux";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { ThunkAction } from "redux-thunk";
import { createPostRequest } from "../utils/requests";

export const NAMESPACE = "auth";

export const Action = {
  LOGIN: `${NAMESPACE}/LOGIN`,
  LOGOUT: `${NAMESPACE}/LOGOUT`,
  CHECK_TOKEN: `${NAMESPACE}/CHECK_TOKEN`,
  REGISTER: `${NAMESPACE}/REGISTER`
};

export interface Auth {
  access_token: string;
  refresh_token: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: string;
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHECK_TOKEN = "CHECK_TOKEN";
export const REGISTER = "REGISTER";

export interface LoginAction {
  type: typeof LOGIN;
  payload: any;
}

export type AuthActionTypes = LoginAction;

export type AppActions = AuthActionTypes;

export const login = (email: string, password: string): LoginAction => {
  const dispatch = useDispatch();
  createPostRequest(
    LOGIN,
    "http://localhost:3000/api/v1/login",
    { email, password },
    null,
    dispatch
  );
  return {
    type: LOGIN,
    payload: ""
  };
};

const authReducerDefaultState: Auth = {
  access_token: "",
  refresh_token: "",
  isLoading: false,
  isAuthenticated: false,
  user: ""
};

const authReducer = (
  state = authReducerDefaultState,
  action: AnyAction
): Auth => {
  switch (action.type) {
    case LOGIN:
      return state;
    default:
      return state;
  }
};

export default authReducer;
