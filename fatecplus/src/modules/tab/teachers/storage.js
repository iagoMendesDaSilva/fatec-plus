import { Executor, RequestTeachers, RequestCoordinators} from '../../../services/request';

export class StorageTeacher {

    static getTeachers() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestTeachers())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getCoordinators() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestCoordinators())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}