import { Executor, RequestVerificationCode } from '../../services/request';

export class StorageVerificationCode {

    static confirmCode(verificationCode, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVerificationCode(verificationCode, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}