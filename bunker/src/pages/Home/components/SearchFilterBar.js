// This component contains the search bar with filters for users to narrow down their search based on date, guests, price, location, stars

import React, { Component } from "react";
import {
    Button,
    Grid,
    Select,
    Dropdown
} from "semantic-ui-react";

import * as moment from 'moment';

import {withFirebase} from '../../../server/Firebase/';
import { DatesRangeInput } from "semantic-ui-calendar-react";


const today=moment().format('MM-DD-YYYY');
const tomorrow=moment().add(1,'days').format('MM-DD-YYYY');


class SearchFilterBar extends Component {
    constructor(props) {
        super(props);
          this.state={

    }
}
    

    render() {

        return (
            <Grid centered>
                <Grid.Row/>
                <Grid.Row>
                    <Grid.Column width={3}>
                    <div>
                        Location:
                    </div>
                     <Dropdown search selection fluid 
                     name="searchLocation"
                     options={this.props.searchLocations} 
                     placeholder="City, Adress, Zip code..."
                     onSearchChange={this.props.handleLocation}
                     onLabelClick={this.props.handleLocation}
                     />
                     </Grid.Column>
                     <Grid.Column width={2}>
                         <div>
                             Check In/Out:
                         </div>
                         <DatesRangeInput 
                         name="datesRange"  
                         minDate={today} 
                         defaultValue={tomorrow}
                         dateFormat="MM-DD-YYYY" 
                         onChange={this.props.handleCheckInOut} 
                         value={this.props.datesRange} 
                         icon="bullhorn" 
                         iconPosition="left" 
                         placeholder="From - To"
                        />
                     </Grid.Column>
                     <Grid.Column width={2}>
                     <div>Room Type:</div>
                        <Select 
                        placeholder='' 
                        options={this.props.roomOptions} 
                        onChange={this.props.handleRoomType}
                        name="roomType"
                        />
                     </Grid.Column>
                     <Grid.Column>
                         <br></br>
                        <Button>
                            Search
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>    
            );
        }
    }

export default withFirebase(SearchFilterBar);
