import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEmail extends Request {

    constructor(email) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}auth/confirm-email`;
        const params = { email };
        super(url, 'POST', headers, params);
    }
}