

import { Request } from './request';
import Constants from '../../constants/values';

export class RequestVacancy extends Request {

    constructor(name, date, internship, job, receive_by_email, subject_email, description, active) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}job`;
        const params = { name, date, internship, job, receive_by_email, subject_email, description, active }
        super(url, 'POST', headers, params);
    }
}