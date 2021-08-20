import { Request } from './request';
import Constants from '~values';

export class Version extends Request {

    constructor(version_app, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = { version_app };
        super(url, 'PUT', headers, params);
    }
}
