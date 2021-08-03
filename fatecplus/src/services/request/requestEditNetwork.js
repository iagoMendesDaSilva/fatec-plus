import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditNetwork extends Request {

    constructor(name, url, id) {
        const headers = { 'Content-Type': 'application/json' };
        const path = `${Constants.BASE_URL}social-network/${id}`;
        const params = { name, url };
        super(path, 'PUT', headers, params);
    }
}
