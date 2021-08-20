import { Request } from './request';
import Constants from '~values';

export class UserEdit extends Request {

    constructor(email, name, phone, studying, username, description, birth_date, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = {
            email,
            name,
            phone,
            studying,
            username,
            description,
            birth_date,
        }
        super(url, 'PUT', headers, params);
    }
}
