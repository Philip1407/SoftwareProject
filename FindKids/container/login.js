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
    handleLogin= async (email,password)=>{
        const { LoginUser } = this.props;
        let check = await LoginUser({email,password});
        return check;
    }
}
// const mapStatetoProps = (state) => {
//     return {
       
//     }
// }
const mapDispatchtoProps = (dispatch) => {
    return {
        LoginUser : bindActionCreators(LoginAPI, dispatch),
    }
}

export default connect(null,mapDispatchtoProps)(login);