import { Executor, RequestUser, RequestCourses } from '../../services/request';

export class StorageResume {

    static getUser(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestUser(id))
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