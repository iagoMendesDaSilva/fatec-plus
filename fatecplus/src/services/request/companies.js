import { Request } from './request';
import Constants from '~values';

export class Companies extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}users/companies`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
