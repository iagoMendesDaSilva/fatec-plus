import { Request } from './request';
import Constants from '../../constants/values';

export class RequestVerifyUsername extends Request {

    constructor(username) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}auth/verify-username`;
        const params = {username};
        super(url, 'POST', headers, params);
    }
}