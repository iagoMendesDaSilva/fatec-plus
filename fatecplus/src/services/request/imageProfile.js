import { Request } from './request';
import Constants from '~values';

export class ImageProfile extends Request {

    constructor(image) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/image-profile`;
        const params = {image};
        super(url, 'PUT', headers, params);
    }
}
