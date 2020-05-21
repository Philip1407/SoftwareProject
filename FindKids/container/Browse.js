import React, { Component } from 'react';
import BrowseScreens from '../screens/Browse'
import { Block} from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {login as LoginAPI} from '../action'


class Browse extends Component {
    render() {
        const {navigation}=this.props;
        return (
            <Block>
                <BrowseScreens navigation={navigation} QuanLyTre={this.QuanLyTre}></BrowseScreens>
            </Block>
        );
    }

    QuanLyTre=()=>{
        var {socket}=this.props;
        console.log("QuanLyTre + ten máy con")  //lấy id máy con vào db
        let data ={Phong: "UserPH",id:socket.id}
        socket.emit("QuanLyTre",JSON.stringify(data))  //UserPH lấy từ db
      }
}
const mapStatetoProps = (state) => {
    return {
        socket: state.socket,
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        LoginUser : bindActionCreators(LoginAPI, dispatch),
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Browse);