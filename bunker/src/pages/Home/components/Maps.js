import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import * as ROUTES from "../../../constants/routes";

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "ASK_GABRIEL_FROM_SALCK"
})(MapContainer);
