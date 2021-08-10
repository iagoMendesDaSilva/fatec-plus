import { Executor, Login, PlayerId , Version, Logout} from '../../services/request';

export class StorageAuth {

    static login(username, password) {
        return new Promise((resolve, reject) => {
            Executor.run(new Login(username, password))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static registerOneSignal(playerId, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new PlayerId(playerId, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static registerVersion(versionApp, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new Version(versionApp, id))
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
}
