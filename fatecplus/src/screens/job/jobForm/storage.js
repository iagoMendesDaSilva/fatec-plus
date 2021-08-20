import * as Request from '~request';

export class StorageVacancy {

    static saveVacancy(name, date, internship, job, receive_by_email, subject_email, description, benefits, requirements) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.JobAdd(name, date, internship, job, receive_by_email, subject_email, description, benefits, requirements))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getVacancy(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.Job(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editVacancy(name, date, internship, job, receive_by_email, subject_email, description, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.JobEdit(name, date, internship, job, receive_by_email, subject_email, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveBenefit(name, description, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.BenefitAdd(name, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editBenefit(name, description, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.BenefitEdit(name, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteBenefit(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.BenefitDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveRequirement(name, description, level, mandatory, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.RequirementAdd(name, description, level, mandatory, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editRequirement(name, description, level, mandatory, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.RequirementEdit(name, description, level, mandatory, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteRequirement(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.RequirementDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}
