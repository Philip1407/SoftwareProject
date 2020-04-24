import * as Axios from '../axios/ApiAxios'
import { apiAxios } from "../constants";

export const login = (user) => {
    let login = apiAxios.LOGIN;
    return async () => {
        let data = await Axios.login(login,user);
        console.log("apiAxios",data) //back end trả giá trị data về
    }
}
