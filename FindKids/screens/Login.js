import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";



export default class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: [],
    loading: false
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    const { navigation, handleLogin } = this.props;
    let check = await handleLogin(username, password);
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });
    // check with backend API or with some static data
    if (check != false) {
      navigation.navigate("Browse");
    }
    else {
      errors.push("username");
      errors.push("password");
    }
    this.setState({ errors, loading: false });
  }
  
  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior="hight">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold >
            Login
          </Text>
          <Block middle>
            <Input
              label="username"
              error={hasErrors("username")}
              style={[styles.input, hasErrors("username")]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                  <Text bold white center>
                    Login
                  </Text>
                )}
            </Button>


            <Button onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
