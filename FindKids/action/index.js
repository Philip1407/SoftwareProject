// import * as Axios from '../axios/ApiAxios'
import axiosService from '../axios/axios'
import { apiAxios } from "../constants";
export const login = (user) => {// đăng nhập
    let login = apiAxios.LOGIN;
    return async () => {
        // let data = await axiosService.post(login,user);
        // console.log("apiAxios",data) //back end trả giá trị data về
        return {status :200}
    }
}


export const signup = (user) => { // đăng ký 
    let signup = apiAxios.SIGNUP;
    return async () => {
        // let data = await axiosService.post(signup,user);
        // console.log("apiAxios",data) //back end trả giá trị data về
        console.log(user)
        return {status :200}
    }
}

export const uploadRecord = (data) => { 
    let uploadRecord = apiAxios.UPLOADRECORD;
    console.log(uploadRecord)
    return async () => {
    //    let abc= await axiosService.post(uploadRecord,{data});
    //    console.log("apiAxios",abc.data) //back end trả giá trị data về
        //  console.log("abc",data)
        let abc= await fetch(uploadRecord, {
            method: 'POST',
            body: data
            });
            console.log('Cloudinary Info:',await abc.json() )
          }
      
}
