import AsyncStorage from '@react-native-community/async-storage';

import {Token} from './request';

export class Storage {
    constructor() {
        throw new Error("Can't instantiate to Storage class.")
    }

    static getUser = async () => {
        const user = await AsyncStorage.getItem('user')
        return user ? JSON.parse(user) : false
    }

    static setUser = (username = "", password = "", token = "", id = 0) => {
        const user = { username, password, token, id }
        AsyncStorage.setItem("user", JSON.stringify(user));
        Token.setToken(token);
    }

}