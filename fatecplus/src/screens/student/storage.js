import { Executor, User} from '../../services/request';

export class StorageUser {

    static getUser(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new User(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}
