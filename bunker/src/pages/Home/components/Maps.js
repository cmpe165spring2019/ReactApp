import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { Segment, Image, Button } from "semantic-ui-react";
// Backend functionalities
import { withFirebase } from "../../../server/Firebase/index";

import * as util from "util";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) => {
    // console.log("props: " + props);
    this.setState({
      currentHotel: props.currenthotel,
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    // console.log(
    //   "state after clicking marker: " + util.inspect(this.state.currentHotel)
    // );
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  onClick = () => {
    console.log("123");
  };

  //loop this marker
  render() {
    const { datesRange, roomType, roomQuantity } = this.props;
    // const hotel = this.state.currentHotel;
    const hotel = this.state.currentHotel;
    console.log("render current hotel: " + util.inspect(hotel));

    return (
      <div>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          initialCenter={{
            lat: 39.8283,
            lng: -98.5795
          }}
          zoom={3}
        >
          {this.props.hotels.map(hotel => {
            return (
              <Marker
                currenthotel={hotel}
                name={hotel.data.name}
                image={hotel.data.image[0]}
                link={`${ROUTES.HOTEL}/${hotel.id}`}
                onClick={this.onMarkerClick}
                position={{
                  lat: hotel.data.address.lat,
                  lng: hotel.data.address.long
                }}
              />
            );
          })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <Segment>
              <h3>{this.state.selectedPlace.name}</h3>
              <Image src={this.state.selectedPlace.image} />
            </Segment>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBEBj6JuJ5LgehsCQtT3cF2d3Qloo84KC0"
})(withRouter(MapContainer));
