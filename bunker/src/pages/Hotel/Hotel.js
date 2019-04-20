import React, { Component } from 'react';

// Components
import { withFirebase } from '../../server/Firebase';
import {
    Grid,
    Button,
    Container,
    Header,
    Segment,
    Divider,
    Rating
} from 'semantic-ui-react';
import CheckOut from './CheckOut/CheckOut';

// import Carousel from 'react-bootstrap/Carousel';
// import { Carousel } from 'react-responsive-carousel';

import * as moment from 'moment';


//Debugging purposes
import * as util from 'util' // has no default export
import CheckInOutCalendar from '../../commonComponents/CheckInOutCalendar';
import RoomTypeSelect from "../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from '../../commonComponents/Navigation/RoomQuantitySelect';


class HotelPage extends Component {

    constructor(props) {
        super (props);
        this.state = {
            ...props.location.state,
            checkInDate: '',
            checkOutDate: '',
            reservation: {
                start_date: 0,
                end_date: 0,
                hotel_id: '',
                roomQuantity: 0,
                room_types: '',
            }
        }
    }

    componentDidMount(){
        //parse dates into check in and out
        this.parseDatesRange(this.state.datesRange);
        this.calculatePricePerNight();
    }

    componentDidUpdate (prevProps, prevState) {
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
                reservation: {
                    ...this.state.reservation,
                    start_date: checkInDate.getTime(),
                    end_date: checkOutDate.getTime()
                }
            });

    }
}

    handleCheckInOut=(event,{name,value})=>{
        //set datesRange whenever calendar range is updated
            if(this.state.hasOwnProperty(name)){
                this.setState({[name]:value},
                    ()=>{
                        //parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
                        this.parseDatesRange(value);
                    });
            }
    }

    handleRoomTypeQuantity=(e, {name, value})=>{
        this.setState({
            [name]: value
        },
        () => {
            this.calculatePricePerNight();
        });
    }

    calculatePricePerNight () {
        const { room_types } = this.state.hotel.data;
        const { roomQuantity } = this.state;
        console.log('room_types: ' + util.inspect(room_types));
        const roomTypeData = room_types.filter(roomType=> roomType.type === this.state.roomType);
        const roomPrice = roomTypeData[0].price;

        const pricePerNight = roomPrice*roomQuantity;
        console.log(pricePerNight);

        this.setState({
            hotel : {
                ...this.state.hotel,
                data: {
                    ...this.state.hotel.data,
                    currentRoomPrice: roomPrice
                }
            },
            pricePerNight: pricePerNight
        })
    }

    calculateTotalPrice () {
        const { pricePerNight, checkInDate, checkOutDate } = this.state;
        let a = moment(checkInDate);
        let b = moment(checkOutDate);
        let totalDays = b.diff(a, 'days');
        let totalPrice = totalDays * pricePerNight;
        console.log(totalPrice);
    }

    render () {
        const { name, address, details, image, rating, room_types } = this.state.hotel.data;
        const { reservation, hotel, datesRange, roomType, roomQuantity, pricePerNight } = this.state;
        console.log('roomQuantity: ' + roomQuantity);

        return (
            <Grid centered celled columns={2}>
                <Grid.Row>
                    insert carousel
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
                        <Container textAlign='center'>
                            <Header as='h3'>
                            ${pricePerNight} / night
                            </Header>
                            <Rating disabled icon='star' defaultRating={rating} maxRating={5} />
                            <br></br>
                           <Divider/>
                           <br></br>
                            <p>
                            Check In/Out Date:
                            <CheckInOutCalendar
                            onChange={this.handleCheckInOut.bind(this)}
                            value={this.state.datesRange}
                            />
                            </p>
                            <p>
                            Room Type/Quantity:
                            <br></br>
                            <RoomTypeSelect
                                onChange={this.handleRoomTypeQuantity.bind(this)}
                                defaultValue={roomType}
                            />
                            <RoomQuantitySelect
                                onChange={this.handleRoomTypeQuantity.bind(this)}
                                defaultValue={roomQuantity}
                            />
                           </p>
                           <br></br>
                           <Divider/>
                           <br></br>
                            <CheckOut
                            hotel = {hotel}
                            reservation = {reservation}
                            />
                        </Container>
                    </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>

        )
    }
}

export default HotelPage;
