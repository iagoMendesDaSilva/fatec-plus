import { Executor, RequestVacancy} from '../../services/request';

export class StorageVacancy {

    static saveVacancy(name, date, internship, job, receive_by_email, subject_email, description, active) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVacancy(name, date, internship, job, receive_by_email, subject_email, description,active))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }


}