import { Request } from './request';
import Constants from '../../constants/values';

export class RequestRegister extends Request {

    constructor(studying, image, birth_date, password, city, job, state, email, name, phone, address, projects, category, networks, username, internship, formations, languages, description, experiences) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}auth/register`;
        const params ={
            city:city ? city : null,
            job:job ? job : null,
            state:state ? state : null,
            address:address ? address : null,
            projects:projects ? projects : null,
            studying:studying ? studying : null,
            networks:networks ? networks : null,
            internship:internship ? internship : null,
            languages:languages ? languages : null,
            formations:formations ? formations : null,
            experiences:experiences ? experiences : null,
            image, birth_date, password, email, name, phone, category, username, description,
        };
        super(url, 'POST', headers, params);
    }
}