import { Executor, JobAdd, Job, JobEdit, BenefitAdd, BenefitEdit, BenefitDelete, RequirementAdd, RequirementEdit, RequirementDelete } from '../../../services/request';

export class StorageVacancy {

    static saveVacancy(name, date, internship, job, receive_by_email, subject_email, description, benefits, requirements) {
        return new Promise((resolve, reject) => {
            Executor.run(new JobAdd(name, date, internship, job, receive_by_email, subject_email, description, benefits, requirements))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getVacancy(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new Job(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editVacancy(name, date, internship, job, receive_by_email, subject_email, description, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new JobEdit(name, date, internship, job, receive_by_email, subject_email, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveBenefit(name, description, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new BenefitAdd(name, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editBenefit(name, description, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new BenefitEdit(name, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteBenefit(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new BenefitDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveRequirement(name, description, level, mandatory, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequirementAdd(name, description, level, mandatory, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editRequirement(name, description, level, mandatory, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequirementEdit(name, description, level, mandatory, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteRequirement(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequirementDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}
