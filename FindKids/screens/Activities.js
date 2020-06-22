import React from 'react';
import { Text, View, TouchableOpacity, Vibration, Platform, StyleSheet } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export class Activities extends React.Component {
  state = {
    expoPushToken: '',
    notification: {},
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  sendPushNotification = async (text) => {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'child: ',
      body: text,
      data: { data: 'Help me' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  render() {
    return (
      <View style={styles.container}>
         <Text style={{marginLeft: 20, marginBottom: 20, fontSize: 25,marginTop: 35}}>On press to help: </Text>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <TouchableOpacity onPress={() => this.sendPushNotification("Gặp người lạ (Có quen biết với bố mẹ)")}>
          <View style={{...styles.button, backgroundColor: 'limegreen'}}>
            <Text style={styles.red}>Gặp người lạ (Có quen biết với bố mẹ)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.sendPushNotification("Lạc đường")}>
        <View style={{...styles.button, backgroundColor: 'orange'}}>
            <Text style={styles.red}>Lạc đường</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.sendPushNotification("Gặp tai nạn - cần trợ giúp ( Gọi xe cứu thương,...)")}>
        <View style={{...styles.button, backgroundColor: 'orange'}}>
            <Text style={styles.red}>Gặp tai nạn - cần trợ giúp ( Gọi xe cứu thương,...)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.sendPushNotification("Cần sự trợ giúp tại chỗ")}>
        <View style={{...styles.button, backgroundColor: 'tomato'}}>
            <Text style={styles.red}>Cần sự trợ giúp tại chỗ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.sendPushNotification("Cần gọi cảnh sát")}>
          <View style={{...styles.button, backgroundColor: 'tomato'}}>
            <Text style={styles.red}>Cần gọi cảnh sát</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  bigBlue: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'white',
    fontSize: 18
  },
  button: {
    marginBottom: 30,
    alignItems: 'center',
    padding: 15,
    borderRadius: 120,
    marginLeft: 20,
    marginRight: 20,
    width: 350
  },
});
export default Activities;