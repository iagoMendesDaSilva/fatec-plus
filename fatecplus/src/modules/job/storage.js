import { Executor, RequestJob, RequestSubscription, RequestSubscribed, RequestUnSubscription, RequestResume, RequestDeleteJob} from '../../services/request';

export class StorageJob {

    static getJob(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestJob(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static subscribe(jobId, indication) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSubscription(jobId, indication))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static unSubscribe(jobId) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestUnSubscription(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static verifySubscribed(jobId){
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSubscribed(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static sendResume(jobId){
        return new Promise((resolve, reject) => {
            Executor.run(new RequestResume(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteJob(jobId){
        return new Promise((resolve, reject) => {
            Executor.run(new RequestDeleteJob(jobId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}