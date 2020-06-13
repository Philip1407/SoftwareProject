import React, { Component } from 'react';
import LoginScreens from '../screens/Login'
import { Block} from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {login as LoginAPI} from '../action'


class login extends Component {
    render() {
        const {navigation}=this.props;
        return (
            <Block>
                <LoginScreens navigation={navigation} handleLogin={this.handleLogin}></LoginScreens>
            </Block>
        );
    }
    handleLogin= async (username,password)=>{
        const { LoginUser } = this.props;
        let check = await LoginUser({username,password});
        return check;
    }
}
const mapStatetoProps = (state) => {
    return {
        User: state.User
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        LoginUser : bindActionCreators(LoginAPI, dispatch),
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(login);