import { Executor, RequestUser, RequestDeleteNetwork, RequestSaveNetwork, RequestEditNetwork, RequestDeleteLanguage, RequestSaveLanguage, RequestEditLanguage, RequestDeleteProject, RequestSaveProject, RequestEditProject, RequestDeleteFormation, RequestSaveFormation, RequestEditFormation, RequestDeleteExperience, RequestSaveExperience, RequestEditExperience, RequestEditJobUser, RequestEditInternshipUser } from '../../services/request';

export class StorageResume {

    static getUser(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestUser(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveNetwork(name, url) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSaveNetwork(name, url))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteNetwork(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestDeleteNetwork(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editNetwork(name, url, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditNetwork(name, url, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveLanguage(level, language) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSaveLanguage(level, language))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteLanguage(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestDeleteLanguage(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editLanguage(level, language, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditLanguage(level, language, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveProject(name, url, description) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSaveProject(name, url, description))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteProject(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestDeleteProject(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editProject(name, url, description, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditProject(name, url, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveFormation(title, subtitle, end_year, start_year, workload) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSaveFormation(title, subtitle, end_year, start_year, workload))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteFormation(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestDeleteFormation(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editFormation(title, subtitle, end_year, start_year, workload, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditFormation(title, subtitle, end_year, start_year, workload, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveExperience(job, company, end_year, start_year) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSaveExperience(job, company, end_year, start_year))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteExperience(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestDeleteExperience(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editExperience(job, company, end_year, start_year, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditExperience(job, company, end_year, start_year, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editJobUser(job, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditJobUser(job, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editInternshipUser(internship, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditInternshipUser(internship, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}