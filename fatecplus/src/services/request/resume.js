import { Request } from './request';
import Constants from '~values';

export class Resume extends Request {

    constructor(id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/send-resume/${id}`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
