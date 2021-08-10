import { Request } from './request';
import Constants from '../../constants/values';

export class RequirementAdd extends Request {

    constructor(name, description, level,mandatory,id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}job/requirement/${id}`;
        const params = {name, description,level,mandatory};
        super(url, 'POST', headers, params);
    }
}
