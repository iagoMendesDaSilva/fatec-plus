import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSubscribed extends Request {

    constructor(jobId) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}job/subscribed/${jobId}`;
        const params = { };
        super(url, 'GET', headers, params);
    }
}