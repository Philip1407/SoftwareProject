import React, { Component } from 'react';
import MapScreens from '../screens/Map'
import { Block } from "../components";
import { connect } from 'react-redux'
import { View } from 'react-native';
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { bindActionCreators } from 'redux';
import { getlocationcurrentAPI ,dangerousAPI} from '../action'
const geolib = require('geolib');
import { Button } from "../components";
import { action } from '../constants';
var a;
class Map extends Component {
    constructor(props) {
        super(props);
        a = this;
        props.socket.on("locationcerrnet", function (data) {
            data = JSON.parse(data);
            console.log("map: ", data.region)
            a.setState({
                locationMykids: data.region,
                line: [...a.state.line, data.region]
            });
            // props.getlocationcurrent(data.region)
        })
        this.state = {
            locationMykids: null,
            line: [],
        }
    }
    render() {
        var { navigation, socket } = this.props;
        var { locationMykids, line } = this.state;
        return (
            <Block>
                <MapScreens navigation={navigation} 
                            socket={socket} 
                            locationMykids={locationMykids} 
                            getline={this.getline} 
                            onPoiClick={this.onPoiClick}>
                    {this.showLine(line, locationMykids)}
                </MapScreens>
            </Block>
        );
    }

    showLine = (Lines, lo) => {
        var resultline = null;
        var result = null;
        if (Lines.length > 0) {
            resultline = (
                <Polyline
                    coordinates={Lines}
                    // coordinates={this.state.line}

                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={6}
                />)

        }
        if (lo != null) {
            result = (
                <View>
               
                    <Marker coordinate={{
                        ...lo,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.03
                    }}>
                        <Icon name="map-marker-alt" size={30} color="#900" />
                    </Marker>
                    {resultline}
                </View>
            )
        }
        return result;
    }

    componentDidMount = async () => {
        let { locationcurrent} = this.props;
        // await getlocationcurrent(user.user.Kids,user.accessToken);
        // console.log("listdangerous: ",listdangerous)
        a.setState({
            locationMykids: locationcurrent[locationcurrent.length-1],
            // line: locationcurrent
        })
       
    }

    getline=async(history)=>{
        let { locationcurrent,user,getlocationcurrent} = this.props;
        if(history !=0){
            await getlocationcurrent(user.user.Kids,user.accessToken,history);
            a.setState({
                locationMykids: locationcurrent[locationcurrent.length-1],
                line: locationcurrent
            })
        }else{
            a.setState({
                locationMykids: locationcurrent[locationcurrent.length-1],
                line: []
            })
        }
    }

    onPoiClick = async (poi)=>{
        let {user,dangerous} = this.props;
        // let myloca = this.state.region;
        // let mypoi = poi.coordinate;
        // // console.log("myloca: ",myloca)
        // // console.log("mypoi: ",mypoi)
        // let re =geolib.isPointWithinRadius(
        //     myloca,
        //     mypoi,
        //     5000
        // );
        // console.log("re: ",re)

        // console.log("user",user.user._id)
        let a = await dangerous({poi,_id:user.user._id},user.accessToken)
        console.log("aaaa: ",a)
    }

}
const mapStatetoProps = (state) => {
    return {
        socket: state.socket,
        locationcurrent: state.locationcurrent,
        user :state.User,
        
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        getlocationcurrent: bindActionCreators(getlocationcurrentAPI, dispatch),
        dangerous: bindActionCreators(dangerousAPI, dispatch),
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Map);