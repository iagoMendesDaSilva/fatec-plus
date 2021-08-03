import { Request } from './request';
import Constants from '../../constants/values';

export class RequestPassword extends Request {

    constructor(password) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/recovery`;
        const params = { password };
        super(url, 'POST', headers, params);
    }
}
