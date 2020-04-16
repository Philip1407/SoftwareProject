import React, { Component } from "react";
import {
  StyleSheet,
  Image
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";

import listen from './../assets/images/listen.png'

export default class Listen extends Component {

  render() {

    return (
      <Block style={styles.listen} padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Listen
        </Text>
        <Block center middle>
          <Image  source={listen}></Image>
          <Button style={styles.stop} gradient >
            <Text sbold white center>Stop</Text>
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
  stop:{
    width: theme.sizes.base*20
  }
});
