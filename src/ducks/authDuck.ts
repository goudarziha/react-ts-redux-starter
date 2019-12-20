import { AnyAction } from "redux";
import * as _ from 'lodash';
import { produce } from 'immer';
import axios from "axios";
import { ActionStatus, ThunkResult } from './utils/types';
import { Dispatch } from 'redux';
import { Response, HttpMethod } from './utils/types';
import { executeRequest } from './utils/request';
import { beginAsyncRequest, handleAsyncResponse, updateAsyncStatus } from "./utils/asyncActions";
import { act } from "react-dom/test-utils";
import { useSelector } from "react-redux";
import { async } from "q";

export const NAMESPACE = "auth";


export const BASE_URL = "http://localhost:5000/api";

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
  user: any;
}

const sanitize = (unsanitary: string) => {
  const cleanStr = unsanitary.toString().replace(/\\/g, "");
  return cleanStr
}

export const login = (email: string, password: string) => (dispatch: Dispatch<any>) => {
  const actionType = Action.LOGIN;

  dispatch({ type: actionType, status: { [actionType]: ActionStatus.BUSY } })
  axios.post(BASE_URL + '/auth/login', { email, password }).then(res => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } });

    console.log(res.status)
    if (res.status === 200) {
      console.log('sdfsd')
      if (res.data) {
        console.log(res.data);
        dispatch({ type: actionType, status: { [actionType]: ActionStatus.SUCCESS }, payload: res.data })
      }
    }
  }).catch(err => {

    console.log(err)
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.FAILURE } })
  })

};
export const register = (username: string, email: string, password: string) => (dispatch: Dispatch<any>) => {
  const actionType = Action.REGISTER;
  dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } })
  axios.post(BASE_URL + '/auth/register', { username, email, password }).then(res => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.BUSY } })
    if (res.status === 200) {
      if (res.data) {

        dispatch({ type: actionType, status: { [actionType]: ActionStatus.SUCCESS }, payload: JSON.parse(res.data.replace(/\\/g, "")) })
      }
    }
  }).catch(err => {
    console.log()
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.FAILURE } })
  })
}

export const logout = () => (dispatch: Dispatch<any>) => {
  const actionType = Action.LOGOUT;

  dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } })

  axios.post(BASE_URL + '/api/logout', {}).then(res => {
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
  const token = useSelector(state => _.get(state, [NAMESPACE, 'access_token']));

  const url = BASE_URL + "/auth/user";
  const request = { path: "/auth/user", method: HttpMethod.GET, token }

  return axios.request({ url, method: request.method, headers: { 'Authorization': `Bearer ${request.token}`, 'Content-Type': 'application/json' }, data: {} }).then(response => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } })
    if (response.status === 200 && response.data) {
      dispatch({ type: actionType, status: { [actionType]: ActionStatus.SUCCESS }, payload: response.data })
    }
  }).catch(error => {
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.FAILURE }, payload: error })
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
          const access_token = _.get(action.payload, ['tokens', 'access_token']);
          const refresh_token = _.get(action.payload, ['tokens', 'refresh_token']);
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          _.set(draftState, ['isAuthenticated'], true);
          _.set(draftState, ['access_token'], access_token);
          _.set(draftState, ['refresh_token'], refresh_token);
          _.set(draftState, ['user'], _.get(action.payload, ['user']));
        }
      })
    case Action.REGISTER:
      return produce(state, drafState => {
        if (action.status[Action.REGISTER] === ActionStatus.SUCCESS) {
          _.set(drafState, ['isAuthenticated'], true);
          _.set(drafState, ['access_token'], _.get(action.payload, ['data', 'tokens', 'access_token']));
          _.set(drafState, ['refresh_token'], action.payload.tokens.refresh_token);
          _.set(drafState, ['user'], action.payload.user.u_id.toString());
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
    case Action.CHECK_TOKEN:
      return produce(state, draftState => {
        if (action.status[Action.CHECK_TOKEN] === ActionStatus.SUCCESS) {
          _.set(draftState, ['user'], _.get(action.payload, ['user']))
          _.set(draftState, ['isAuthenticated'], true);
        }
      })
    default:
      return state;
  }
};

export default reducer;
