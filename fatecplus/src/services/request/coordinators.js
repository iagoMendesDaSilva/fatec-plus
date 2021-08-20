import { Request } from './request';
import Constants from '~values';

export class Coordinators extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}users/internship-coordinators`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
