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

    calculatePrice () {
        const room_types = this.state.hotel.data;
        const roomTypeData = room_types.filter(roomType=> roomType.type === this.state.roomType);
        const roomPrice = roomTypeData[0].price;
        this.setState({
            currentRoomPrice: roomPrice
        })
    }
          

    render () {
        const { name, address, details, image, rating, room_types } = this.state.hotel.data;
        const { datesRange, roomType, roomQuantity } = this.state;

        console.log(util.inspect(address));
        return (
            <Grid centered celled columns={2}>
                <Grid.Row>
                    insert carousel here
                    Images
                </Grid.Row>
                <Grid.Row width={13} centered columns={3}>
                    <Grid.Column width={8}>
                    <Segment textAlign='left' padded='very'>
                        <Container textAlign='left'>
                            <Header as='h2'>
                            {name}
                            </Header>
                            <p>
                                {address.street}
                                <br></br>
                                {address.city}, {address.state} {address.country}
                            </p>
                            <p>
                                {details}
                            </p>
                        </Container>
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