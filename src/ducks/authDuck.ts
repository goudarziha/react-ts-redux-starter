import { AnyAction } from "redux";
import _ from "lodash";
import { produce } from "immer";
import { ActionStatus, ThunkResult, Request } from "./utils/types";
import { Dispatch } from "redux";
import { Response, HttpMethod } from "./utils/types";
import { beginAsyncRequest, handleAsyncResponse } from "./utils/asyncActions";
import { State } from ".";
import { User } from "./userDuck";

export const NAMESPACE = "auth";

export const BASE_URL = "http://localhost:5000/api";

export const Action = {
  LOGIN: `${NAMESPACE}/LOGIN`,
  LOGOUT: `${NAMESPACE}/LOGOUT`,
  CHECK_TOKEN: `${NAMESPACE}/CHECK_TOKEN`,
  REGISTER: `${NAMESPACE}/REGISTER`,
  RESET_PASSWORD: `${NAMESPACE}/RESET_PASSWORD`,
  CHANGE_PASSWORD: `${NAMESPACE}/CHANGE_PASSWORD`,
  UPDATE: `${NAMESPACE}/UPDATE`
};

export enum AuthStrings {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  IS_AUTHENTICATED = "isAuthenticated"
}

export interface Auth {
  access_token: string;
  refresh_token: string;
  isAuthenticated: boolean;
  user: User;
}

export const login = (email: string, password: string) => (
  dispatch: Dispatch<any>
) => {
  const actionType = Action.LOGIN;

  beginAsyncRequest(dispatch, actionType, {});
  const url = BASE_URL + "/auth/login";
  const request = {
    path: url,
    method: HttpMethod.POST,
    data: { email, password }
  };
  handleAsyncResponse(dispatch, actionType, request, { message: "login" });
};

export const register = (username: string, email: string, password: string) => (
  dispatch: Dispatch<any>
) => {
  const actionType = Action.REGISTER;

  beginAsyncRequest(dispatch, actionType, {});
  const url = BASE_URL + "/auth/register";
  const request = {
    path: url,
    method: HttpMethod.POST,
    data: { username, email, password }
  };
  handleAsyncResponse(dispatch, actionType, request, {});
};

export const logout = () => (
  dispatch: Dispatch<any>,
  getState: () => State
) => {
  const actionType = Action.LOGOUT;

  const token = getState().auth.access_token;
  beginAsyncRequest(dispatch, actionType, {});
  const url = BASE_URL + "/auth/logout";
  const request = { path: url, method: HttpMethod.POST, token };
  handleAsyncResponse(dispatch, actionType, request, {});
};

export const checkToken = () => (
  dispatch: Dispatch<any>,
  getState: () => State
) => {
  const actionType = Action.CHECK_TOKEN;
  const token = getState().auth.access_token;
  beginAsyncRequest(dispatch, actionType, {});
  const url = BASE_URL + "/auth/user";
  const request = { path: url, method: HttpMethod.GET, token };
  handleAsyncResponse(dispatch, actionType, request, {});
};

export const update = (
  first_name: string,
  last_name: string,
  bio: string,
  avatar: any
) => (dispatch: Dispatch<any>, getState: () => State) => {
  const actionType = Action.UPDATE;
  const token = getState().auth.access_token;
  beginAsyncRequest(dispatch, actionType, {});
  const url = BASE_URL + "/auth/update";
  const request: Request<any> = {
    path: url,
    method: HttpMethod.PUT,
    token,
    data: { first_name, last_name, bio, avatar }
  };
  handleAsyncResponse(dispatch, actionType, request, {
    message: "User successfully updated"
  });
};

export const changePassword = (old_password: string, new_password: string) => (
  dispatch: Dispatch<any>,
  getState: () => State
) => {
  const actionType = Action.CHANGE_PASSWORD;
  const token = getState().auth.access_token;
  beginAsyncRequest(dispatch, actionType, {});
  const url = BASE_URL + "/auth/change_password";
  const request = {
    path: url,
    method: HttpMethod.PUT,
    token,
    data: { old_password, new_password }
  };
  handleAsyncResponse(dispatch, actionType, request, {});
};

