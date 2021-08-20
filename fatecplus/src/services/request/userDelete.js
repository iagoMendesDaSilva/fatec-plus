import { Request } from './request';
import Constants from '~values';

export class UserDelete extends Request {

    constructor(id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = {}
        super(url, 'DELETE', headers, params);
    }
}
