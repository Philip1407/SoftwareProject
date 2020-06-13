import React, { Component } from 'react';
import SignupScreens from '../screens/SignUp'
import { Block} from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {signup as SignUpAPI} from '../action'
class signup extends Component {
    render() {
        const {navigation}=this.props;
        return (
            <Block>
                <SignupScreens navigation={navigation} handleSignUp={this.handleSignUp}></SignupScreens>
            </Block>
        );
    }
    handleSignUp = async(user)=>{
        const { SignUpUser } = this.props;
        let check = await SignUpUser(user);
        return check;
    }
}
// const mapStatetoProps = (state) => {
//     return {
       
//     }
// }
const mapDispatchtoProps = (dispatch) => {
    return {
        SignUpUser: bindActionCreators(SignUpAPI, dispatch),
    }
}

export default connect(null,mapDispatchtoProps)(signup);