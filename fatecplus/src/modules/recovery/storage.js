import { Executor, ConfirmEmail, VerificationCode, RecoveryPassword } from '../../services/request';

export class StorageRecovery {

    static confirmEmail(email) {
        return new Promise((resolve, reject) => {
            Executor.run(new ConfirmEmail(email))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static confirmCode(verificationCode, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new VerificationCode(verificationCode, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static changePassword(password) {
        return new Promise((resolve, reject) => {
            Executor.run(new RecoveryPassword(password))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}
