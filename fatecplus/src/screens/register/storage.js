
import { Executor, Register, Courses, UserEdit , AddressEdit, ImageProfile, VerifyEmail, VerifyUsername} from '~request';

export class StorageRegister {

    static register(data, password) {
        const { city, job, state, email, name, image, phone, course, address, category, username, internship, description, birthDate } = data;

        return new Promise((resolve, reject) => {
            Executor.run(new Register(course, image, birthDate, password, city, job, state, email, name, phone, address, category, username, internship, description))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getCourses() {
        return new Promise((resolve, reject) => {
            Executor.run(new Courses())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editUser(data, id) {
        const { email, name, phone, course, username, description, birthDate } = data;
        return new Promise((resolve, reject) => {
            Executor.run(new UserEdit(email, name, phone, course, username, description, birthDate, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static editAddress(data, id) {
        const { city, state, address } = data;
        return new Promise((resolve, reject) => {
            Executor.run(new AddressEdit(city, state, address, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static changeImage(image){
        return new Promise((resolve, reject) => {
            Executor.run(new ImageProfile(image))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static verifyEmail(email){
        return new Promise((resolve, reject) => {
            Executor.run(new VerifyEmail(email))
                .then(resp => resolve(404))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static verifyUsername(username){
        return new Promise((resolve, reject) => {
            Executor.run(new VerifyUsername(username))
                .then(resp => resolve(404))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}
