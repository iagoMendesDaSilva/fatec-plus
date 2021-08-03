import { Request } from './request';
import Constants from '../../constants/values';

export class RequestTeachers extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}users/teachers`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
