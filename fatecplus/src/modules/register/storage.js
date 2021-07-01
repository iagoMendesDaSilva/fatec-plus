
import { Executor, RequestCourses } from '../../services/request';

export class StorageRegister {

    static getCourses() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestCourses())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}