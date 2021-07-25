import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSubscription extends Request {

    constructor(jobId, student) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}job/subscribe/${jobId}`;
        const params = { student};
        super(url, 'POST', headers, params);
    }
}