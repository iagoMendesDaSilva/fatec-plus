import { Request } from './request';
import Constants from '../../constants/values';

export class ConfirmEmail extends Request {

    constructor(email) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/confirm-email`;
        const params = { email };
        super(url, 'POST', headers, params);
    }
}
