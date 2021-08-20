import { Request } from './request';
import Constants from '~values';

export class LanguageAdd extends Request {

    constructor(level, language) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/language`;
        const params = {language, level};
        super(url, 'POST', headers, params);
    }
}
