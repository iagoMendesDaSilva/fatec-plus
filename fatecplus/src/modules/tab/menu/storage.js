import { Executor, RequestUser, RequestImageProfile} from '../../../services/request';

export class StorageMenu {

    static getUser(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestUser(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static changeImage(image){
        return new Promise((resolve, reject) => {
            Executor.run(new RequestImageProfile(image))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}