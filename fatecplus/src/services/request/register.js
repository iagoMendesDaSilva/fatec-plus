import { Request } from './request';
import Constants from '../../constants/values';

export class Register extends Request {

    constructor(studying, image, birth_date, password, city, job, state, email, name, phone, address, category, username, internship, description) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}auth/register`;
        const params = {
            job,
            city,
            state,
            image,
            email,
            name,
            phone,
            address,
            category,
            studying,
            password,
            internship,
            username,
            birth_date,
            description,
        };
        super(url, 'POST', headers, params);
    }
}
