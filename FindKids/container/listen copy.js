import React, { Component } from 'react';
import ListenScreens from '../screens/Listen'
import { Block } from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Base64 } from 'js-base64';
import {uploadRecord} from './../action';

class listen extends Component {
    render() {
        const {navigation,socket,album}=this.props;
        console.log("album ",album)
        return (
            <Block>
                <ListenScreens getInfo={this.getInfo}></ListenScreens>
            </Block>
        );
    }
    getInfo=(info)=>{
        let uri =info
        let type = "audio/m4a"
        let fd = new FormData();
        fd.append("file", {
            name:"anh son ",
            type,
            uri
        });     
        this.props.uploadRecord(fd)
    }
}
const mapStatetoProps = (state) => {
    return {
        socket: state.socket,
        album:state.album,
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        uploadRecord : bindActionCreators(uploadRecord, dispatch),
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(listen);