import { Executor, RequestEmail } from '../../services/request';

export class StorageRecovery {

    static confirmEmail(email) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEmail(email))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}