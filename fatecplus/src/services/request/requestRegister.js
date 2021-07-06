import { Request } from './request';
import Constants from '../../constants/values';

export class RequestRegister extends Request{

    constructor(studying, image, birth_date, password, city, job, state, email, name, phone, address, projects, category, networks, username, internship, formations, languages, description, experiences) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}auth/register`;
        const params = {
            studying, image, birth_date, password, city, job, state, email, name, phone, address, projects, category, networks, username, internship, formations, languages, description, experiences
        };
        super(url, 'POST', headers, params);
    }
}