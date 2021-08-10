import { Request } from './request';
import Constants from '../../constants/values';

export class InternshipEdit extends Request {

    constructor(internship, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = {internship};
        super(url, 'PUT', headers, params);
    }
}
