import { Request } from './request';
import Constants from '~values';

export class Subscription extends Request {

    constructor(jobId) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/subscribe/${jobId}`;
        const params = {};
        super(url, 'POST', headers, params);
    }
}
