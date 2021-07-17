import { Request } from './request';
import Constants from '../../constants/values';

export class RequestEditUser extends Request {

    constructor(email, name, image, phone, course, username, description, birth_date, id) {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${Constants.base_url}user/${id}`;
        const params={
            email, 
            name,
             image,
              phone, 
              course, 
              username, 
              description,
              birth_date,
        }
        super(url, 'PUT', headers, params);
    }
}