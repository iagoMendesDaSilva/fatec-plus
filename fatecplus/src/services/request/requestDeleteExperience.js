import { Request } from './request';
import Constants from '../../constants/values';

export class RequestDeleteExperience extends Request {

    constructor( id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}experience/${id}`;
        const params = {};
        super(url, 'DELETE', headers, params);
    }
}