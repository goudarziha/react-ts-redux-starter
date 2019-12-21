import * as React from "react";
import * as _ from "lodash";
import { produce } from "immer";
import { AnyAction, Dispatch } from "redux";
import { Response, HttpMethod } from "./utils/types";
import { ActionStatus } from "./utils/types";
import { beginAsyncRequest, handleAsyncResponse } from "./utils/asyncActions";
import { State } from ".";

export interface User {
  username: string;
  email: string;
  confirmed: boolean;
  u_id: string;
  created: string;
  last_edited: string;
  bio?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export const NAMESPACE = "user";

export const BASE_URL = "http://localhost:5000/api";

export const GET = "GET";
export const GET_BY_ID = "GET_BY_ID";

export const Action = {
  GET: `${NAMESPACE}/${GET}`,
  GET_BY_ID: `${NAMESPACE}/${GET_BY_ID}`
};

export type Slice = {
  user: string | undefined;
};

export const getAll = () => (dispatch: Dispatch<any>) => {
  const actionType = Action.GET;

  beginAsyncRequest(dispatch, actionType, {});
  const url = BASE_URL + "/user/";
  const request = {
    path: url,
    method: HttpMethod.GET
  };
  handleAsyncResponse(dispatch, actionType, request, {});
};

export const getById = (username: string) => (
  dispatch: Dispatch<any>,
  getState: () => State
) => {
  const actionType = Action.GET_BY_ID;

  beginAsyncRequest(dispatch, actionType, {});
  const url = `${BASE_URL}/user/${username}`;
  const request = { path: url, method: HttpMethod.GET };
  handleAsyncResponse(dispatch, actionType, request, {});
};

export const initialState = {
  status: {
    [Action.GET]: ActionStatus.IDLE,
    [Action.GET_BY_ID]: ActionStatus.IDLE
  },
  self: {},
  users: {}
};

export const reducer = (state = initialState, action: AnyAction): any => {
  switch (action.type) {
    case Action.GET:
      return produce(state, draftState => {
        if (action.status[action.GET] === ActionStatus.SUCCESS) {
          _.set(draftState, ["users"], action.payload);
        }
      });
    case Action.GET_BY_ID:
      return state;
    default:
      return state;
  }
};

export default reducer;
