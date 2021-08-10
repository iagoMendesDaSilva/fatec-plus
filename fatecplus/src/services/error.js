import Strings from '../constants/strings';
import { Notification, Storage } from "../services";

export class Error {

    constructor() {
        throw new Error("Can't instantiate to Error class.")
    }

    static validate(status) {
        switch (status) {
            case 401:
                return Strings.STATUS_CODE_401;
            case 403:
                return Strings.STATUS_CODE_403;
            case 404:
                return Strings.STATUS_CODE_404;
            case 500:
                return Strings.STATUS_CODE_500;
            default:
                return Strings.STATUS_CODE_500;
        }
    }

    static async logout(navigation) {
        const user = await Storage.getUser()
        Storage.clear();
        Notification.unregister()
        navigation && navigation.reset({ index: 0, routes: [{ name: 'Login', params: { username: user.username, password: user.password } }] })
    }

}