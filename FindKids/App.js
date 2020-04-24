import React from 'react';
import { StyleSheet } from 'react-native';

import Navigation from "./navigations";
import { Block } from "./components";

import configStore from './redux/configureStore'
import { Provider } from 'react-redux'
const store = configStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Block white>
          <Navigation />
        </Block>
      </Provider>

    );
  }
}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

