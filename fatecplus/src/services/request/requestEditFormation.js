import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditFormation extends Request {

    constructor(title, subtitle, end_year, start_year, workload, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}formation/${id}`;
        const params = {start_year, end_year, workload, title, subtitle};
        super(url, 'PUT', headers, params);
    }
}
