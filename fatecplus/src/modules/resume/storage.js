import { Executor, User, NetworkDelete, NetworkAdd, NetworkEdit, LanguageDelete, LanguageAdd, LanguageEdit, ProjectDelete, ProjectAdd, ProjectEdit, FormationDelete, FormationAdd, FormationEdit, ExperienceDelete, ExperienceAdd, ExperienceEdit, EffectiveEdit, InternshipEdit } from '../../services/request';

export class StorageResume {

    static getUser(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new User(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveNetwork(name, url) {
        return new Promise((resolve, reject) => {
            Executor.run(new NetworkAdd(name, url))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteNetwork(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new NetworkDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editNetwork(name, url, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new NetworkEdit(name, url, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveLanguage(level, language) {
        return new Promise((resolve, reject) => {
            Executor.run(new LanguageAdd(level, language))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteLanguage(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new LanguageDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editLanguage(level, language, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new LanguageEdit(level, language, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveProject(name, url, description) {
        return new Promise((resolve, reject) => {
            Executor.run(new ProjectAdd(name, url, description))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteProject(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new ProjectDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editProject(name, url, description, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new ProjectEdit(name, url, description, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveFormation(title, subtitle, end_year, start_year, workload) {
        return new Promise((resolve, reject) => {
            Executor.run(new FormationAdd(title, subtitle, end_year, start_year, workload))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteFormation(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new FormationDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editFormation(title, subtitle, end_year, start_year, workload, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new FormationEdit(title, subtitle, end_year, start_year, workload, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static saveExperience(job, company, end_year, start_year) {
        return new Promise((resolve, reject) => {
            Executor.run(new ExperienceAdd(job, company, end_year, start_year))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static deleteExperience(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new ExperienceDelete(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editExperience(job, company, end_year, start_year, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new ExperienceEdit(job, company, end_year, start_year, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editJobUser(job, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new EffectiveEdit(job, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editInternshipUser(internship, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new InternshipEdit(internship, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}
