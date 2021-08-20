import { Request } from './request';
import Constants from '~values';

export class Teachers extends Request {

    constructor() {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}users/teachers`;
        const params = {};
        super(url, 'GET', headers, params);
    }
}
