import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import listen from './../assets/images/listen.png'
export default class Listen extends Component {

  renderServer() {
    return (
      <Block flex={false} row center middle>
        <Text margin={[0, 10, 0, 20]}>asd</Text>
        <Icon name="md-arrow-dropdown" size={30}  />
      </Block>
    );
  }
  render() {
   
    return (
      <Block style={styles.listen} padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Listen
        </Text>
        <Block center middle>
          <Image  source={listen}></Image>
          <TouchableOpacity >
          <Button shadow center middle style={styles.stop} >
            <Text bold center>Stop</Text>
          </Button>
          </TouchableOpacity>
          
        </Block>
        <Block flex={false} middle white shadow style={styles.servers}>
      <Button transparent onPress={() => this.setState({ show: true })}>
       {this.renderServer()}
      </Button>
    </Block>
      </Block>
     
    );
  }
}

const styles = StyleSheet.create({
  listen: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
  },
  stop: {
    width: theme.sizes.base * 20,
  },
  servers:{
    width: theme.sizes.width,
    height: theme.sizes.base * 9,
    shadowOffset: {
      width: 0,
      height: -5
    },
    shadowOpacity: 0.05,
    shadowRadius: theme.sizes.base / 2
  }
});
