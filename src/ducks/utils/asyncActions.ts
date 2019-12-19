import { Dispatch } from 'redux'
import * as _ from 'lodash';
import { ActionStatus } from '../utils/types';
import uuidv4 from 'uuid/v4';

interface TimeStamped {
    timestamp: number;
}

interface RequestUid {
    requestUid: string
}

const mergeMeta = <M, N>(inMeta: M, newMeta?: N): M & N & TimeStamped => {
    return _.merge(inMeta, { timestamp: Date.now().valueOf() }, newMeta);
};

export const updateAsyncStatus = <M>(dispatch: Dispatch, actionType: string, status: ActionStatus, inMeta: M, payload?: any): M & TimeStamped => {
    const meta = mergeMeta(inMeta);
    dispatch({ type: actionType, status, meta, payload });
    return meta;
}

export const beginAsyncRequest = async <M>(dispatch: Dispatch, actionType: string, inMeta: M): Promise<M & TimeStamped> => {
    let meta = mergeMeta(inMeta);
    meta = await updateAsyncStatus(dispatch, actionType, ActionStatus.BUSY, meta);
    return meta;
}

export const handleAsyncResponse = async<M, R>(
    dispatch: Dispatch,
    actionType: string,
    request: any,
    inMeta: M
): Promise<R | void> => {
    let meta = mergeMeta(inMeta);
    meta = await updateAsyncStatus(dispatch, actionType, ActionStatus.REQUESTED, meta);
    try {
        const response = await request.pending;
        const metaMessage = _.get(meta, 'message');
        // if (!_.isNil(metaMessage)) {
        //     dispatch(commonDuck.sendMessage(metaMessage, Severity.SUCCESS, undefined, meta));
        // }
        meta = updateAsyncStatus(dispatch, actionType, ActionStatus.SUCCESS, meta, response);
        updateAsyncStatus(dispatch, actionType, ActionStatus.IDLE, meta);
        return response;
    } catch (error) {
        // const skipMessage: boolean = _.get(meta, 'skipMessage', false);
        // const metaMessage = _.get(meta, 'message');
        // if (!skipMessage) {
        //     if (!_.isNil(metaMessage)) {
        //         dispatch(commonDuck.sendMessage(metaMessage, Severity.FATAL, undefined, meta));
        //     } else {
        //         dispatch(commonDuck.sendMessage(error, Severity.FATAL, undefined, meta));
        //     }
        // }
        meta = updateAsyncStatus(dispatch, actionType, ActionStatus.FAILURE, inMeta, error);
        updateAsyncStatus(dispatch, actionType, ActionStatus.IDLE, meta);
        return;
    }
};