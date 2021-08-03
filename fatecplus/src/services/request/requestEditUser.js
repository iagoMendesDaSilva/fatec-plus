import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditUser extends Request {

    constructor(email, name, phone, course, username, description, birth_date, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = {
            email,
            name,
            phone,
            course,
            username,
            description,
            birth_date,
        }
        super(url, 'PUT', headers, params);
    }
}
