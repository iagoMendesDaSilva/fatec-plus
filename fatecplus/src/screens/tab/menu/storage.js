import { Executor, User, ImageProfile, Logout, UserDelete} from '~request';

export class StorageMenu {

    static getUser(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new User(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static changeImage(image){
        return new Promise((resolve, reject) => {
            Executor.run(new ImageProfile(image))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static logout(){
        return new Promise((resolve, reject) => {
            Executor.run(new Logout())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteUser(id){
        return new Promise((resolve, reject) => {
            Executor.run(new UserDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}
