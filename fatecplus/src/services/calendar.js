import moment from 'moment';

export class Calendar {

    constructor() {
        throw new Error("Can't instantiate to Date class.")
    }

    static format(date) {
        return moment(date).utc().format("DD/MM/YYYY")
    }

    static unFormat(date) {
        return moment(date).utc().format("YYYY-MM-DD")
    }


}
