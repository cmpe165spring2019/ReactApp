import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withAuthorization, withEmailVerification } from '../../server/Session';
import { withFirebase } from '../../server/Firebase';
import SearchFilterBar from './SearchFilterBar';
import ListingBase from './ListingBase';


const HomePage = () => (
  <div>
  <SearchFilterBar />
  <div class='ui segment'>
    <div class='ui two column very relaxed grid'>
      <div class='column'>
        <ListingBase />
      </div>
      <div class='column'>
        <p>map</p>
      </div>
    </div>
    <div class='ui vertical divider' />
</div>
</div>
);

const condition = authUser => !!authUser;

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};




export default compose(
  // withFirebase,
  // withEmailVerification,
  // withAuthorization(condition)
)(HomePage);
