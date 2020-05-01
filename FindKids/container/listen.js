import React, { Component } from 'react';
import ListenScreens from '../screens/Listen'
import { Block } from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
class listen extends Component {
    render() {
        return (
            <Block>
                <ListenScreens></ListenScreens>
            </Block>
        );
    }
}
// const mapStatetoProps = (state) => {
//     return {

//     }
// }
// const mapDispatchtoProps = (dispatch) => {
//     return {
//         SignUpUser : bindActionCreators(SignUpAPI, dispatch),
//     }
// }

export default connect(null, null)(listen);