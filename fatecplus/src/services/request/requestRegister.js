import { Request } from './request';
import Constants from '../../constants/values';

export class RequestRegister extends Request {

    constructor(studying, image, birth_date, password, city, job, state, email, name, phone, address, category, username, internship, description) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}auth/register`;
        const params = {
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
            username,
            birth_date,
            description,
            job: job ? job : category === 'Student' ? true : null,
            internship: internship ? internship : category === 'Student' ? true : null,
        };
        super(url, 'POST', headers, params);
    }
}