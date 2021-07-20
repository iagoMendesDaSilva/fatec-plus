import { Executor, RequestVacancy, RequestJob, RequestEditVacancy, RequestBenefit, RequestEditBenefit, RequestDeleteBenefit, RequestRequirement, RequestEditRequirement, RequestDeleteRequirement } from '../../services/request';

export class StorageVacancy {

    static saveVacancy(name, date, internship, job, receive_by_email, subject_email, description, benefits, requirements) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVacancy(name, date, internship, job, receive_by_email, subject_email, description, benefits, requirements))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getVacancy(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestJob(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editVacancy(name, date, internship, job, receive_by_email, subject_email, description, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditVacancy(name, date, internship, job, receive_by_email, subject_email, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveBenefit(name, description, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestBenefit(name, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editBenefit(name, description, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditBenefit(name, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteBenefit(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestDeleteBenefit(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveRequirement(name, description, level, mandatory, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestRequirement(name, description, level, mandatory, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editRequirement(name, description, level, mandatory, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditRequirement(name, description, level, mandatory, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteRequirement(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestDeleteRequirement(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}