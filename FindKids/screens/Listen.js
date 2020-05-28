import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  View
} from "react-native";
import { Button, Block, Text, Badge, Card } from "../components";
import { theme } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import { apiAxios } from "../constants";
var ag;
class Listen extends Component {
  constructor(props) {
    super(props);
    ag=this;
    props.socket.on("NhanYeuCauGhiAm",function(data){
      console.log("2   "+props.socket.id+"   Nhaan  aád "+data);
      if(!ag.state.isRecording){
        ag._stopPlaybackAndBeginRecording();
      }
    })
  props.socket.on("HuyYeuCauGhiAm",function(data){
      console.log("4   "+props.socket.id+"   Nhaan   "+data)
      if(ag.state.isRecording){
        ag._stopRecordingAndEnablePlayback();
      props.socket.emit("TaiFileGhiAm", props.socket.id);
      }
    })
    props.socket.on("TaiFileGhiAmVeMayPH",async function(data){
      console.log("6   "+props.socket.id+"   Nhaan   "+data)
      let uri = await FileSystem.downloadAsync(
        apiAxios.UPLOADRECORD + "/down",
        FileSystem.documentDirectory + 'small.m4a'
    )
    // console.log("day la uri: ",uri)   
    let newAsset = await MediaLibrary.createAssetAsync(uri.uri);
    //create an album on the device in to which the recordings should be stored, and pass in the new asset to store
    await MediaLibrary.createAlbumAsync('DownloadRecording', newAsset);
     

  })

    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      YC:false,
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));
    // // UNCOMMENT this TO TEST maxFileSize:
    // this.recordingSettings.android['maxFileSize'] = 12000;
  }

  componentDidMount() {
    this._askForPermissions();
  }
  componentWillUnmount() {
    this._onStopPressed()
  }
  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING, Permissions.CAMERA_ROLL);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };
  _updateScreenForSoundStatus = status => { // cập nhật thời gian phát ghi âm
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };
  _updateScreenForRecordingStatus = status => { // cập nhật thời gian ghi âm
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };
  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
      YC:true,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    await this.createAudioAsset();
    // let result = await DocumentPicker.getDocumentAsync({});
    // let newAsset = await MediaLibrary.createAssetAsync(result.uri);
    // const soundObject = new Audio.Sound();
    // soundObject.setOnPlaybackStatusUpdate(this._updateScreenForSoundStatus);
    // const { sound, status} = await soundObject.loadAsync(
    //   newAsset,
    // { isLooping: true,
    //   isMuted: this.state.muted,
    //   volume: this.state.volume,
    //   rate: this.state.rate,
    //   shouldCorrectPitch: this.state.shouldCorrectPitch
    // },
    // true);
    // this.sound = soundObject;
   
    this.setState({
      isLoading: false,
      YC:false,
    });
   
  }

  async createAudioAsset() {
    let newAsset = await MediaLibrary.createAssetAsync(this.recording.getURI());
    //create an album on the device in to which the recordings should be stored, and pass in the new asset to store
 
    await MediaLibrary.createAlbumAsync('Recording', newAsset);
    this.props.getInfo(this.recording.getURI())
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  
  _onPlayPausePressed = async () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        await this.sound.pauseAsync();
      } else {
        await this.sound.playAsync();
      }
    }
  };
  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };
  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getSeekSliderPosition() { // lấy thời gian đã ghi âm để phát lại
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }
  _getRecordingTimestamp() {// lấy thời gian ghi âm
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }
  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
        this.state.soundDuration
      )}`;
    }
    return '';
  }
  YeuCauGhiAm=()=>{
    this.props.YeuCauGhiAm();  
    // this.props.socket.emit("YeuCauGhiAm",socket.id)  //UserPH lấy từ db
  }
 
  HuyCauGhiAm=()=>{
    this.props.HuyCauGhiAm();  
    // this.props.socket.emit("HuyCauGhiAm",socket.id)  //UserPH lấy từ db
}
  ChonFile= async ()=>{
    let result = await DocumentPicker.getDocumentAsync({});
    let newAsset = await MediaLibrary.createAssetAsync(result.uri);
    const soundObject = new Audio.Sound();
    soundObject.setOnPlaybackStatusUpdate(this._updateScreenForSoundStatus);
    const { sound, status} = await soundObject.loadAsync(
      newAsset,
    { isLooping: true,
      isMuted: this.state.muted,
      volume: this.state.volume,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch
    },
    true);
    this.sound = soundObject;
  }

  render() {
    let { isRecording, isPlaying } = this.state;
    return (
      <Block style={styles.listen} padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Listen
        </Text>
        <Block style={styles.mainView} padding={[theme.sizes.base * 4, 0]} >

          <View style={styles.view}>
            <View style={styles.viewBadge1}>
                <Button shadow center middle style={styles.records} onPress={this._onRecordPressed}>
                  <Badge
                    margin={[20]}
                    size={40}
                    color="rgba(41,216,143,0.20)">
                    {!isRecording ? <Icon name="microphone" size={40} />
                      : <Icon name="stop" size={40} />}
                  </Badge>
                </Button>
                <View style={styles.viewText}>
                  <Text bold>
                    {this._getRecordingTimestamp()}
                  </Text>
                </View>    
            </View>
            <View style={styles.viewBadge1}>
                <Button shadow center middle style={styles.records} onPress={this._onPlayPausePressed}>
                  <Badge
                    margin={[20]}
                    size={40}
                    color="rgba(41,216,143,0.20)">
                    {!isPlaying ? <Icon name="play" size={40} />
                      : <Icon name="stop" size={40} />}
                  </Badge>
                </Button>
                <View style={styles.viewText}>
                  <Text bold>
                    {this._getPlaybackTimestamp()}
                  </Text>
                </View>
            </View>
          </View>
         
          <View style={styles.listButton}>
            <TouchableOpacity onPress={this.YeuCauGhiAm}>
              <View style={styles.button}>
              <Text style={styles.buttonText}>Yêu cầu ghi âm</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this. HuyCauGhiAm}>
              <View style={styles.button}>
              <Text style={styles.buttonText}>Hủy yêu cầu ghi âm</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this. ChonFile}>
              <View style={styles.button}>
              <Text style={styles.buttonText}>Chọn file</Text>
              </View>       
            </TouchableOpacity>
         
          </View>
       
          
      
          
        </Block>
      </Block>
    );
  }
}
export default Listen;

const styles = StyleSheet.create({
  listen: {
    flex: 1,
    backgroundColor: theme.colors.white,
    
  },
  records: {
    height: theme.sizes.base * 5,
    width: theme.sizes.base * 5,
    borderRadius: 100,
    backgroundColor: theme.colors.primary
  },
  playRecord:{
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 100,
    backgroundColor:'red',
    marginRight:10
  },
  category: {
    flexDirection: 'row',
    maxHeight: theme.sizes.base * 3,
    backgroundColor:'red'
  },
  view: {
   flexDirection: 'row',
    marginTop: 100,
   

  },
  viewBadge1: {
   margin: 10
  },
  viewText: {
    marginLeft: 20
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 30,
    width: 180,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 20
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  },
  listButton: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 80
    
  }
});
