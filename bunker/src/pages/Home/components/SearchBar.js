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
import CheckInOutCalendar from '../../../commonComponents/CheckInOutCalendar';
import RoomTypeSelect from "../../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from "../../../commonComponents/Navigation/RoomQuantitySelect";

import * as util from 'util' // has no default export


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }



    render() {
        console.log('this.props.defaultRoomQuantity : '  + util.inspect(this.props.defaultRoomQuantity));
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
                        <CheckInOutCalendar
                            onChange={this.props.handleCheckInOut}
                            value={this.props.datesRange}
                        />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div>Room Type:</div>
                        <RoomTypeSelect
                        onChange={this.props.handleRoomTypeQuantity}
                        defaultValue={this.props.defaultRoomType}
                        />
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <div>Quantity:</div>
                        <RoomQuantitySelect
                        onChange={this.props.handleRoomTypeQuantity}
                        defaultValue={this.props.defaultRoomQuantity}
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
