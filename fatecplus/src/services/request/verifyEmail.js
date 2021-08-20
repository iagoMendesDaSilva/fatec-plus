import { Request } from './request';
import Constants from '~values';

export class VerifyEmail extends Request {

    constructor(email) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/verify-email`;
        const params = {email};
        super(url, 'POST', headers, params);
    }
}
