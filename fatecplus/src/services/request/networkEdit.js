import { Request } from './request';
import Constants from '~values';

export class NetworkEdit extends Request {

    constructor(name, url, id) {
        const headers = { 'Content-Type': 'application/json' };
        const path = `${Constants.BASE_URL}social-network/${id}`;
        const params = { name, url };
        super(path, 'PUT', headers, params);
    }
}