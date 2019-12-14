import axios from "axios";

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
  auth: Auth[];
}

export type AuthActionTypes = LoginAction;

const authReducerDefaultState: Auth[] = [];

const authReducer = (
  state = authReducerDefaultState,
  action: AuthActionTypes
): Auth[] => {
  switch (action.type) {
    case LOGIN:
      return state;
    default:
      return state;
  }
};

export default authReducer;
