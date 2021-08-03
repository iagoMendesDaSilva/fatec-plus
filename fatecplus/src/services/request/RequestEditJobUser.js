import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditJobUser extends Request {

    constructor(job, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = {job};
        super(url, 'PUT', headers, params);
    }
}