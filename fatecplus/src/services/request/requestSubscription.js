import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSubscription extends Request {

    constructor(jobId, value, isIndication = true) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/subscribe/${jobId}`;
        const params = isIndication ? { indication: value } : { student: value };
        super(url, 'POST', headers, params);
    }
}
