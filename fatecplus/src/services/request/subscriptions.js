import { Request } from './request';
import Constants from '~values';

export class Subscriptions extends Request {

    constructor(jobId) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/subscriptions/${jobId}`;
        const params = {}
        super(url, 'GET', headers, params);
    }
}
