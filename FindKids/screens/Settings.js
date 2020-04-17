import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme } from "../constants";
import avatar from './../assets/images/avatar.png'
class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {
      username: "nhom 6",
      location: "nhom 6",
      password: "123456",
      email: "nhom6@gmail.com",
    }
  };

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }
  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  }
  renderEdit(name) {
    const { profile, editing } = this.state;
    if (editing === name) {
      if (name === "password") {
        return (
          <Block>
            <Text gray2 style={{ marginBottom: 10 }}>
            Password old
                </Text>
            <TextInput secureTextEntry={true} style={styles.default}
              onChangeText={text => this.handleEdit([name], text)}
            />
            <Text gray2 style={{ marginBottom: 10 }}>
            Password new
                </Text>
            <TextInput secureTextEntry={true} style={styles.default}
              onChangeText={text => this.handleEdit([name], text)}
            />
            <Text gray2 style={{ marginBottom: 10 }}>
            Password again
                </Text>
            <TextInput secureTextEntry={true} style={styles.default}
              onChangeText={text => this.handleEdit([name], text)}
            />
          </Block>

        );
      }
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }
    if (name === "password") {
      return <Text bold>....</Text>;
    } else {
      return <Text bold>{profile[name]}</Text>;
    }

  }

  render() {
    const { profile, editing } = this.state;

    return (
      <Block style={styles.container}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Settings
          </Text>
          <Button>
            <Image source={avatar} style={styles.avatar} />
          </Button>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Username
                </Text>
                {this.renderEdit("username")}
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit("username")}
              >
                {editing === "username" ? "Save" : "Edit"}
              </Text>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Location
                </Text>
                {this.renderEdit("location")}
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit("location")}
              >
                {editing === "location" ? "Save" : "Edit"}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Password
                </Text>
                {this.renderEdit("password")}
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit("password")}
              >
                {editing === "password" ? "Save" : "Edit"}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  E-mail
                </Text>
                <Text bold>{profile.email}</Text>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}


export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  pwrd: {
    borderColor: theme.colors.black
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  }
});
