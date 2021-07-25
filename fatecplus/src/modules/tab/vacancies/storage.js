import { Executor, RequestSubscription, RequestVacancies, RequestVacanciesByCompany} from '../../../services/request';

export class StorageVacancie {

    static getVacancies() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVacancies())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getVacanciesByCompany(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVacanciesByCompany(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static solicit(jobId, student) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSubscription(jobId, student))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}