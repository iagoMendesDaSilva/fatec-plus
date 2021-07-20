import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditRequirement extends Request {

    constructor(name, description,level, mandatory, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}requirement/${id}`;
        const params = {name, description,level,mandatory};
        super(url, 'PUT', headers, params);
    }
}