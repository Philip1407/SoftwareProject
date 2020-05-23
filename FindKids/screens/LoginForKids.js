import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

export default class LoginForKids extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    passwordCF:null,
    errors: [],
    loading: false
  };

  handleSignUp = async () => {
    const { navigation, handleSignUp } = this.props;
    const { email, username, password ,passwordCF} = this.state;
    const errors = [];
    let check = await handleSignUp(email, username, password);
    Keyboard.dismiss();
    this.setState({ loading: true });
    // check with backend API or with some static data
    if (!email) errors.push("email");
    if (!username) errors.push("username");
    if (!password) errors.push("password");
    if (password !== passwordCF) errors.push("passwordCF");
    this.setState({ errors, loading: false });
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
          Login For Kids
          </Text>
        
          <Block middle>
         
            <Input
              email
              label="Enter the verification code"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                  <Text bold white center>
                    OK
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
                I am not a child
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
  },

});
