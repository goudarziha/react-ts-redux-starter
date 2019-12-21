import { AnyAction } from "redux";
import * as _ from "lodash";
import { produce } from "immer";
import { ActionStatus, ThunkResult } from "./utils/types";
import { Dispatch } from "redux";
import { Response, HttpMethod, Severity } from "./utils/types";
import { useSelector } from "react-redux";
import { beginAsyncRequest, handleAsyncResponse } from "./utils/asyncActions";
import { State } from ".";

export const NAMESPACE = "message";

export const BASE_URL = "http://localhost:5000/api";

export interface Message {
  severity: string;
  type: string;
  message: string;
}

export const Action = {
  SEND_MESSAGE: `${NAMESPACE}/SEND_MESSAGE`,
  DISMISS_MESSAGE: `${NAMESPACE}/DISMISS_MESSAGE`
};

export const setMessage = (severity: string, type: string, message: string) => (
  dispatch: Dispatch<any>
) => {
  const actionType = Action.SEND_MESSAGE;

  beginAsyncRequest(dispatch, actionType, {});
  handleAsyncResponse(dispatch, actionType, null, {
    message,
    type,
    severity
  });
};

export type Slice = {
  type: string | undefined;
  message: string | undefined;
};

export const initialState = {
  status: {
    [Action.SEND_MESSAGE]: ActionStatus.IDLE,
    [Action.DISMISS_MESSAGE]: ActionStatus.IDLE
  },
  type: "",
  message: ""
};

export const reducer = (state = initialState, action: AnyAction): any => {
  switch (action.type) {
    case Action.SEND_MESSAGE:
      return state;
    case Action.DISMISS_MESSAGE:
      return state;
    default:
      return state;
  }
};

export default reducer;
