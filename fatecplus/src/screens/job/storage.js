import { Executor, Job, Subscription, Subscribed, UnSubscription, Resume, JobDelete} from '~request';

export class StorageJob {

    static getJob(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new Job(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static subscribe(jobId) {
        return new Promise((resolve, reject) => {
            Executor.run(new Subscription(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static unSubscribe(jobId) {
        return new Promise((resolve, reject) => {
            Executor.run(new UnSubscription(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static verifySubscribed(jobId){
        return new Promise((resolve, reject) => {
            Executor.run(new Subscribed(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static sendResume(jobId){
        return new Promise((resolve, reject) => {
            Executor.run(new Resume(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteJob(jobId){
        return new Promise((resolve, reject) => {
            Executor.run(new JobDelete(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}
