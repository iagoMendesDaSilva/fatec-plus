import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditExperience extends Request {

    constructor(job, company, end_year, start_year, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}experience/${id}`;
        const params = { start_year, end_year, job, company };
        super(url, 'PUT', headers, params);
    }
}
