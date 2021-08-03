import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSaveNetwork extends Request {

    constructor(name, url) {
        const headers = { 'Content-Type': 'application/json' };
        const path = `${Constants.BASE_URL}user/social-network`;
        const params = {name, url};
        super(path, 'POST', headers, params);
    }
}
