import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSaveExperience extends Request {

    constructor(job, company, end_year, start_year) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/experience`;
        const params = { start_year, end_year, job, company };
        super(url, 'POST', headers, params);
    }
}
