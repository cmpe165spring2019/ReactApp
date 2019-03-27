// This page can be accessed by anyone including guests

import React, { Component } from "react";

//Components
import SearchFilterBar from './components/SearchFilterBar';
import ListingBase from './components/ListingBase';

// Backend functionalities
import { withFirebase } from '../../server/Firebase/index';

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
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
                        </div>
                    </div>
                    <div class="ui vertical divider" />
                </div>
            </div>
        );
    }
}


export default withFirebase(HomePage)
