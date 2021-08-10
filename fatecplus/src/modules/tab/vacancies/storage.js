import { Executor, Subscription, User, Jobs, JobsByCompany} from '../../../services/request';

export class StorageVacancie {

    static getVacancies() {
        return new Promise((resolve, reject) => {
            Executor.run(new Jobs())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getVacanciesByCompany(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new JobsByCompany(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static solicit(jobId, indication) {
        return new Promise((resolve, reject) => {
            Executor.run(new Subscription(jobId, indication, false))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getUser(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new User(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}
