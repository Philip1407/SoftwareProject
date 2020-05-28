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
var a;
export default class LoginForKids extends Component {
  constructor(props) {
    super(props);
    a= this;
    this.state = {
      code:'',
    };
  
  }


  handleSignUp = async () => {
    this.props.handleSignUp(this.state.code);
   
  }

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView style={styles.signup} >
        <ScrollView>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
          Login For Kids
          </Text>
        
          <Block middle>
         
            <Input
              label="Enter the verification code"
              style={[styles.input]}
              defaultValue={this.state.code}
              onChangeText={text => this.setState({ code: text })}
            />
            
            <Button gradient onPress={this.handleSignUp}>
                  <Text bold white center>
                    OK
                  </Text>
               
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
