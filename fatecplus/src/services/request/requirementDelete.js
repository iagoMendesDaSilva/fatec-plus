import { Request } from './request';
import Constants from '../../constants/values';

export class RequirementDelete extends Request {

    constructor( id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}requirement/${id}`;
        const params = {};
        super(url, 'DELETE', headers, params);
    }
}
