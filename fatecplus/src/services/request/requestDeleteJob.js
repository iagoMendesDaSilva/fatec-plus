import { Request } from './request';
import Constants from '../../constants/values';

export class RequestDeleteJob extends Request {

    constructor(id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}job/${id}`;
        const params = {};
        super(url, 'DELETE', headers, params);
    }
}