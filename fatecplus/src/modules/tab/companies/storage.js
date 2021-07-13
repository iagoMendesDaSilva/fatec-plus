import { Executor, RequestCompanies} from '../../../services/request';

export class StorageCompany {

    static getCompanies() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestCompanies())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}