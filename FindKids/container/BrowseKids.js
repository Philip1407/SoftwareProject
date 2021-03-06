import React, { Component } from 'react';
import BrowseScreens from '../screens/BrowseKids'
import { Block} from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {uploadRecord} from '../action'
import isEqual from 'lodash/isEqual';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import * as MediaLibrary from 'expo-media-library';
import { apiAxios } from "../constants";

var a;
class Browse extends Component {
    constructor(props) {
        super(props);
        a= this;
        const recording = new Audio.Recording();
        props.socket.on("NhanYeuCauGhiAm",async function(data){
            console.log("2   ");
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
        })
        props.socket.on("HuyYeuCauGhiAm",async function(data){
            console.log("4   ")
            try {
                await recording.stopAndUnloadAsync();
              } catch (error) {
                // Do nothing -- we are already unloaded.
              }
              const info = await FileSystem.getInfoAsync(recording.getURI());
              console.log(`FILE INFO: ${JSON.stringify(info)}`);
              let newAsset = await MediaLibrary.createAssetAsync(recording.getURI());
              //create an album on the device in to which the recordings should be stored, and pass in the new asset to store
           
              await MediaLibrary.createAlbumAsync('Recording', newAsset);
              let uri = recording.getURI();
              let type = "audio/m4a"
              let fd = new FormData();
              fd.append("file", {
                  name: "anh son",
                  type,
                  uri
              });
              await props.uploadRecord(fd);
             
            props.socket.emit("TaiFileGhiAm", props.socket.id);
        })
        props.socket.on("TaiFileGhiAmVeMayPH",async function(data){
            console.log("6   ")
            let uri = await FileSystem.downloadAsync(
              apiAxios.UPLOADRECORD + "/down",
              FileSystem.documentDirectory + 'small.m4a'
          )
          let newAsset = await MediaLibrary.createAssetAsync(uri.uri);
          await MediaLibrary.createAlbumAsync('DownloadRecording', newAsset);
        })

        // props.socket.on("locationcerrnet", function (data) {
        //     data = JSON.parse(data);
        //     console.log("map: ", data.region)
        //     props.getlocationcurrent(data.region)
        // })

        this.state = {
            myPosition: null,
            region: {
                latitude: null,
                longitude: null
            },
        };
    }
    render() {
        const {navigation,socket}=this.props;
        return (
            <Block>
                <BrowseScreens navigation={navigation}  Notifications={this.Notifications}></BrowseScreens>
            </Block>
        );
    }
    componentDidMount=()=> {
       
        this.watchLocation();
        Permissions.askAsync(Permissions.LOCATION,Permissions.AUDIO_RECORDING, Permissions.CAMERA_ROLL);
       
    }
    componentWillUnmount=()=> {
        if (this.watchID) {
            navigator.geolocation.clearWatch(this.watchID);
        }
    }

    UNSAFE_componentWillUpdate = async()=>{
        // this.watchLocation();
        let {socket,user } = this.props;
        let data ={id: socket.id, region: this.state.region, username:user.username}
        await socket.emit("location",JSON.stringify(data));
      
    }

    watchLocation= async ()=> { // get current location
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const myLastPosition = this.state.myPosition;
                const myPosition = position.coords;
                if (!isEqual(myPosition, myLastPosition)) {
                    this.setState({
                        myPosition: myPosition,
                        region: {
                            latitude: myPosition.latitude,
                            longitude: myPosition.longitude
                        }
                    });
                    
                    // this.props.getlocationcurrent(this.state.region)
                }
            },
            null,
            // { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }); return về mỗi khi thay đổi 100m
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 });//return về mỗi khi thay đổi 1m
    }

    Notifications=()=>{
        var { socket } = this.props;
        socket.emit("SendDangerous","con đang gặp nguy hiểm"); //UserPH lấy từ db
    }

}
const mapStatetoProps = (state) => {
    return {
        socket: state.socket,
        user:state.User,
        // locationcurrent: state.locationcurrent,
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        uploadRecord: bindActionCreators(uploadRecord, dispatch),
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Browse);