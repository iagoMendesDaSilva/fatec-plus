import { Request } from './request';
import Constants from '../../constants/values';

export class RequestSaveFormation extends Request {

    constructor(title, subtitle, end_year, start_year, workload) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/formation`;
        const params = {start_year, end_year, workload, title, subtitle};
        super(url, 'POST', headers, params);
    }
}
