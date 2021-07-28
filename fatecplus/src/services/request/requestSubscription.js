import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSubscription extends Request {

    constructor(jobId, indication,) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}job/subscribe/${jobId}`;
        const params = { indication};
        super(url, 'POST', headers, params);
    }
}