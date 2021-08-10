import { Request } from './request';
import Constants from '../../constants/values';

export class Students extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}users/students`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
