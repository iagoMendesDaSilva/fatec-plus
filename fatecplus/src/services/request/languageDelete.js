import { Request } from './request';
import Constants from '~values';

export class LanguageDelete extends Request {

    constructor( id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}language/${id}`;
        const params = {};
        super(url, 'DELETE', headers, params);
    }
}
