import React, { Component } from 'react';
import DangerousScreens from '../screens/Dangerous'
import { Block ,Text} from "../components";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getDengerousAPI } from './../action';

class listen extends Component {
    render() {
        const { listdangerous } = this.props;
        return (
            <Block>
                <DangerousScreens listdangerous={listdangerous} >
                    {this.showdanger(listdangerous)}
                </DangerousScreens>
            </Block>
        );
    }

    showdanger = (listdangerous) => {
        let result =listdangerous.map((t,index)=>{
            return (
            <Text key={index} h1 bold>{t.name}</Text>
            )
        })
        return result;
       
    }

    componentDidMount=()=>{
        let {getDengerous,user}= this.props;
        getDengerous(user.user._id,user.accessToken);
    }

}
const mapStatetoProps = (state) => {
    return {
        user: state.User,
        listdangerous:state.listdangerous
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        getDengerous: bindActionCreators(getDengerousAPI, dispatch),
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(listen);