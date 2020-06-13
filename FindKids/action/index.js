// import * as Axios from '../axios/api'
import axiosService from '../axios/axios'

import { api } from "../constants";
import { Socket, record, action, location as currentlocation } from "../constants";

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import axios from '../axios/axios';

export const login = (user) => {// đăng nhập
    return async (dispatch) => {
        try {
            let result = await fetch(api.LOGIN,
                {
                    method: 'POST',
                    body: JSON.stringify(user),
                });
            let result1 = await result.json()
            if (result1.status != false) {
                return dispatch(getUser(result1.user, result1.accessToken))
            } else {
                return false
            }
        } catch (error) {
            console.error(error);
        }
    }
}


export const signup = (user) => { // đăng ký 
    return async (dispatch) => {
        try {
            let result = await fetch(api.SIGNUP,
                {
                    method: 'POST',
                    body: JSON.stringify(user),
                });
            let result1 = await result.json()
          
            if (result1.status != false) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error(error);
        }
    }

}

export const uploadRecord = (data) => {
    let uploadRecord = api.UPLOADRECORD;
    console.log(uploadRecord)
    return async (dispatch) => {
        //    let abc= await axiosService.post(uploadRecord,{data});
        //    console.log("api",abc.data) //back end trả giá trị data về
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

export const getlocationcurrentAPI = (Kids,token,day) => {
    return async (dispatch) => {
        try {
            let result = await fetch(api.LOCATION,
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':  token
                      },
                    body: JSON.stringify({Kids,day})
                });
            let location = await result.json();
            if (location.status != false) {
                return dispatch(getlocationcurrent(location))
            } else {
                return false
            }
        } catch (error) {
            console.error(error);
        }
    }
}


export const getlocationcurrent = (location) => {
    return {
        type: currentlocation.location_current,
        location
    }
}

export const getUser = (user, accessToken) => {
    // console.log("action kQ: ", user, "  tocken: ", accessToken)
    return {
        type: action.GET_USER,
        user,
        accessToken
    }
}
