import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./styles";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 21.0278;
const LONGITUDE = 105.8342;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            coordinate: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
            amount: 99,
        };
    }

    increment() {
        this.setState({ amount: this.state.amount + 1 });
    }

    decrement() {
        this.setState({ amount: this.state.amount - 1 });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.mapStyle}
                    initialRegion={this.state.region}
                    // customMapStyle={mapStyle}
                >
                    <Marker
                        draggable
                        coordinate={{
                            latitude: 21.0278,
                            longitude: 105.8342,
                        }}
                        onDragEnd={(e) => console.warn(JSON.stringify(e.nativeEvent.coordinate))}
                        title={'Hanoi'}
                        description={'Capital of Vietnam'}
                        pinColor="orange"
                    />
                    <Marker
                        draggable
                        coordinate={{
                            latitude: 20.998029,
                            longitude: 105.7924504,
                        }}
                        onDragEnd={(e) => console.warn(JSON.stringify(e.nativeEvent.coordinate))}
                        title={'Viwaseen'}
                        description={'Viwaseen building'}
                        pinColor="green"
                    />
                    <Marker
                        draggable
                        coordinate={{
                            latitude: 21.0051014,
                            longitude: 105.8434403,
                        }}
                        onDragEnd={(e) => console.warn(JSON.stringify(e.nativeEvent.coordinate))}
                        title={'HUST'}
                        description={'Hanoi University of Science and Technology'}
                    />
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.decrement()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={styles.amountButton}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.increment()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={styles.amountButton}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8ec3b9"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1a3646"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#64779e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#334e87"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6f9ba5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3C7680"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#304a7d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c6675"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#255763"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#b0d5ce"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3a4762"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0e1626"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4e6d70"
            }
        ]
    }
];

const CustomMarker = () => (
    <View
        style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: "#fff",
            borderColor: "#eee",
            borderRadius: 5,
            elevation: 10
        }}
    >
        <Text>Hanoi</Text>
    </View>
);

export default MapScreen;