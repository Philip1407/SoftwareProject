import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme } from "../constants";
import logoMap from './../assets/icons/logoMap.png'
import logoRecord from './../assets/icons/record.png'
import logoActivities from './../assets/icons/logoActivities.png'
import avatar from './../assets/images/avatar.png'
import * as SMS from 'expo-sms';
const { width } = Dimensions.get("window");

class Browse extends Component {
  QuanLyTre = async () => {
    let Phong = await this.props.QuanLyTre();
    Alert.alert(
      "Room",
      Phong,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: true }
    );

  }
  Notifications = () => {
    this.props.Notifications();
  }
  showMap=()=>{
    this.props.showMap();
  }
  onPress = async () => {
    const status = await SMS.sendSMSAsync(
      '0979046876',  // nhập số điện thoại người nhận tin
      'you up?'
    );
    console.log(status);
  };
  render() {
    const { navigation } = this.props;
    return (
      <Block style={styles.container}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={avatar} style={styles.avatar} />
          </Button>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}>
          <Block flex={false} row space="between" style={styles.categories}>
            <TouchableOpacity
              onPress={this.showMap}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)">
                  <Image source={logoMap} style={styles.img} />
                </Badge>
                <Text medium height={20}>
                  MAP
                  </Text>
                <Text gray caption>
                  follow
                  </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Listen")}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)">
                  <Image source={logoRecord} style={styles.img} />
                </Badge>
                <Text medium height={20}>
                  Listen
                  </Text>
                <Text gray caption>
                  follow
                  </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Activities")}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)">
                  <Image source={logoActivities} style={styles.img} />
                </Badge>
                <Text medium height={20}>
                  Activities
                  </Text>
                <Text gray caption>
                  follow
                  </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.QuanLyTre}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)">
                  <Image source={logoActivities} style={styles.img} />
                </Badge>
                <Text medium height={20}>
                  Thêm trẻ quản lý
                  </Text>
                <Text gray caption>
                  Thêm trẻ quản lý
                  </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.Notifications}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)">
                  <Image source={logoActivities} style={styles.img} />
                </Badge>
                <Text medium height={20}>
                  Notifications
                  </Text>
                <Text gray caption>
                  Notifications
                  </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onPress}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)">
                  <Image source={logoActivities} style={styles.img} />
                </Badge>
                <Text medium height={20}>
                  SendSMS
                  </Text>
                <Text gray caption>
                  SendSMS
                  </Text>
              </Card>
            </TouchableOpacity>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}


export default Browse;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  img: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  }
});
