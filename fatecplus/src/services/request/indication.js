import { Request } from './request';
import Constants from '../../constants/values';

export class Indication extends Request {

    constructor(jobId, student,) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/subscribe/${jobId}`;
        const params = { student};
        super(url, 'POST', headers, params);
    }
}
