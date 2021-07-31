import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSaveProject extends Request {

    constructor(name, url, description) {
        const headers = { 'Content-Type': 'application/json' };
        const path = `${Constants.base_url}user/project`;
        const params = {name,description, url};
        super(path, 'POST', headers, params);
    }
}