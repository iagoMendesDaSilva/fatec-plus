import { Request } from './request';
import Constants from '../../constants/values';

export class RequestBenefit extends Request {

    constructor(name, description, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/benefit/${id}`;
        const params = {name, description};
        super(url, 'POST', headers, params);
    }
}