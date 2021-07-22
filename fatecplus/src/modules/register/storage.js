
import { Executor, RequestRegister, RequestCourses, RequestEditUser , RequestEditAddress, RequestImageProfile, RequestVerifyEmail, RequestVerifyUsername} from '../../services/request';

export class StorageRegister {

    static register(data, password) {
        const { city, job, state, email, name, image, phone, course, address, category, username, internship, description, birthDate } = data;

        return new Promise((resolve, reject) => {
            Executor.run(new RequestRegister(course, image, birthDate, password, city, job, state, email, name, phone, address, category, username, internship, description))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getCourses() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestCourses())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editUser(data, id) {
        const { email, name, image, phone, course, username, description, birthDate } = data;
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditUser(email, name, image, phone, course, username, description, birthDate, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editAddress(data, id) {
        const { city, state, address } = data;
        return new Promise((resolve, reject) => {
            Executor.run(new RequestEditAddress(city, state, address, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static changeImage(image){
        return new Promise((resolve, reject) => {
            Executor.run(new RequestImageProfile(image))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static verifyEmail(email){
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVerifyEmail(email))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static verifyUsername(username){
        return new Promise((resolve, reject) => {
            Executor.run(new RequestVerifyUsername(username))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}