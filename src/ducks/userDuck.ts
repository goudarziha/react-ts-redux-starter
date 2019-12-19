import * as React from 'react'
import * as _ from 'lodash';
import { produce } from 'immer';
import { AnyAction } from "redux";
import { ActionStatus } from './utils/types';

export interface User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export const NAMESPACE = 'user';

export const GET = 'GET';
export const GET_BY_ID = 'GET_BY_ID';

export const Action = {
    GET: `${NAMESPACE}/${GET}`,
    GET_BY_ID: `${NAMESPACE}/${GET_BY_ID}`,
}

export type Slice = {
    user: string | undefined;
}

export const initialState = {
    status: {
        [Action.GET]: ActionStatus.IDLE,
        [Action.GET_BY_ID]: ActionStatus.IDLE,
    },
    user: ""
};

export const reducer = (state = initialState, action: AnyAction): any => {
    switch (action.type) {
        case Action.GET:
            return state;
        case Action.GET_BY_ID:
            return state;
        default:
            return state;
    }
}

export default reducer;