import { Request } from './request';
import Constants from '~values';

export class Logout extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/logout`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
