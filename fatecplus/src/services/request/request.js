export class Request {

    constructor(url, method, header, params) {
        this._url = url;
        this._header = header;
        this._params = params;
        this._method = method;
    }

    get url() {
        return this._url;
    }

    get method() {
        return this._method;
    }

    get header() {
        return this._header;
    }

    get params() {
        return this._params;
    }
}