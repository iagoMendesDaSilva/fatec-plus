import { Request } from './request';
import Constants from '../../constants/values';

export class UnSubscription extends Request {

    constructor(jobId) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/subscribe/${jobId}`;
        const params = {};
        super(url, 'DELETE', headers, params);
    }
}
