import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditAddress extends Request {

    constructor(city, state, address, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = { city, state, address, }
        super(url, 'PUT', headers, params);
    }
}
