// This component contains the search bar with filters for users to narrow down their search based on date, guests, price, location, stars
import * as ROUTES from "../../../constants/routes";
import {Link} from "react-router-dom";
import React, { Component } from "react";
import {
    Button,
    Grid,
    Menu,
    Input,
    Dropdown,
    Segment,
    Image,
    Icon,
    Container
} from "semantic-ui-react";
import BunkerImage from '../../../images/bunker.png';


import * as moment from 'moment';

import {withFirebase} from '../../../server/Firebase';
import CheckInOutCalendar from '../../../commonComponents/CheckInOutCalendar';
import RoomTypeSelect from "../../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from '../../../commonComponents/RoomQuantitySelect';

import * as util from 'util' // has no default export


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }



    render() {
        return (
<Grid>
    <Grid.Row>
        <p></p>

    <Menu compact style={{position: "relative", left: "4%"}} secondary>
<Menu.Item>
<Link to={ROUTES.LANDING}>
<Image src={BunkerImage} circular wrapped size="small" centered></Image>
</Link>

</Menu.Item>
<Menu.Item>
    <Container fluid>
    
    <div>
                Location:
            </div>
    <Dropdown
        search selection
                    name='location'
                    options={this.props.locationOptions}
                    placeholder="City, Adress, Zip code..."
                    onChange={this.props.handleLocation}
                    onSearchChange={this.props.handleLocation}
                    onLabelClick={this.props.handleLocation}
                    value={this.props.defaultLocation}
                    // defaultValue={{id: this.props.defaultLocationValue.id}}
            />

    </Container>


</Menu.Item>
<Menu.Item>
    <Container fluid>
    Check In/Out:

<CheckInOutCalendar
onChange={this.props.handleCheckInOut}
value={this.props.datesRange}
/>
    </Container>

</Menu.Item>
<Menu.Item>
<Container fluid>
<div>Room Type/Quantity:</div>
        <RoomTypeSelect
        onChange={this.props.handleRoomTypeQuantity}
        defaultValue={this.props.defaultRoomType}
        />
        <RoomQuantitySelect
        onChange={this.props.handleRoomTypeQuantity}
        defaultValue={this.props.defaultRoomQuantity}
        />
</Container>

</Menu.Item>
<Menu.Item>
    <Container>
    <br></br>
<Button
primary
icon
            onClick={this.props.handleSearch}
            labelPosition='left'
        >

                 Search
                 <Icon name='search' />
        </Button>
    </Container>

</Menu.Item>
</Menu>
    </Grid.Row>
</Grid>



        );
    }
}

export default withFirebase(SearchBar);
