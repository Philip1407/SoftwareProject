import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import isEqual from 'lodash/isEqual';
import * as theme from "../constants/theme";
class Map extends Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            myPosition: null,
        };
    }

    componentDidMount() {
        if (this.props.coordinate) {
            return;
        }
        this.watchLocation();

    }
    componentWillUnmount() {
        this.mounted = false;
        if (this.watchID) {
            navigator.geolocation.clearWatch(this.watchID);
        }
    }

    watchLocation() {
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const myLastPosition = this.state.myPosition;
                const myPosition = position.coords;
                if (!isEqual(myPosition, myLastPosition)) {
                    this.setState({ myPosition });
                }
            },
            null,
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 });
    }
    render() {
        let { coordinate } = this.props;
        if (!coordinate) {
            const { myPosition } = this.state;
            if (!myPosition) {
                return null;
            }
            coordinate = myPosition;
        }

        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={{
                        latitude: 16.78825,
                        longitude: 107.4324,
                        latitudeDelta: 10,
                        longitudeDelta: 10,
                    }}
                    style={styles.map}>
                    <Marker
                        coordinate={coordinate}
                    >

                    </Marker>
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
    }
})

