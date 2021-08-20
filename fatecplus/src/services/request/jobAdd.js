

import { Request } from './request';
import Constants from '~values';

export class JobAdd extends Request {

    constructor(name, date, internship, job, receive_by_email, subject_email, description, benefits, requirements) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job`;
        const params = { name, date, internship, job, receive_by_email, subject_email, description, benefits, requirements }
        super(url, 'POST', headers, params);
    }
}
