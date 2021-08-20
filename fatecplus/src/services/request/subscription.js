import { Request } from './request';
import Constants from '~values';

export class Subscription extends Request {

    constructor(jobId, value, isIndication = true) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/subscribe/${jobId}`;
        const params = isIndication ? { indication: value } : { student: value };
        super(url, 'POST', headers, params);
    }
}
