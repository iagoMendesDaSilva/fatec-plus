import { Executor, RequestLogin, RequestPlayerId , RequestVersion, RequestLogout} from '../../services/request';

export class StorageAuth {

    static login(username, password) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestLogin(username, password))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static registerOneSignal(playerId, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestPlayerId(playerId, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static registerVersion(versionApp, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVersion(versionApp, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static logout(){
        return new Promise((resolve, reject) => {
            Executor.run(new RequestLogout())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}