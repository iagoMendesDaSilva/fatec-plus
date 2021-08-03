import { Request } from './request';
import Constants from '../../constants/values';

export class RequestCourses extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}courses`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
