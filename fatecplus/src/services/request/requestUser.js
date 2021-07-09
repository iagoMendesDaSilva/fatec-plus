import { Request } from './request';
import Constants from '../../constants/values';

export class RequestUser extends Request {

    constructor(id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}user/${id}`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}