import { Request } from './request';
import Constants from '../../constants/values';

export class VerifyUsername extends Request {

    constructor(username) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/verify-username`;
        const params = {username};
        super(url, 'POST', headers, params);
    }
}
