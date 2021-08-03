import { Request } from './request';
import Constants from '../../constants/values';

export class RequestVacancies extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}jobs`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
