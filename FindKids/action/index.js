// import * as Axios from '../axios/ApiAxios'
import axiosService from '../axios/axios'

import { apiAxios } from "../constants";
import { Socket,record,location as currentlocation} from "../constants";

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const login = (user) => {// đăng nhập
    let login = apiAxios.LOGIN;
    return async () => {
        // let data = await axiosService.post(login,user);
        // console.log("apiAxios",data) //back end trả giá trị data về
        return { status: 200 }
    }
}


export const signup = (user) => { // đăng ký 
    let signup = apiAxios.SIGNUP;
    return async () => {
        // let data = await axiosService.post(signup,user);
        // console.log("apiAxios",data) //back end trả giá trị data về
        console.log(user)
        return { status: 200 }
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
            body: data
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



