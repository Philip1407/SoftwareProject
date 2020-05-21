
import * as MediaLibrary from 'expo-media-library';
import { record } from "../constants";
var InitialState=[];

// var a = async getdowloadRecord(){
//     return await MediaLibrary.getAlbumAsync("DownloadRecording");
// }
// console.log(a)

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case record.GET_RECORD:
            state.push(action.newAsset);
            return [...state];
        default: return state;
    }
}

export default Reducer;