export const resetPassword = (email: string) => (dispatch: Dispatch<any>) => {
  const actionType = Action.RESET_PASSWORD;
  beginAsyncRequest(dispatch, actionType, {});
  const url = BASE_URL + "/auth/reset_password";
  const request = { path: url, method: HttpMethod.POST, data: { email } };
  handleAsyncResponse(dispatch, actionType, request, {});
};

const saveTokenStorage = (refresh_token: string, access_token: string) => {
  localStorage.setItem(AuthStrings.ACCESS_TOKEN, access_token);
  localStorage.setItem(AuthStrings.REFRESH_TOKEN, refresh_token);
};

export type Slice = {
  access_token: string | undefined;
  refresh_token: string | undefined;
  isAuthenticated: boolean;
  user: string;
};

export const initialState = {
  status: {
    [Action.LOGIN]: ActionStatus.IDLE,
    [Action.REGISTER]: ActionStatus.IDLE,
    [Action.CHECK_TOKEN]: ActionStatus.IDLE,
    [Action.LOGOUT]: ActionStatus.IDLE,
    [Action.CHANGE_PASSWORD]: ActionStatus.IDLE,
    [Action.RESET_PASSWORD]: ActionStatus.IDLE,
    [Action.UPDATE]: ActionStatus.IDLE
  },
  access_token: localStorage.getItem(AuthStrings.ACCESS_TOKEN),
  refresh_token: localStorage.getItem(AuthStrings.REFRESH_TOKEN),
  isAuthenticated: false,
  user: {}
};

export const reducer = (state = initialState, action: AnyAction): any => {
  switch (action.type) {
    case Action.LOGIN:
      return produce(state, draftState => {
        if (action.status[Action.LOGIN] === ActionStatus.SUCCESS) {
          const access_token = _.get(action.payload, [
            "tokens",
            "access_token"
          ]);
          const refresh_token = _.get(action.payload, [
            "tokens",
            "refresh_token"
          ]);
          saveTokenStorage(refresh_token, access_token);
          _.set(draftState, ["isAuthenticated"], true);
          _.set(draftState, ["access_token"], access_token);
          _.set(draftState, ["refresh_token"], refresh_token);
          _.set(draftState, ["user"], _.get(action.payload, ["user"]));
        }
      });
    case Action.REGISTER:
      return produce(state, draftState => {
        const access_token = _.get(action.payload, ["tokens", "access_token"]);
        const refresh_token = _.get(action.payload, [
          "tokens",
          "refresh_token"
        ]);
        if (action.status[Action.REGISTER] === ActionStatus.SUCCESS) {
          saveTokenStorage(refresh_token, access_token);
          _.set(draftState, ["isAuthenticated"], true);
          _.set(
            draftState,
            ["access_token"],
            _.get(action.payload, ["data", "tokens", "access_token"])
          );
          _.set(
            draftState,
            ["refresh_token"],
            action.payload.tokens.refresh_token
          );
        }
      });
    case Action.LOGOUT:
      return produce(state, draftState => {
        if (action.status[Action.LOGOUT] === ActionStatus.SUCCESS) {
          window.localStorage.clear();
          _.set(draftState, ["isAuthenticated"], false);
          _.set(draftState, ["access_token"], null);
          _.set(draftState, ["refresh_token"], null);
          _.set(draftState, ["user"], "");
        }
      });
    case Action.CHECK_TOKEN:
      return produce(state, draftState => {
        if (action.status[Action.CHECK_TOKEN] === ActionStatus.SUCCESS) {
          _.set(draftState, ["user"], _.get(action.payload, ["user"]));
          _.set(draftState, ["isAuthenticated"], true);
        }
      });
    case Action.UPDATE:
      return produce(state, draftState => {
        if (action.status[Action.UPDATE] === ActionStatus.SUCCESS) {
          _.set(draftState, ["user"], _.get(action.payload, ["user"]));
        }
      });
    case Action.CHANGE_PASSWORD:
      return state;
    case Action.RESET_PASSWORD:
      return state;
    default:
      return state;
  }
};

export default reducer;
