import { Executor, Students, Indicate, Subscriptions} from '~request';

export class StorageStudent {

    static getStudents() {
        return new Promise((resolve, reject) => {
            Executor.run(new Students())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static indicate(jobId, student) {
        return new Promise((resolve, reject) => {
            Executor.run(new Indicate(jobId, student))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getSubscriptions(jobId) {
        return new Promise((resolve, reject) => {
            Executor.run(new Subscriptions(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
    
}
