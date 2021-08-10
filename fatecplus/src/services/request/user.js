import { Request } from './request';
import Constants from '../../constants/values';

export class User extends Request {

    constructor(id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
