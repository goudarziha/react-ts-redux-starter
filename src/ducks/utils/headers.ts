import * as _ from 'lodash'
const config = {
    headers: {
        "Content-type": "application/json"
    }
}
export const tokenConfig = (getState: any) => {
    const access_token = getState().auth.access_token;
    const refresh_token = getState().auth.refresh_token;

    if (access_token) _.set(config, ['headers'], `Bearer ${access_token}`);
}