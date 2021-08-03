import { Request } from './request';
import Constants from '../../constants/values';

export class RequestResume extends Request {

    constructor(id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/send-resume/${id}`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
