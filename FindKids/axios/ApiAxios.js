import axiosService from './axios'
import { apiAxios } from "../constants";

export const login =(url,body)=>{
    return axiosService.post(`${apiAxios.LOCALHOST}${url}`,body)
};
