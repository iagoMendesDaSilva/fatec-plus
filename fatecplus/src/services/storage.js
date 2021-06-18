import AsyncStorage from '@react-native-community/async-storage';

export class Storage {
    constructor() {
        throw new Error("Can't instantiate to Storage class.")
    }

    static getUser = async () => {
        const user = await AsyncStorage.getItem('user')
        return user ? JSON.parse(user) : false
    }

}