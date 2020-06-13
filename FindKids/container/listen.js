import React, { Component } from 'react';
import ListenScreens from '../screens/Listen'
import { Block } from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { uploadRecord } from './../action';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { api } from "../constants";
class listen extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        const { navigation,socket } = this.props;
        return (
            <Block>
                <ListenScreens getInfo={this.getInfo} YeuCauGhiAm={this.YeuCauGhiAm} HuyCauGhiAm={this.HuyCauGhiAm} socket={socket}></ListenScreens>
            </Block>
        );
    }


    getInfo = (info) => {
        let uri = info
        let type = "audio/m4a"
        let fd = new FormData();
        fd.append("file", {
            name: "anh son",
            type,
            uri
        });
        this.props.uploadRecord(fd);
    }
    YeuCauGhiAm = () => {
        var { socket } = this.props;
        socket.emit("YeuCauGhiAm", {maycon: "a",s :socket.id})  //UserPH lấy từ db
    }
    HuyCauGhiAm = () => {
        var { socket } = this.props;
        socket.emit("HuyCauGhiAm","HuyCauGhiAm tu: "+ socket.id)  //UserPH lấy từ db
    }


}
const mapStatetoProps = (state) => {
    return {
        socket: state.socket,
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        uploadRecord: bindActionCreators(uploadRecord, dispatch),
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(listen);