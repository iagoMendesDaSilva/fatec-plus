import { Request } from './request';
import Constants from '~values';

export class JobsByCompany extends Request {

    constructor(id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}jobs/${id}`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
