import axios, { AxiosResponse } from 'axios'
import * as _ from 'lodash'
import { Dispatch } from 'redux';
import { Request, Response, ActionStatus } from './types';
import { async } from 'q';

export interface RequestType {
    GET: "GET",
    POST: 'POST',
    PUT: "PUT",
    DELETE: "DELETE"
}

const BASE_API_URL = "http://localhost:5000";
const TIMEOUT = 10000000;

// export const executeRequest = async<Q, R>(request: Request<Q>) => {
//     const url = `${BASE_API_URL}/${request.path}`;
//     const buildRequest = axios.request({
//         url,
//         method: request.method,
//         headers: {
//             'Authorization': `Bearer ${request.token}`,
//             'Content-Type': 'application/json'
//         },
//         data: _.get(request, 'data', null),
//         timeout: TIMEOUT
//     }).catch(error => {

//     })
// }
export const createRequest = () => {

}

export const executeRequest = (actionType: string, request: Request<any>) => (dispatch: Dispatch) => {
    const url = `${BASE_API_URL}/${request.path}`;
    dispatch({ type: actionType, status: { [actionType]: ActionStatus.BUSY } })
    return axios.request({ url, method: request.method, headers: { 'Authorization': `Bearer ${request.token}`, 'Content-Type': 'application/json' }, data: request.data, timeout: TIMEOUT }).then(response => {
        dispatch({ type: actionType, status: { [actionType]: ActionStatus.REQUESTED } })
        if (response.status === 200 && response.data) {
            dispatch({ type: actionType, status: { [actionType]: ActionStatus.SUCCESS }, payload: response.data })
        }
    }).catch(error => {
        dispatch({ type: actionType, status: { [actionType]: ActionStatus.FAILURE }, payload: error })
    })
}

