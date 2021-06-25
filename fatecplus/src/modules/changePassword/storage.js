import { Executor, RequestPassword } from '../../services/request';

export class StoragePassword {

    static changePassword(password) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestPassword(password))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}