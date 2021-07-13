import { Request } from './request';
import Constants from '../../constants/values';

export class RequestImageProfile extends Request {

    constructor(image) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}user/image-profile`;
        const params = {image};
        super(url, 'PUT', headers, params);
    }
}