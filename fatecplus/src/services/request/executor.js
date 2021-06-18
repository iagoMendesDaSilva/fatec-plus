import axios from 'axios';

export class Executor{

    constructor(){
        throw new Error("Can't instantiate to Executor class.")
    }

    static run(request){
        return axios({
            url: request.url,
            data: request.params,
            header: request.header,
            method: request.method,
        });
    }
}