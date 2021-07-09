
import { Executor, RequestRegister, RequestCourses } from '../../services/request';

export class StorageRegister {

    static register(data, password) {
        const { city, job, state, email, name, image, phone, course, address, category, username, internship, description, birthDate } = data;

        return new Promise((resolve, reject) => {
            Executor.run(new RequestRegister(course, image, birthDate, password, city, job, state, email, name, phone, address, category,username, internship, description))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getCourses() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestCourses())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}