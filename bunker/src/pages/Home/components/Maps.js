import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import * as ROUTES from "../../../constants/routes";

// Backend functionalities
import { withFirebase } from "../../../server/Firebase/index";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  //loop this marker
  render() {
    return (
      <Map google={this.props.google} onClick={this.onMapClicked}>
        <Marker
          onClick={this.onMarkerClick}
          name={"San Francisco"}
          position={{ lat: 37.759703, lng: -122.428093 }}
        />

        {this.props.hotels.map(hotel => {})}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBEBj6JuJ5LgehsCQtT3cF2d3Qloo84KC0"
})(MapContainer);
