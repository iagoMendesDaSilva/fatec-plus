import { Request } from './request';
import Constants from '../../constants/values';

export class RequestUnSubscription extends Request {

    constructor(jobId) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}job/subscribe/${jobId}`;
        const params = {};
        super(url, 'DELETE', headers, params);
    }
}