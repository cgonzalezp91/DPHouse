/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps'

const { width, height } = Dimensions.get("window");
// type Props = {};
export default class App extends Component {
  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
  }
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }
  
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  // constructor(){
  //   super()
  //   this.state= {
  //     region: {
  //       latitude: null,
  //       longitude: null,
  //       latitudeDelta: null,
  //       longitudeDelta: null
  //     }
  //   }
  // }

  // calcDelta(lat,lon,accuracy){
  //   const oneDegreeOfLongitudInMeters = 111.32;
  //   const cirumference= (40075/360)

  //   const latDelta = accuracy * (1 / (Math.cos(lat)* cirumference))
  //   const lonDelta = (accuracy / oneDegreeOfLongitudInMeters)

  //   this.setState({
  //     region: {
  //       latitude: lat,
  //       longitude: lon,
  //       latitudeDelta: latDelta,
  //       lonDelta: lonDelta,
  //     }
  //   })
  // }
  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const lat = position.coords.latitude
  //       const lon = position.coords.longitude
  //       const accuracy = position.coords.accuracy
  //       this.calcDelta(lat,lon,accuracy)
  //       console.warn(lat,lon,accuracy)
  //     }
  //   )
  // }
  render() {
    return (
      <View style={styles.container}>
      <MapView
      initialRegion={{
              latitude: 27.4779,
              longitude: -99.51789,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        style={styles.map}
        region={this.state.mapRegion}
         showsUserLocation={true}>
        {/* // followUserLocation={true}
        //onRegionChange={this.onRegionChange.bind(this)}> */}
        <MapView.Marker
            coordinate={{
              latitude: 27.46971092704161,
              longitude: -99.51994429591286
            }}
            title="Home"
            description="Descripcion Basica">
            <View style={styles.iconContainer}>
              <Icon name="ios-home" size={30} color="orange" />
            </View>
            <MapView.Callout tooltip style={styles.customView}>
             
                 <View style={styles.marker}>
                  {/* <Text>{marker.title}{"\n"}{marker.description}</Text> */}
                 </View>

             </MapView.Callout>
          </MapView.Marker>
      </MapView>
    </View>
      // <View style={styles.container}>
      //   <MapView style={styles.map}
      //     initialRegion={{
      //       latitude: 27.4779,
      //       longitude: -99.51789,
      //       latitudeDelta: 0.0922,
      //       longitudeDelta: 0.0421,
      //     }} >
      //     <MapView.Marker
      //       coordinate={{
      //         latitude: 27.46971092704161,
      //         longitude: -99.51994429591286
      //       }}
      //       title="Home"
      //       description="Descripcion Basica">
      //       <View style={styles.iconContainer}>
      //         <Icon name="ios-home" size={30} color="orange" />
      //       </View>
      //       <MapView.Callout tooltip style={styles.customView}>
      //         <TouchableHighlight onPress={() => this.markerClick()} underlayColor='#dddddd'>
      //           <View style={styles.calloutText}>
      //             <Text>{marker.title}{"\n"}{marker.description}</Text>
      //           </View>
      //         </TouchableHighlight>
      //       </MapView.Callout>
      //     </MapView.Marker>
      //   </MapView>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: width,
    height:height
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // position: 'absolute',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  marker: {
    backgroundColor: 'black',
  }
});
