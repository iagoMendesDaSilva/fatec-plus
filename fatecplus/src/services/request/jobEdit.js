import { Request } from './request';
import Constants from '../../constants/values';

export class JobEdit extends Request {

    constructor(name, date, internship, job, receive_by_email, subject_email, description, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/${id}`;
        const params = {name, date, internship, job, receive_by_email, subject_email, description};
        super(url, 'PUT', headers, params);
    }
}
