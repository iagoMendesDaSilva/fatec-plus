import { Request } from './request';
import Constants from '~values';

export class JobEditAddress extends Request {

    constructor(name, date, internship, job, receive_by_email, subject_email, description, state, city, address,id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/${id}`;
        const params = {name, date, internship, job, receive_by_email, subject_email, description, state, city, address};
        super(url, 'PUT', headers, params);
    }
}
