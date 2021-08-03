import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditProject extends Request {

    constructor(name, url, description, id) {
        const headers = { 'Content-Type': 'application/json' };
        const path = `${Constants.BASE_URL}project/${id}`;
        const params = {name,description, url};
        super(path, 'PUT', headers, params);
    }
}
