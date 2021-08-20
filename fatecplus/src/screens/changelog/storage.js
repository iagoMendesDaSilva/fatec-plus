import { Executor, News } from '~request';

export class StorageChangeLog {

    static getNews() {
        return new Promise((resolve, reject) => {
            Executor.run(new News())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response ? err.response.status : 500));
        });
    }

}
