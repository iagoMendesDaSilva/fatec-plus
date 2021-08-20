import * as Request from '~request';

export class StorageResume {

    static getUser(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.User(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveNetwork(name, url) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.NetworkAdd(name, url))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteNetwork(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.NetworkDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editNetwork(name, url, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.NetworkEdit(name, url, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveLanguage(level, language) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.LanguageAdd(level, language))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteLanguage(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.LanguageDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editLanguage(level, language, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.LanguageEdit(level, language, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveProject(name, url, description) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.ProjectAdd(name, url, description))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteProject(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.ProjectDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editProject(name, url, description, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.ProjectEdit(name, url, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveFormation(title, subtitle, end_year, start_year, workload) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.FormationAdd(title, subtitle, end_year, start_year, workload))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteFormation(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.FormationDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editFormation(title, subtitle, end_year, start_year, workload, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.FormationEdit(title, subtitle, end_year, start_year, workload, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveExperience(job, company, end_year, start_year) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.ExperienceAdd(job, company, end_year, start_year))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteExperience(id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.ExperienceDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editExperience(job, company, end_year, start_year, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.ExperienceEdit(job, company, end_year, start_year, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editJobUser(job, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.EffectiveEdit(job, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editInternshipUser(internship, id) {
        return new Promise((resolve, reject) => {
            Request.Executor.run(new Request.InternshipEdit(internship, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}
