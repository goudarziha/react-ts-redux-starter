import axios, { AxiosResponse } from 'axios'
import * as _ from 'lodash'

export interface RequestType {
    GET: "GET",
    POST: 'POST',
    PUT: "PUT",
    DELETE: "DELETE"
}

class Request {
    config: any;

    constructor(config: any) {
        this.config = config;
    }
    public executeRequest = async <Q, R>(): Promise<any> => {
        const cancelSource = axios.CancelToken.source();
        const url = `${this.config.BASE_API_URL}/${sdkRequest.path}`;
        // console.warn({ url, token: this._config.token });
        const pendingAxios = axios
            .request({
                url,
                method: sdkRequest.method,
                headers: {
                    Authorization: this.config.token,
                    'Content-Type': 'application/json'
                },
                data: _.get(sdkRequest, 'data', null),
                cancelToken: cancelSource.token,
                timeout: this.config.TIMEOUT
            })
            .catch(error => {
                const errCode = _.get(error, 'code');
                const errStatus = _.get(error, ['response', 'status']);
                const errMessage = _.get(error, 'message');
                if (axios.isCancel(error)) {
                    throw new Error(ApiError.CANCEL);
                } else {
                    if (errStatus === 401) {
                        throw new Error(ApiError.AUTH);
                    } else {
                        if (errStatus === 408 || errCode === 'ECONNABORTED') {
                            throw new Error(ApiError.TIMEOUT);
                        } else {
                            throw new Error(errMessage);
                        }
                    }
                }
            });

        const cancel = () => {
            cancelSource.cancel(ApiError.CANCEL);
        };
        // a bit ugly, but necessarily so to allow return of:
        // pending:  a promise which resolves to RizeSDK de-serialized class
        // cancel:  function to cancel the request
        const pending = new Promise((resolve: (response: R) => void, reject) => {
            return pendingAxios
                .then((apiResponse: AxiosResponse<R>) => {
                    resolve(apiResponse.data);
                }, reject)
                .catch(reject);
        });

        return {
            pending,
            cancel
        };
    };
}
    
}