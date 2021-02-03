import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: '98%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: '1%',
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
      markerLatitude: '',
      markerLongitude: '',
      title: '',
      description: '',
      mapType: 'standard',
    };
  }

  // componentDidMount() {
  //   console.log('title',this.state.title)
  // }

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

  onPressed(element) {
    element.persist()
    console.log('element.target',element.target._internalFiberInstanceHandleDEV.memoizedProps)
    console.log('element.target._internalFiberInstanceHandleDEV.memoizedProps.title',element.target._internalFiberInstanceHandleDEV.memoizedProps.title)
    console.log('element.target._internalFiberInstanceHandleDEV.memoizedProps.description',element.target._internalFiberInstanceHandleDEV.memoizedProps.description)
    this.setState({
      markerLatitude: element.nativeEvent.coordinate.latitude,
      markerLongitude: element.nativeEvent.coordinate.longitude,
      title: element.target._internalFiberInstanceHandleDEV.memoizedProps.title,
      description: element.target._internalFiberInstanceHandleDEV.memoizedProps.description,
    })
  }

  satellite() {
    this.setState({mapType: 'satellite'})
  }

  standard() {
    this.setState({mapType: 'standard'})
  }

  render() {
    return (
      <View style={styles.container}>

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styles.map, {flex: 0.8}]}
          region={this.state.region}
          onRegionChange={ () => this.onRegionChange() }
          showsBuildings={true}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsCompass={true}
          showsScale={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          mapType= {this.state.mapType}
          >
          
          <Marker draggable
            coordinate={{
              latitude: 24.8607,
              longitude: 67.0000,
            }}
            title= "'Marker 1'"
            description= 'description Marker 1'
            // image={require('./mapMarker.png')}
            pinColor= 'blue'
            onDragEnd={(ele)=> this.onDraggedEnd(ele) }
            onPress={(element)=> this.onPressed(element) }
          />
          <Marker draggable
            coordinate={{
              latitude: 24.8607,
              longitude: 67.0100,
            }}
            title= 'Marker 2'
            description= 'description Marker 2'
            // image={require('./mapMarker.png')}
            pinColor= 'blue'
            onDragEnd={(ele)=> this.onDraggedEnd(ele) }
            onPress={(element)=> this.onPressed(element) }
          />
          <Marker
            coordinate={{
              latitude: 24.8607,
              longitude: 67.0011,
            }}
            title= 'Marker 3'
            description= 'description Marker 3'
            // image={require('./mapMarker.png')}
            pinColor= 'blue'
            onDragEnd={(ele)=> this.onDraggedEnd(ele) }
            onPress={(element)=> this.onPressed(element) }
            tracksViewChanges={true}
          />

        </MapView>

        <View
          style={{
            flexDirection: 'row',
            paddingRight: '70%',
          }}
        >

          <View>
            <TouchableOpacity
              onPress={()=> this.satellite() }
            >
              <Image 
                style={{height: 50,width:50}}
                source={require('./satellite.png')} >

              </Image>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={()=> this.standard() }
            >
              <Image 
                style={{height: 50,width:50}}
                source={require('./standard.png')} >

              </Image>
            </TouchableOpacity>
          </View>

        </View>

        <View 
            style={{
              width: '100%',
              flex: 0.2,
              borderWidth: 2,
              borderColor: 'black',
              backgroundColor: 'white', 
              // alignItems: 'center', 
              marginHorizontal: 20,
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
          >

            <Text style={{fontWeight: 'bold', fontSize: 16}} >{!this.state.title ? "Marker" : this.state.title}</Text>
            <Text style={{fontSize: 14}} >{!this.state.description ? "Description" : this.state.description}</Text>
            <Text style={{fontSize: 14}} >{this.state.markerLatitude}</Text>
            <Text style={{fontSize: 14}} >{this.state.markerLongitude}</Text>

        </View>

       

      </View>
    );
  }
}

