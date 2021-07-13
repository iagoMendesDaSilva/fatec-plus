import { Request } from './request';
import Constants from '../../constants/values';

export class RequestStudents extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}users/students`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}