import axios from 'axios'

class AxiosServer {
    constructor() {
        const instance = axios.create();
        instance.interceptors.response.use(this.handleSuccess,this.handleErrorr);
        this.instance = instance;
    }

    handleSuccess(res) {
        return res;
    }
    handleErrorr(err) {
        return Promise.reject(err);
    }
    get(url) {
        return this.instance.get(url);
    }
    post(url,body){
        return this.instance.post(url,body);
    }
}
export default new AxiosServer();