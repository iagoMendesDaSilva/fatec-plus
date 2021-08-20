import { Request } from './request';
import Constants from '~values';

export class ProjectAdd extends Request {

    constructor(name, url, description) {
        const headers = { 'Content-Type': 'application/json' };
        const path = `${Constants.BASE_URL}user/project`;
        const params = {name,description, url};
        super(path, 'POST', headers, params);
    }
}
