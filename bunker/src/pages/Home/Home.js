// This page can be accessed by anyone including guests

import React, { Component } from "react";

//Components
import SearchFilterBar from "./components/SearchFilterBar";
import ListingBase from "./components/ListingBase";
import Maps from "./components/Maps";

// Backend functionalities
import { withFirebase } from "../../server/Firebase/index";

import Map from "../../images/maps_sf.jpg";

import { Card, Divider, Image } from "semantic-ui-react";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <SearchFilterBar />
        <div class="ui section divider" />
        <div class="ui segment">
          <div class="ui two column very relaxed grid">
            <div class="column">
              <ListingBase />
            </div>
            <div class="column">
              {/* insert Maps component here */}
              {/*<Image src={Map} /> */}
              <Maps />
            </div>
          </div>
          <div class="ui vertical divider" />
        </div>
      </div>
    );
  }
}

export default withFirebase(HomePage);
