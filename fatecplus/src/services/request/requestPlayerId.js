import { Request } from './request';
import Constants from '../../constants/values';

export class RequestPlayerId extends Request {

    constructor(onesignal_playerID, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.BASE_URL}user/${id}`;
        const params = { onesignal_playerID };
        super(url, 'PUT', headers, params);
    }
}
