import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 24.8607,
        longitude: 67.0011,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      marker: [],
    };
  }

  onRegionChange(region) {
    this.setState({
      region,
    });
  }

  onDraggedEnd = (ele) => {
    console.log('ele',ele.nativeEvent.coordinate)
    this.setState({
      marker: ele.nativeEvent.coordinate
    })
  }

  render() {
    console.log('this.state.marker',this.state.marker)
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={this.state.region}
          onRegionChange={ () => this.onRegionChange() }
          showsBuildings={true}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
          showsCompass={true}
          showsScale={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          >
          <Marker draggable
            coordinate={{
              latitude: 24.8607,
              longitude: 67.0000,
            }}
            title= 'Marker 1'
            description= 'description Marker 1'
            image={require('./mapMarker.png')}
            onDragEnd={(ele)=> this.onDraggedEnd(ele) }
          />
          <Marker draggable
            coordinate={{
              latitude: 24.8607,
              longitude: 67.0100,
            }}
            title= 'Marker 2'
            description= 'description Marker 2'
            image={require('./mapMarker.png')}
            onDragEnd={(ele)=> this.onDraggedEnd(ele) }
          />
          <Marker draggable
            coordinate={{
              latitude: 24.8607,
              longitude: 67.0011,
            }}
            title= 'Marker 3'
            description= 'description Marker 3'
            image={require('./mapMarker.png')}
            onDragEnd={(ele)=> this.onDraggedEnd(ele) }
          />
        </MapView>
      </View>
    );
  }
}

