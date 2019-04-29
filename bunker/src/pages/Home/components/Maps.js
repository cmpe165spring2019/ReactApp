import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { Segment, Image, Button } from "semantic-ui-react";
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

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
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
    return (
      <div>
        <Map google={this.props.google}
             onClick={this.onMapClicked}
             initialCenter={{
               lat: 40.854885,
               lng: -88.081807
             }}>
          {this.props.hotels.map(hotel => {
            return (
              <Marker
                hotel={hotel}
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
              {/*<a href={this.state.selectedPlace.link}>Hotel</a>*/}
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
