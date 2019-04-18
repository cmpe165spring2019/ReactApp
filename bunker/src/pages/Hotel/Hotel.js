import React, { Component } from 'react';

// Components
import Carousel from 'nuka-carousel'
import { withFirebase } from '../../server/Firebase';
import {
    Grid,
    Button,
    Container,
    Header,
    Segment
} from 'semantic-ui-react';


//Debugging purposes
import * as util from 'util' // has no default export
import CheckInOutCalendar from '../../commonComponents/CheckInOutCalendar';

class HotelPage extends Component {

    constructor(props) {
        super (props);
        this.state = {
            ...props.location.state,

        }
    }

    componentDidMount(){
        //parse dates into check in and out
        this.parseDatesRange(this.state.datesRange);
    }

    componentDidUpdate () {
        console.log(util.inspect(this.state));
    }

    parseDatesRange = (datesRange) => {
        if(datesRange.length > 13){
            let parsedValue = datesRange.split(" ");
            let checkInString = parsedValue[0];
            let checkOutString = parsedValue[2];
            let checkInArray = checkInString.split("-");
            let checkOutArray = checkOutString.split("-");
            let checkInDate = new Date(
                parseInt(checkInArray[2]),
                parseInt(checkInArray[0]-1),
                parseInt(checkInArray[1])
            );
            let checkOutDate = new Date(
                parseInt(checkOutArray[2]),
                parseInt(checkOutArray[0]-1),
                parseInt(checkOutArray[1])
            );
            this.setState({
                ...this.state,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
            });

    }
}

    handleCheckInOut=(event,{name,value})=>{
        //set datesRange whenever calendar range is updated
            if(this.state.hasOwnProperty(name)){
                this.setState({[name]:value});
            }
        
        //parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
        this.parseDatesRange(value);    
    }
          

    render () {
        return (
            <Grid centered celled columns={2}>
                <Grid.Row>
                    insert carousel here
                    Images
                </Grid.Row>
                <Grid.Row width={13} centered columns={3}>
                    <Grid.Column width={10}>
                    <Segment textAlign='left' padded='very'>
                        <Container textAlign='left'>
                            <Header as='h2'>
                            Name
                            </Header>
                        </Container>
                        insert hotel details here
                        Address
                        Details
                        Rating

                    </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Segment padded='very'>
                    insert booking details here
                        Price per night
                        Check In/Out Date:
                        <CheckInOutCalendar
            onChange={this.handleCheckInOut.bind(this)}
            value={this.state.datesRange}
            />
                        RoomType:
                        RoomQuantity:
                        RoomPrice:
                        <Button>
                            Book
                        </Button>

                    </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>

        )
    }
}

export default HotelPage;