import React, { Component } from 'react';
import MapScreens from '../screens/Map'
import { Block} from "../components";
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
// import {login as LoginAPI} from '../action'

import io from 'socket.io-client';

class Map extends Component {
    constructor(props) {
        super(props);
        // this.socket= io('http://192.168.1.11:3001',{ jsonp: false, agent: '-', pfx: '-', cert: '-', ca: '-', ciphers: '-', rejectUnauthorized: '-', perMessageDeflate: '-' });
        // this.props.socket.emit("abc","baoson")
    }
    render() {
        const {navigation,socket}=this.props;
        // socket.emit("abc",socket.id+"baoson")
        return (
            <Block>
                <MapScreens navigation={navigation}></MapScreens>
            </Block>
        );
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
//     }
// }

export default connect(mapStatetoProps,null)(Map);