import React, { Component } from 'react';
import LoginForKids from '../screens/LoginForKids'
import { Block} from "../components";
import { connect } from 'react-redux'
import {
    Alert,
   
    Keyboard,

  } from "react-native";
class LoginKid extends Component {
    render() {
        const {navigation}=this.props;
        return (
            <Block>
                <LoginForKids navigation={navigation} handleSignUp={this.handleSignUp}></LoginForKids>
            </Block>
        );
    }

    handleSignUp = async (code) => {
        console.log("code: ",code)
        const { navigation,socket} = this.props;
        let data = { Phong:code , id: socket.id };
        socket.emit("QuanLyTre", JSON.stringify(data));
        navigation.navigate("BrowseKids");
       }
}
const mapStatetoProps = (state) => {
    return {
        socket: state.socket,
    }
}
// const mapDispatchtoProps = (dispatch) => {
//     return {
//         LoginUser : bindActionCreators(LoginAPI, dispatch),
//         // getlocationcurrent:bindActionCreators(getlocationcurrent, dispatch),
//     }
// }

export default connect(mapStatetoProps,null)(LoginKid);