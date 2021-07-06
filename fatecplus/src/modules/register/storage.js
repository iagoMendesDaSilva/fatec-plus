
import { Executor, RequestCourses, RequestRegister } from '../../services/request';

export class StorageRegister {

    static getCourses() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestCourses())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static register(data, password) {
        const { city, job, state, email, name, image, phone, course, address, projects, category, networks, username, internship, formations, languages, description, experiences, birthDate } = data;

        return new Promise((resolve, reject) => {
            Executor.run(new RequestRegister(course, image, birthDate, password, city, job, state, email, name, phone, address, projects, category, networks, username, internship, formations, languages, description, experiences))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}