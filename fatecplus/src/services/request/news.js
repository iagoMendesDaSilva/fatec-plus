import { Request } from './request';
import Constants from '~values';

export class News extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}news`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
