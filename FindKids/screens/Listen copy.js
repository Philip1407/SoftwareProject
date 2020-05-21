import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { Button, Block, Text, Badge, Card } from "../components";
import { theme } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get("window");

class Listen extends Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      newAsset:null,
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
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));
    // // UNCOMMENT THIS TO TEST maxFileSize:
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
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    // this.sound = sound;
    this.setState({
      isLoading: false,
    });
    await this.createAudioAsset();
  }

  async createAudioAsset() {
    let newAsset = await MediaLibrary.createAssetAsync(this.recording.getURI());
    this.setState({
      newAsset:newAsset
    })
    //create an album on the device in to which the recordings should be stored, and pass in the new asset to store
 
    MediaLibrary.createAlbumAsync('Recording', newAsset)
      .then(() => {
        console.log('Album created!')
        this.props.getInfo(this.recording.getURI())
      })
      .catch(err => console.log('Album creation error', err));
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };


  _onPlayPausePressed = async () => {
    const soundObject = new Audio.Sound();
    let a =this.state.newAsset.uri;
    console.log("Aa", a)
    this.sound= await soundObject.loadAsync(this.state.newAsset);
    // await soundObject.playAsync();
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

  render() {
    let { isRecording, isPlaying } = this.state;
    return (
     
      <Block style={styles.listen} padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Listen
        </Text>
        <Block center padding={[theme.sizes.base * 4, 0]} >
          <Button shadow center middle style={styles.records} onPress={this._onRecordPressed}>
            <Badge
              margin={[15, 28, 15]}
              size={100}
              color="rgba(41,216,143,0.20)">
              {!isRecording ? <Icon name="microphone" size={100} />
                : <Icon name="stop" size={100} />}
            </Badge>
          </Button>
          <Text bold>
            {this._getRecordingTimestamp()}
          </Text>
          <Button shadow center middle style={styles.records} onPress={this._onPlayPausePressed}>
            <Badge
              margin={[15, 28, 15]}
              size={100}
              color="rgba(41,216,143,0.20)">
              {!isPlaying ? <Icon name="play" size={100} />
                : <Icon name="stop" size={100} />}
            </Badge>
          </Button>
          <Text bold>
            {this._getPlaybackTimestamp()}
          </Text>
        </Block>
        <Card center shadow style={styles.category}>
          <Button style={styles.playRecord}  onPress={this._onPlayPausePressed}>
          <Badge
              margin={[10,10,10]}
              size={40}
             >
              {!isPlaying ? <Icon name="play" size={40} />
                : <Icon name="stop" size={40} />}
            </Badge>
          </Button>
          <Text height={100} right >
            Name
          </Text>
          <Text bold>
            {this._getPlaybackTimestamp()}
          </Text>
        </Card>
        
      </Block>
    );
  }
}
export default Listen;

const styles = StyleSheet.create({
  listen: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
  },
  records: {
    height: theme.sizes.base * 10,
    width: theme.sizes.base * 10,
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

});
