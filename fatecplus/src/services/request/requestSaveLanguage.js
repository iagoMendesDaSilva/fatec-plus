import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSaveLanguage extends Request {

    constructor(level, language) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}user/language`;
        const params = {language, level};
        super(url, 'POST', headers, params);
    }
}