import { Request } from './request';
import Constants from '../../constants/values';

export class RequestLogout extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/logout`;
        const params = {  };
        super(url, 'GET', headers, params);
    }
}
