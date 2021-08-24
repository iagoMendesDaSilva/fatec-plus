import moment from 'moment';

export class Calendar {

    constructor() {
        throw new Error("Can't instantiate to Date class.")
    }

    static getNewDate(year) {
        return new Date(year ? year : new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0)
    }

    static format(date) {
        return date ? moment(date).utc().format("DD/MM/YYYY") : null
    }

    static unFormat(date) {
        return date ? moment(date).utc().format("YYYY-MM-DD") : null
    }

    static getMinimumAge() {
        return Calendar.getNewDate(new Date().getFullYear() - 120)
    }

    static getMaximumAge() {
        return Calendar.getNewDate(new Date().getFullYear() - 16)
    }

    static getDateRegister() {
        return Calendar.getNewDate(new Date().getFullYear() - 18)
    }

    static isBeforeToday(date) {
        return moment(date).utc().isBefore(Calendar.getNewDate());
    }

    static isAfterToday(date) {
        return moment(date).utc().isAfter(Calendar.getNewDate());
    }

    static isSameToday(date) {
        return moment(date).utc().isSame(Calendar.getNewDate());
    }

    static isSameOrAfterToday(date) {
        return moment(date).utc().isSameOrAfter(Calendar.getNewDate());
    }

    static isSameOrAfter(startDate, endDate) {
        return endDate ? moment(endDate).utc().isSameOrAfter(startDate): true
    }

}
