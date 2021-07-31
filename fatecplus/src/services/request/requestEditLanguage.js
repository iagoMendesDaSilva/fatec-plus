import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditLanguage extends Request {

    constructor(level, language, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}language/${id}`;
        const params = {language, level};
        super(url, 'PUT', headers, params);
    }
}