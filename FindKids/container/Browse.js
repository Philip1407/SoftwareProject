import React, { Component } from 'react';
import BrowseScreens from '../screens/Browse'
import { Block } from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { uploadRecord, getlocationcurrentAPI } from '../action'
import isEqual from 'lodash/isEqual';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import { Alert, Vibration } from "react-native";
import * as geolib from 'geolib';
import { apiAxios } from "../constants";

var a;
class Browse extends Component {
    constructor(props) {
        super(props);
        a = this;
        const recording = new Audio.Recording();
        props.socket.on("NhanYeuCauGhiAm", async function (data) {
            console.log("2   ");
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
        })
        props.socket.on("HuyYeuCauGhiAm", async function (data) {
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
        props.socket.on("TaiFileGhiAmVeMayPH", async function (data) {
            console.log("6   ")
            let uri = await FileSystem.downloadAsync(
                apiAxios.UPLOADRECORD + "/down",
                FileSystem.documentDirectory + 'small.m4a'
            )
            let newAsset = await MediaLibrary.createAssetAsync(uri.uri);
            await MediaLibrary.createAlbumAsync('DownloadRecording', newAsset);
        })

        props.socket.on("locationcerrnet", function (data) {
            data = JSON.parse(data);
            console.log("locationcerrnet: ", data.region)
            a.setState({
                kidregion: data.region
            })
        })

        props.socket.on("SendDangerousSV", function (data) {
            console.log("SendDangerousSV")
            Vibration.vibrate([1000, 2000, 2000], true);
            Alert.alert(
                "Dangerous",
                data,
                [
                    { text: "OK", onPress: () => Vibration.cancel() }
                ],
                { cancelable: true }
            );

        })



        this.state = {
            myPosition: null,
            region: {
                latitude: null,
                longitude: null
            },
            kidregion: {
                latitude: null,
                longitude: null
            }
        };
    }
    render() {
        const { navigation, locationcurrent, socket } = this.props;
        return (
            <Block>
                <BrowseScreens navigation={navigation} QuanLyTre={this.QuanLyTre} Notifications={this.Notifications} showMap={this.showMap}></BrowseScreens>
            </Block>
        );
    }
    componentDidMount = () => {
        this.watchLocation();
        Permissions.askAsync(Permissions.LOCATION, Permissions.AUDIO_RECORDING, Permissions.CAMERA_ROLL);

    }
    componentWillUnmount = () => {
        if (this.watchID) {
            navigator.geolocation.clearWatch(this.watchID);
        }
    }

    UNSAFE_componentWillUpdate = async () => {
        // this.watchLocation();
        let { socket, user, listdangerous } = this.props;
        let { kidregion } = this.state;
        let data = { id: socket.id, region: this.state.region, username: user.username }
        await socket.emit("location", JSON.stringify(data));
        if (listdangerous != undefined) {
            let mypoi = {
                latitude: listdangerous[0].latitude,
                longitude: listdangerous[0].longitude
            };
            let myloca = {
                ...kidregion
            };
            if (myloca.latitude != null) {
                // console.log("myloca: ",myloca)
                let re = geolib.isPointWithinRadius(
                    myloca,
                    mypoi,
                    100
                );
                // console.log("re: ", re)
                if (re === true) {
                    Vibration.vibrate([1000, 2000, 2000], true);
                    Alert.alert(
                        "Dangerous",
                        "Con đang gần vị trí nguy hiểm",
                        [
                        { text: "OK", onPress: () => Vibration.cancel() }
                        ],
                        { cancelable: true }
                    );
                }
            }
        }
       


    }

    QuanLyTre = () => {
        var { socket, user } = this.props;
        let data = { Phong: user.user.Kids, id: socket.id };
        // console.log("listdangerous: ",listdangerous[0])
        socket.emit("QuanLyTre", JSON.stringify(data)); //UserPH lấy từ db
        return user.user.Kids;
    };

    watchLocation = async () => { // get current location
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

    Notifications = () => {

        var { socket } = this.props;
        socket.emit("SendDangerous", "con đang gặp nguy hiểm"); //UserPH lấy từ db
    }

    showMap = async () => {
        let { user, getlocationcurrent } = this.props;
        await getlocationcurrent(user.user.Kids, user.accessToken, 1);
        this.props.navigation.navigate("Map");
    }

}
const mapStatetoProps = (state) => {
    return {
        socket: state.socket,
        // locationcurrent: state.locationcurrent,
        user: state.User,
        listdangerous: state.listdangerous
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        uploadRecord: bindActionCreators(uploadRecord, dispatch),
        getlocationcurrent: bindActionCreators(getlocationcurrentAPI, dispatch),
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Browse);