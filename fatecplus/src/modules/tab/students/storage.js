import { Executor, Students, Subscription} from '../../../services/request';

export class StorageStudent {

    static getStudents() {
        return new Promise((resolve, reject) => {
            Executor.run(new Students())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static solicit(jobId, student) {
        return new Promise((resolve, reject) => {
            Executor.run(new Subscription(jobId, student, false))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}
