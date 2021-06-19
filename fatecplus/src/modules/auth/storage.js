import { Executor, RequestLogin } from '../../services/request';

export class StorageAuth {

    static login(username, password) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestLogin(username, password))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        })
    }
}