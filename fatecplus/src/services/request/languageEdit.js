import { Request } from './request';
import Constants from '../../constants/values';

export class LanguageEdit extends Request {

    constructor(level, language, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}language/${id}`;
        const params = {language, level};
        super(url, 'PUT', headers, params);
    }
}
