import { Request } from './request';
import Constants from '../../constants/values';

export class RequirementEdit extends Request {

    constructor(name, description,level, mandatory, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}requirement/${id}`;
        const params = {name, description,level,mandatory};
        super(url, 'PUT', headers, params);
    }
}
