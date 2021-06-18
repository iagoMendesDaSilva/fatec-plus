import { Request } from './request';
import Constants from '../../constants/values';

export class RequestLogin extends Request{

    constructor(username, password) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}auth/login`;
        const params = {
            username,
            password,
        };
        super(url, 'POST', headers, params);
    }
}