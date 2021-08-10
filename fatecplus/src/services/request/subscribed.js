import { Request } from './request';
import Constants from '../../constants/values';

export class Subscribed extends Request {

    constructor(jobId) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/subscribed/${jobId}`;
        const params = { };
        super(url, 'GET', headers, params);
    }
}
