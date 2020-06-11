// import * as Axios from '../axios/ApiAxios'
import axiosService from '../axios/axios'

import { apiAxios } from "../constants";
import { Socket,record,action, location as currentlocation} from "../constants";

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import axios from '../axios/axios';

export const login = (user) => {// đăng nhập
    let login = `${apiAxios.LOGIN}?username=${user.username}&password=${user.password}`;
    return async (dispatch)=>{
        // let data = await axiosService.post(signup,user);
        // console.log("apiAxios",data) //back end trả giá trị data về
        console.log('new login')
        await fetch(login,
             {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => data.json())
            .then(result => {
                if(result.auth===true)
                    { 
                        console.log(result.token)
                        dispatch(getUser(result.user,result.token))
                        return {status: 200}
                    }
                else return {status: 400}
            })
    }
}


export const signup = (user) => { // đăng ký 
    let signUp = apiAxios.SIGNUP;
    return async (dispatch)=>{
        // let data = await axiosService.post(signup,user);
        // console.log("apiAxios",data) //back end trả giá trị data về
        await fetch(signUp, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => result.json())
        .then(response=>{
            console.log(response !=='User created')
            if(response !=='User created') return {status: 400}
            return {status:200}
        })
    }
}

export const uploadRecord = (data) => {
    let uploadRecord = apiAxios.UPLOADRECORD;
    console.log(uploadRecord)
    return async (dispatch) => {
        //    let abc= await axiosService.post(uploadRecord,{data});
        //    console.log("apiAxios",abc.data) //back end trả giá trị data về
        //  console.log("abc",data)
        await fetch(uploadRecord, {  //uploadRecord la đường dẫn route bên báckend
            method: 'POST',
            body: JSON.stringify(data)
        });
        // console.log('Cloudinary Info:',await abc.json());

        //tải reacord về máy
        
        // let uri = await FileSystem.downloadAsync(
        //     uploadRecord + "/down",
        //     FileSystem.documentDirectory + 'small.m4a'
        // )
        // // console.log("day la uri: ",uri)   
        // let newAsset = await MediaLibrary.createAssetAsync(uri.uri);
        // //create an album on the device in to which the recordings should be stored, and pass in the new asset to store
        // MediaLibrary.createAlbumAsync('DownloadRecording', newAsset)
        //   .then(() => { 
        //     //   console.log('Album created!',newAsset)  
        //       dispatch(getRecordtoRedux(newAsset));        
        //     })
        //   .catch(err => console.log('Album creation error', err));

        //   const media = await MediaLibrary.getAssetsAsync({ // lấy tất cả uri trong máy
        //     mediaType: MediaLibrary.MediaType.audio,
        //  });
        // //  console.log(media)
        //  // cần fix tạo 1 mảng uri lưu vào db
        
    }
}


export const getRecordtoRedux = (newAsset) => { 
    return {
        type: record.GET_RECORD,
        newAsset
    }
}

export const getlocationcurrent = (location) => { 
    console.log("abababa",location)
    return {
        type: currentlocation.location_current,
        location
    }
}

export const getUser = (user, jwt)=>{
    return{
        type: action.GET_USER,
        user,
        jwt
    }
}
