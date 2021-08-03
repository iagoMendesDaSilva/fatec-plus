import { Request } from './request';
import Constants from '../../constants/values';

export class RequestCompanies extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}users/companies`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
