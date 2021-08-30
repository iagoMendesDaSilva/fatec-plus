import { Request } from './request';
import Constants from '~values';

export class Indicate extends Request {

    constructor(jobId, student,) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/indicate/${jobId}`;
        const params = { student};
        super(url, 'POST', headers, params);
    }
}
