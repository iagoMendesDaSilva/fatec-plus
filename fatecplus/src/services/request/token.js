import axios from 'axios';

export class Token {
    constructor() {
        throw new Error("Can't instantiate to Token class.")
    }

    static setToken(token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
    
}