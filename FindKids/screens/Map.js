import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import MapView, { Marker, Callout, Polyline } from "react-native-maps";
import isEqual from 'lodash/isEqual';
import * as theme from "../constants/theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Permissions from 'expo-permissions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var a;
class Map extends Component {
    constructor(props) {
        super(props);
        a=this;
        this.mounted = false;
        this.state = {
            myPosition: null,
            region: {
                latitude: null,
                longitude: null
            },
            poi: null,
            // locationMykids: {
            //     latitude: 10.862035448000977,
            //     longitude: 106.74766380339861,
            // },
            // line :[{latitude: 10.862035448000977,
            //     longitude: 106.74766380339861}]
        };
        // this.onPoiClick = this.onPoiClick.bind(this);
    }
    onPoiClick = (e) => {
        const poi = e.nativeEvent;
        this.setState({
            poi,
        });
    }
    // onPress=(e)=>{
    //     const temp = e.nativeEvent;
    //     this.setState({
    //         locationMykids:{
    //             ...temp.coordinate
    //         }
    //     })
    // }
    componentDidMount=()=> {
        if (this.props.coordinate) {
            return;
        }
        this.watchLocation();
        this._askForPermissions();
        // this.props.socket.on("locationcerrnet",function(data){
        //     console.log("abc")
        //     data= JSON.parse(data);
        //     a.setState({locationMykids:data.region,});
        // })
    }
    componentWillUnmount=()=> {
        this.mounted = false;
        if (this.watchID) {
            navigator.geolocation.clearWatch(this.watchID);
        }
    }    

    _askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.LOCATION);
      };
    watchLocation= async ()=> { // get current location
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const myLastPosition = this.state.myPosition;
                const myPosition = position.coords;
                if (!isEqual(myPosition, myLastPosition)) {
                    this.setState({
                        myPosition: myPosition,
                        region: {
                            latitude: myPosition.latitude,
                            longitude: myPosition.longitude
                        }
                    });

                    console.log("region: ",this.state.region)
                }
            },
            null,
            // { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }); return về mỗi khi thay đổi 100m
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 });//return về mỗi khi thay đổi 1m
    }
    render() {
        let { coordinate , locationMykids} = this.props;
        if (!coordinate) {
            const { myPosition } = this.state;
            if (!myPosition) {
                return null;
            }
            coordinate = myPosition;
        }

        console.log("locationMykids",locationMykids)
        return (
            <View style={styles.container}>
                <MapView
                    onPoiClick={this.onPoiClick} //lay dia chi khi nhap vao vi tri marker ban do
                    // onPress={this.onPress} lay dia chi khi nhap vao vi tri bat ky ban do
                    style={styles.map}
                    initialRegion={{
                        ...this.state.region,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }}
                    // followsUserLocation={true}
                    showsUserLocation={true} >
                     {this.props.children}
                </MapView>
            </View>
        );
    }
}
export default Map;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white
    },
    map: {
        flex: 3
    },
    myMarker: {
        zIndex: 2,
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(51, 83, 251, 0.2)"
    },
    myMarkerDot: {
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: "#3353FB"
    }
})

