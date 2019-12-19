import { ThunkAction } from "redux-thunk";
import { AnyAction } from 'redux'
import { State } from '..'

export enum ActionStatus {
    IDLE = 'IDLE',
    REQUESTED = 'REQUESTED',
    BUSY = 'BUSY',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    CANCELLED = 'CANCELLED'
}

export interface AsyncAction {
    type: string;
    status: ActionStatus;
    payload?: any;
    meta?: any;
}

export type ThunkResult<R> = ThunkAction<R, State, undefined, AnyAction>;