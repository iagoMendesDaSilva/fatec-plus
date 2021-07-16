import { Request } from './request';
import Constants from '../../constants/values';

export class RequestVersion extends Request {

    constructor(version_app, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}user/${id}`;
        const params = { version_app };
        super(url, 'PUT', headers, params);
    }
}