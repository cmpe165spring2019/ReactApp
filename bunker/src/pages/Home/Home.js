import React, { Component } from "react";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../../server/Session";
import { withFirebase } from "../../server/Firebase";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Card,
  Divider
} from "semantic-ui-react";

const condition = authUser => !!authUser;

const HomePage = () => (
  <div>
    <h3 class="ui header">Header</h3>
    <div class="ui section divider" />
    <div class="ui segment">
      <div class="ui two column very relaxed grid">
        <div class="column">
          <ListingBase />
        </div>
        <div class="column">
          <p>map</p>
        </div>
      </div>
      <div class="ui vertical divider" />
    </div>
  </div>
);

class ListingBase extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="ui card">
          <div class="image">
            <img src="/images/avatar2/large/kristy.png" />
          </div>
          <div class="content">
            <a class="header">Master Bedroom SF</a>
            <div class="meta">
              <span class="date">$150 per night + $50 cleaning fee</span>
            </div>
            <div class="description">
              Walking distance from cal train and union square.
            </div>
          </div>

          <div class="extra">
            Rating:
            <div class="ui star rating" data-rating="2" />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
