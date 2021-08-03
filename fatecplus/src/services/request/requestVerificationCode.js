import { Request } from './request';
import Constants from '../../constants/values';

export class RequestVerificationCode extends Request {

    constructor(verificationCode, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/confirm-verification-code/${id}`;
        const params = { verificationCode };
        super(url, 'POST', headers, params);
    }
}
