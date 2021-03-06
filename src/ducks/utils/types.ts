import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { State } from "..";
import { Enum } from "@martin_hotell/rex-tils";

export enum ActionStatus {
  IDLE = "IDLE",
  REQUESTED = "REQUESTED",
  BUSY = "BUSY",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  CANCELLED = "CANCELLED"
}

export interface AsyncAction {
  type: string;
  status: ActionStatus;
  payload?: any;
  meta?: any;
}

export type ThunkResult<R> = ThunkAction<R, State, undefined, AnyAction>;

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export type Severity = Enum<typeof Severity>;
export const Severity = Enum("DANGER", "WARNING", "INFO", "SUCCESS", "DEFAULT");

export interface Config {
  BASE_API_URL: string;
  TIMEOUT: number;
  token?: string;
}

export interface Request<Q> {
  path: string;
  method: HttpMethod;
  token?: string;
  data?: Q;
}

export interface Response<R> {
  pending: Promise<R>;
  cancel: () => void;
}
