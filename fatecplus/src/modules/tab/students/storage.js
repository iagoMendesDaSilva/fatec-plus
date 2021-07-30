import { Executor, RequestStudents, RequestSubscription} from '../../../services/request';

export class StorageStudent {

    static getStudents() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestStudents())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static solicit(jobId, student) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSubscription(jobId, student, false))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}