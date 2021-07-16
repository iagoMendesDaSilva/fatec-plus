import { Platform } from 'react-native';
import DeviceInfo from 'react-native-simple-device-info';
import AsyncStorage from '@react-native-community/async-storage';

import { Token } from './request';

export class Storage {
    constructor() {
        throw new Error("Can't instantiate to Storage class.")
    }

    static getUser = async () => {
        const user = await AsyncStorage.getItem('user')
        return user ? JSON.parse(user) : false
    }

    static setUser = ({ username = "", password = "", email = "", token = "", id = 0, category = "" }) => {
        const user = { username, password, email, token, id, category }
        AsyncStorage.setItem("user", JSON.stringify(user));
        Token.setToken(token);
    }

    static clear() {
        AsyncStorage.clear();
        Token.setToken("");
    }

    static getVersion() {
        return Platform.OS === 'ios'
            ? DeviceInfo.getBuildNumber()
            : DeviceInfo.getVersion()
    }

}