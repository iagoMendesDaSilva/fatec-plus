import { Request } from './request';
import Constants from '~values';

export class PlayerId extends Request {

    constructor(onesignal_playerID, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = { onesignal_playerID };
        super(url, 'PUT', headers, params);
    }
}
