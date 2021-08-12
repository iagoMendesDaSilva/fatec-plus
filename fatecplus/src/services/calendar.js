import moment from 'moment';

export class Calendar {

    constructor() {
        throw new Error("Can't instantiate to Date class.")
    }

    static format(date) {
        return date ? moment(date).utc().format("DD/MM/YYYY") : null
    }

    static unFormat(date) {
        return date ? moment(date).utc().format("YYYY-MM-DD") : null
    }

    static getMinimumAge() {
        return new Date(new Date().getFullYear() - 120, new Date().getMonth(), new Date().getDate())
    }

    static getMaximumAge() {
        return new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate())
    }

    static getDateRegister() {
        return new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())
    }

}
