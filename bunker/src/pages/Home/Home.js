// This page can be accessed by anyone including guests
// It contains commonComponent: Navigation bar and components: SearchFilterBar, ListingBase

import React, { Component } from "react";
import { compose } from "recompose";
// import { withAuthorization, withEmailVerification } from "../../server/Session";
// import { withFirebase } from "../../server/Firebase";
// import Logo from "./logo_transparent.png";
// import Map from "./gmapsf.jpg";
// import { withRouter, Switch, Route, Link } from "react-router-dom";
import SearchFilterBar from './components/SearchFilterBar';
import ListingBase from './components/ListingBase';

// const condition = authUser => !!authUser;


const HomePage = () => (
    <div>
        <SearchFilterBar />
        <div class="ui section divider" />
        <div class="ui segment">
            <div class="ui two column very relaxed grid">
                <div class="column">
                    <ListingBase />
                </div>
                <div class="column">
                    {/*<Image src={Map} />*/}
                </div>
            </div>
            <div class="ui vertical divider" />
        </div>
    </div>
);

// const INITIAL_STATE = {
//     email: "",
//     password: "",
//     error: null
// };


export default compose(
    // withFirebase,
    // withEmailVerification,
    // withAuthorization(condition)
)(HomePage);
