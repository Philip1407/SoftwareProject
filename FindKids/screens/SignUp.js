import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView
} from "react-native";


import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

export default class SignUp extends Component {
  state = {
    username: null,
    password: null,
    passwordCF:null,
    firstname: null,
    lastname: null,
    errors: [],
    loading: false
  };

  handleSignUp = async () => {
    const { navigation, handleSignUp } = this.props;
    const { username, password,passwordCF, firstname, lastname} = this.state;
    const errors = [];
    let check = await handleSignUp(username, password, firstname, lastname);
    Keyboard.dismiss();
    this.setState({ loading: true });
    // check with backend API or with some static data
    
    if (!username) errors.push("username");
    if (!password) errors.push("password");
    if (password !== passwordCF) errors.push("passwordCF");
    if (!firstname) errors.push("firstname");
    if (!lastname) errors.push("lastname");
    this.setState({ errors, loading: false });
    console.log(check)
    if (check.status === 200 && !errors.length) {
      Alert.alert(
        "Success!",
        "Your account has been created",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Browse");
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (

      <KeyboardAvoidingView style={styles.signup} behavior="hight">
        <ScrollView>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Sign Up
          </Text>
          <Block middle>
            {/* <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            /> */}
            <Input
              label="Username"
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
            <Input
              secure
              label="Password Confirm"
              error={hasErrors("passwordCF")}
              style={[styles.input, hasErrors("passwordCF")]}
              defaultValue={this.state.passwordCF}
              onChangeText={text => this.setState({ passwordCF: text })}
            />
            <Input
              label="First name"
              error={hasErrors("First name")}
              style={[styles.input, hasErrors("First name")]}
              onChangeText={text => this.setState({ firstname: text })}
            />
            <Input
              label="Last name"
              error={hasErrors("Last name")}
              style={[styles.input, hasErrors("Last name")]}
              onChangeText={text => this.setState({ lastname: text })}
            />
            
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                  <Text bold white center>
                    Sign Up
                  </Text>
                )}
            </Button>
            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
   
        </ScrollView>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.white,
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
