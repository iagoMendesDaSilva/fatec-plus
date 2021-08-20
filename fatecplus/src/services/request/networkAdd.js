import { Request } from './request';
import Constants from '~values';

export class NetworkAdd extends Request {

    constructor(name, url) {
        const headers = { 'Content-Type': 'application/json' };
        const path = `${Constants.BASE_URL}user/social-network`;
        const params = {name, url};
        super(path, 'POST', headers, params);
    }
}
