import { Request } from './request';
import Constants from '../../constants/values';

export class Login extends Request{

    constructor(username, password) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/login`;
        const params = {
            username,
            password,
        };
        super(url, 'POST', headers, params);
    }
}
