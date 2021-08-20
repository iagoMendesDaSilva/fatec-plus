import { Executor, Teachers, Coordinators, CoordinatorEdit, Courses} from '~request';

export class StorageCoordinator {

    static getCoordinators() {
        return new Promise((resolve, reject) => {
            Executor.run(new Coordinators())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

    static getTeachers() {
        return new Promise((resolve, reject) => {
            Executor.run(new Teachers())
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

    static changeCoordinator(coordinatorId, courseId) {
        return new Promise((resolve, reject) => {
            Executor.run(new CoordinatorEdit(coordinatorId, courseId))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }
}
