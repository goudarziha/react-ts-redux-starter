import * as _ from "lodash";
import { produce } from "immer";
import { AnyAction, Dispatch } from "redux";
import { Response, HttpMethod } from "./utils/types";
import { ActionStatus } from "./utils/types";
import { beginAsyncRequest, handleAsyncResponse } from "./utils/asyncActions";
import { User } from "./userDuck";
import { State } from ".";
import { act } from "react-dom/test-utils";

export interface Comment {
  created: string;
  user: User;
  comment: string;
}

export interface Review {
  created: string;
  user: User;
  rating: number;
  review: string;
}

export interface Exercise {
  name: string;
  sets: number;
  repititions: number;
  rest: string;
  day: number;
}

export interface Workout {
  name: string;
  user: User;
  created: string;
  days: number;
  difficulty: number;
  tags: string[];
  exercises: Exercise[];
  comments: Comment[];
  reviews: Review[];
  variants?: string[];
  rating: number;
  liked: number;
}

export const NAMESPACE = "workouts";

export const BASE_URL = "http://localhost:5000/api";

export const GET = "GET";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_USER = "GET_BY_USER";
export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const ADD_REVIEW = "ADD_REVIEW";
export const CREATE_REMIX = "CREATE_REMIX";

export const Action = {
  GET: `${NAMESPACE}/${GET}`,
  GET_BY_ID: `${NAMESPACE}/${GET_BY_ID}`,
  GET_BY_USER: `${NAMESPACE}/${GET_BY_USER}`,
  CREATE: `${NAMESPACE}/${CREATE}`,
  UPDATE: `${NAMESPACE}/${UPDATE}`,
  DELETE: `${NAMESPACE}/${DELETE}`,
  ADD_REVIEW: `${NAMESPACE}/${ADD_REVIEW}`,
  CREATE_REMIX: `${NAMESPACE}/${CREATE_REMIX}`
};

export type Slice = {
  workouts: Workout | undefined;
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

export const create = (workout: Workout) => (
  dispatch: Dispatch<any>,
  getState: () => State
) => {
  const actionType = Action.CREATE;

  const access_token = getState().auth.access_token;
  beginAsyncRequest(dispatch, actionType, {});
  const url = `${BASE_URL}/workout`;
  const request = {
    path: url,
    method: HttpMethod.POST,
    token: access_token,
    data: workout
  };
  handleAsyncResponse(dispatch, actionType, request, {});
};

export const initialState = {
  status: {
    [Action.GET]: ActionStatus.IDLE,
    [Action.GET_BY_ID]: ActionStatus.IDLE,
    [Action.CREATE]: ActionStatus.IDLE
  },
  self: [],
  users: []
};

export const reducer = (state = initialState, action: AnyAction): any => {
  switch (action.type) {
    case Action.GET:
      return produce(state, draftState => {
        if (action.status[Action.GET] === ActionStatus.SUCCESS) {
          _.set(draftState, ["users"], action.payload);
        }
      });
    case Action.GET_BY_ID:
    case Action.GET_BY_USER:
    case Action.UPDATE:
    case Action.CREATE:
      console.log(action);
      return produce(state, draftState => {
        console.log(_.get(action.status, [Action.CREATE]));
        if (action.status[Action.CREATE] === ActionStatus.SUCCESS) {
          _.set(draftState, ["self"], action.payload.workout);
        }
      });
    case Action.DELETE:
    case Action.ADD_REVIEW:
    case Action.CREATE_REMIX:
      return state;
    default:
      return state;
  }
};

export default reducer;
