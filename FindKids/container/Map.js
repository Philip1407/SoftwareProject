import React, { Component } from 'react';
import MapScreens from '../screens/Map'
import { Block } from "../components";
import { connect } from 'react-redux'
import {View} from 'react-native';
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { bindActionCreators } from 'redux';
import {getlocationcurrent} from '../action'
import { action } from '../constants';
var a;
class Map extends Component {
    constructor(props) {
        super(props);
        a= this;
        props.socket.on("locationcerrnet", function (data) {
            data = JSON.parse(data);
            console.log("map: ",data.region)
            a.setState({
                locationMykids: data.region,
                line: [...a.state.line, data.region]
            });
            // props.getlocationcurrent(data.region)
        })
        this.state = {
            locationMykids: null,
            line:[],
        }
    }
    render() {
        var { navigation, socket , locationcurrent} = this.props;
        var {locationMykids,line} = this.state;
        return (
            <Block>
                <MapScreens navigation={navigation} socket={socket} locationMykids={locationMykids} >
                    {this.showLine(line,locationMykids)}
                </MapScreens>
            </Block>
        );
    }

    showLine = (Lines,lo) => {
        var resultline=null;
        var result =null;
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
        if(lo!=null){
            result =(
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

    // componentDidMount = async () => {
    //     let { socket, getlocationcurrent} = this.props;
    //     await socket.on("locationcerrnet", function (data) {
    //         data = JSON.parse(data);
    //         console.log("map: ",data.region)
    //         a.setState({
    //             locationMykids: data.region,
    //         });
    //         getlocationcurrent(data.region)
    //     })
    // }

    // componentWillUpdate = async()=>{
    //     let { socket, getlocationcurrent} = this.props;
    //     await socket.on("locationcerrnet", function (data) {
    //         data = JSON.parse(data);
    //         console.log("map: ",data.region)
    //         a.setState({
    //             locationMykids: data.region,
    //         });
    //         getlocationcurrent(data.region)
    //     })
    // }
}
const mapStatetoProps = (state) => {
    return {
        socket: state.socket,
        locationcurrent: state.locationcurrent,
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        getlocationcurrent:bindActionCreators(getlocationcurrent, dispatch),
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Map);