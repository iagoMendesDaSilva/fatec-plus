import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditBenefit extends Request {

    constructor(name, description, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}benefit/${id}`;
        const params = {name, description};
        super(url, 'PUT', headers, params);
    }
}
