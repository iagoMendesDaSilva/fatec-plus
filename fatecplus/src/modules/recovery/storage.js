import { Executor, RequestEmail, RequestVerificationCode, RequestPassword } from '../../services/request';

export class StorageRecovery {

    static confirmEmail(email) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEmail(email))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static confirmCode(verificationCode, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVerificationCode(verificationCode, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static changePassword(password) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestPassword(password))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}