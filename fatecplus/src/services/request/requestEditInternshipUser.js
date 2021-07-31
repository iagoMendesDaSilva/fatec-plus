import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditInternshipUser extends Request {

    constructor(internship, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}user/${id}`;
        const params = {internship};
        super(url, 'PUT', headers, params);
    }
}