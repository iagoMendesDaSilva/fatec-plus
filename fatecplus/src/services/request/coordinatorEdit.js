import { Request } from './request';
import Constants from '../../constants/values';

export class CoordinatorEdit extends Request {

    constructor(coordinator, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}course/${id}`;
        const params = {coordinator};
        super(url, 'PUT', headers, params);
    }
}
