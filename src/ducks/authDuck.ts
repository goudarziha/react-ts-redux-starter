import { AnyAction } from "redux";
import * as _ from 'lodash';
import { produce } from 'immer';
import axios, { AxiosResponse } from "axios";
import { ActionStatus, ThunkResult } from './utils/types';
import { Dispatch } from 'redux';
import { ThunkAction } from "redux-thunk";
import { beginAsyncRequest, handleAsyncResponse } from "./utils/asyncActions";
import { act } from "react-dom/test-utils";
export const NAMESPACE = "auth";


export const BASE_URL = "https://reqres.in";

export const Action = {
  LOGIN: `${NAMESPACE}/LOGIN`,
  LOGOUT: `${NAMESPACE}/LOGOUT`,
  CHECK_TOKEN: `${NAMESPACE}/CHECK_TOKEN`,
  REGISTER: `${NAMESPACE}/REGISTER`
};

export interface Auth {
  access_token: string;
  refresh_token: string;
  isAuthenticated: boolean;
  user: string;
}

export const login = (email: string, password: string): ThunkResult<Promise<any>> => {
  const actionType = Action.LOGIN;
  let meta = {};
  return async (dispatch, getState, extraArgument) => {
    meta = await beginAsyncRequest(dispatch, actionType, meta);
    const request = await axios.post(BASE_URL + '/api/login', { email, password });
    handleAsyncResponse(dispatch, actionType, request, meta);

    // dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } })
    // axios.post(BASE_URL + '/api/login', { email, password }).then(res => {
    //   dispatch({ type: actionType, status: { [actionType]: ActionStatus.BUSY } })
    //   if (res.status === 200) {

    //     if (res.data) {
    //       dispatch({ type: actionType, status: { [actionType]: ActionStatus.SUCCESS }, payload: res.data })
    //     }
    //   }
    // }).catch(err => {
    //   dispatch({ type: actionType, status: { [actionType]: ActionStatus.FAILURE } })
    // })
  };
};
export const register = (email: string, password: string) => (dispatch: Dispatch<any>) => {
  const actionType = Action.REGISTER;
  dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } })
  axios.post(BASE_URL + '/api/register', { email, password }).then(res => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.BUSY } })
    if (res.status === 200) {
      if (res.data) {
        dispatch({ type: actionType, status: { [actionType]: ActionStatus.SUCCESS }, payload: res.data })
      }
    }
  }).catch(err => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.FAILURE } })
  })
}

export const logout = () => (dispatch: Dispatch<any>) => {
  const actionType = Action.LOGOUT;

  dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } })

  axios.post(BASE_URL + '/api/login', {}).then(res => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.BUSY } })
    if (res.status === 200 && res.data) {
      dispatch({ type: actionType, status: { [actionType]: ActionStatus.SUCCESS }, payload: res.data });
    }
  }).catch(err => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.FAILURE } })
  })
}

export const checkToken = () => (dispatch: Dispatch<any>) => {
  const actionType = Action.CHECK_TOKEN;
  dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } })
  axios.get(BASE_URL + "/api/login").then(res => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.BUSY } })
    if (res.status === 200 && res.data) {
      dispatch({ type: actionType, status: { [actionType]: ActionStatus.SUCCESS }, payload: res.data })
    }
  }).catch(err => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.FAILURE } })
  })
}

export type Slice = {
  access_token: string | undefined;
  refresh_token: string | undefined;
  isAuthenticated: boolean;
  user: string;
}

export const authReducerDefaultState = {
  status: {
    [Action.LOGIN]: ActionStatus.IDLE,
    [Action.REGISTER]: ActionStatus.IDLE,
    [Action.CHECK_TOKEN]: ActionStatus.IDLE,
    [Action.LOGOUT]: ActionStatus.IDLE
  },
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  isAuthenticated: false,
  user: ""
};

export const reducer = (
  state = authReducerDefaultState,
  action: AnyAction
): any => {
  switch (action.type) {
    case Action.LOGIN:
      return produce(state, draftState => {
        if (action.status[Action.LOGIN] === ActionStatus.SUCCESS) {
          localStorage.setItem('access_token', action.payload.token);
          localStorage.setItem('refresh_token', action.payload.token);
          _.set(draftState, ['isAuthenticated'], true);
          _.set(draftState, ['access_token'], action.payload.token);
          _.set(draftState, ['refresh_token'], action.payload.token);
          _.set(draftState, ['user'], 'amir');
        }
      })
    case Action.REGISTER:
      return produce(state, drafState => {
        if (action.status[Action.REGISTER] === ActionStatus.SUCCESS) {
          _.set(drafState, ['isAuthenticated'], true);
          _.set(drafState, ['access_token'], action.payload.token);
          _.set(drafState, ['user'], action.payload.id.toString());
        }
      })
    case Action.LOGOUT:
      return produce(state, draftState => {
        if (action.status[Action.LOGOUT] === ActionStatus.SUCCESS) {
          localStorage.clear();
          _.set(draftState, ['isAuthenticated'], false);
          _.set(draftState, ['access_token'], null);
          _.set(draftState, ['refresh_token'], null);
          _.set(draftState, ['user'], "");
        }
      })
    default:
      return state;
  }
};

export default reducer;
