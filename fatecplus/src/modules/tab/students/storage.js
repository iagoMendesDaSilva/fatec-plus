import { Executor, RequestStudents} from '../../../services/request';

export class StorageStudent {

    static getStudents() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestStudents())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}