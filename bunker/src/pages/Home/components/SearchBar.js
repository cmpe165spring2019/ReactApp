// This component contains the search bar with filters for users to narrow down their search based on date, guests, price, location, stars

import React, { Component } from "react";
import {
    Button,
    Grid,
    Select,
    Dropdown
} from "semantic-ui-react";

import * as moment from 'moment';

import {withFirebase} from '../../../server/Firebase';
import { DatesRangeInput } from "semantic-ui-calendar-react";


const today=moment().format('MM-DD-YYYY');
const tomorrow=moment().add(1,'days').format('MM-DD-YYYY');
const aWeekFromToday = moment().add(5, 'days').format('MM-DD-YYYY');
const defaultDateRangeArray = [today, aWeekFromToday];
const defaultDateRange = defaultDateRangeArray.join(" - ");


class SearchBar extends Component {
    constructor(props) {
        super(props);
          this.state={

    }
}
    

    render() {

        console.log("default date range : " + defaultDateRange);

        return (
            <Grid centered>
                <Grid.Row/>
                <Grid.Row centered>
                    <Grid.Column width={3}>
                    <div>
                        Location:
                    </div>
                     <Dropdown search selection fluid 
                     name="location"
                     options={this.props.locationOptions} 
                     placeholder="City, Adress, Zip code..."
                     onChange={this.props.handleLocation}
                     onSearchChange={this.props.handleLocation}
                     onLabelClick={this.props.handleLocation}
                     />
                     </Grid.Column>
                     <Grid.Column width={3}>
                         <div>
                             Check In/Out:
                         </div>
                         <DatesRangeInput 
                         name="datesRange"  
                         minDate={today}
                         initialDate={defaultDateRange}
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
                        name="roomType"                        
                        placeholder='' 
                        options={this.props.roomOptions} 
                        onChange={this.props.handleRoomType}
                        defaultValue={this.props.defaultRoomType}
                        />
                     </Grid.Column>
                     <Grid.Column width={1}>
                     <div>Quantity:</div>
                        <Dropdown
                        compact
                        selection 
                        name="roomQuantity"                        
                        placeholder='' 
                        options={this.props.roomQuantityOptions} 
                        onChange={this.props.handleRoomType}
                        defaultValue={1}
                        />
                     </Grid.Column>
                     <Grid.Column width={1}>
                         <br></br>
                        <Button
                        onClick={this.props.handleSearch}
                        >
                            Search
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>    
            );
        }
    }

export default withFirebase(SearchBar);
