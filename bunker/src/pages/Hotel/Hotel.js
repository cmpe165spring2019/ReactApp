import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import{DateInput}from 'semantic-ui-calendar-react';
import Carousel from 'nuka-carousel'
import { DatesRangeInput } from "semantic-ui-calendar-react";
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../server/Session';
import { withFirebase } from '../../server/Firebase';
import * as ROUTES from "../../constants/routes";
import {
    Image,
    Button,
    Table,
    Grid,
    Input,
} from 'semantic-ui-react';
import * as moment from "moment";


const today = moment().format("MM-DD-YYYY");
const tommorrow = moment()
    .add(1, "days")
    .format("MM-DD-YYYY");

class HotelPage extends React.Component {
    constructor(props) {
        super(props);
        this.makeReservation = this.makeReservation.bind(this);
        this.state = {
            ...props.location.state,
            reservations:[],
            maxCheckIn: "",
            minCheckout: tommorrow,
            reservation: {
                // totalPrice: 0,
                // room_types: [{
                //     type: 'single',
                //     numb: 3,
                //     price: 100,
                // },
                //     {
                //         type: 'double',
                //         numb: 2,
                //         price: 200,
                //     },
                //     {
                //         type: 'L',
                //         numb: 0,
                //         price: 300,
                //     }],
                price: 0,
                user_id: '',
                hotel_id: '',
                room_id:'',
                room_type: '',
                start_date: 0,
                end_date: 0,
            }
        }
    }

    componentDidMount() {
        const {rooms} = this.props;
        // const totalPrice = this.state.reservation.room_types.reduce((result, room) => result + (room.price*room.numb), 0);
        const user_id = JSON.parse(localStorage.getItem('authUser')).uid;

        const datesRange = this.state.datesRange;
        let parts = datesRange.split("-");
        let startDate = new Date(
            parseInt(parts[2]),
            parseInt(parts[0] - 1),
            parseInt(parts[1])
        );
        let endDate = new Date(
            parseInt(parts[5]),
            parseInt(parts[3] - 1),
            parseInt(parts[4]));

            console.log('this is reservations');



        this.setState({
            reservation : {
                hotel_id: this.state.hotel.id,
                // totalPrice: totalPrice,
                price:20,
                rooms_id:77,
                start_date: startDate.getTime(),
                end_date: endDate.getTime(),
                room_type: 'single',
                // room_types: this.state.reservation.room_types,
                user_id: user_id,

            }
        })

    }

    handleCheckInDate = (event, { name, value }) => {
        const {hotel_id, room_ids} = this.state.reservation;
        let parts = value.split("-");
        let dt = new Date(
            parseInt(parts[2]),
            parseInt(parts[0] - 1),
            parseInt(parts[1])
        );
        //if(value.length>=10 && dt<new Date()){
        //  window.alert("The Earliest CheckInDate is today, please choose from calendar")
        //  }
        //  else{
        // if(this.props.firebase.isDateAvailable(hotel_id,room_ids,dt)){
            let date = moment(dt)
                .add(1, "days")
                .format("MM-DD-YYYY");

            console.log(date);
            //let date1=moment(dt2).add(120,'days').format('MM-DD-YYYY');
            if (this.state.hasOwnProperty(name)) {
                console.log("good1");
                this.setState({ [name]: value, minCheckout: date });
            }
        // }
        // else{
            alert("That date is not available");
        // }

        //}
    };

    handleCheckOutDate = (event, { name, value }) => {
        const {hotel_id, room_ids} = this.state.reservation;
        let parts = value.split("-");
        let dt = new Date(
            parseInt(parts[2]),
            parseInt(parts[0] - 1),
            parseInt(parts[1])
        );
        //if(value.length>=10 && dt<new Date()){
        //  window.alert("The Earliest CheckInDate is today, please choose from calendar")
        //  }
        //  else{
        // if(this.props.firebase.isDateAvailable(hotel_id,room_ids,dt)){

            let date = moment(dt)
                .subtract(1, "days")
                .format("MM-DD-YYYY");

            console.log(date);
            //let date1=moment(dt2).add(120,'days').format('MM-DD-YYYY');
            if (this.state.hasOwnProperty(name)) {
                console.log("good1");
                this.setState({ [name]: value, minCheckout: date });
            }
        // }
        // else{
            alert("That date is not available");
        // }
    };
    makeReservation = ()=>{
        alert('hello');
        // const {reservation} = this.state.reservation;
        //console.log(reservation);
        this.props.firebase.addReservationToDB(this.state.reservation.user_id,this.state.reservation);
        alert('hello123');

    };
    cancelReservation = ()=>{
        alert('hello');
        // const {reservation} = this.state.reservation;
        //console.log(reservation);
        const id = this.state.reservations[0];
        this.props.firebase.deleteReservationFromDB("zlmBw64OxJUTgp0nxnyo",this.state.reservation.user_id);
        alert('delete');

    };

    getRes=()=>{


      const user = JSON.parse(localStorage.getItem('authUser'));
    //  let reservations= [];

      console.log(user);
      this.props.firebase.getReservations(user.reservations).then(res=>{
        this.setState({
          reservations: res,
        });

      })  }

    render() {
        const image0 = this.state.hotel.data.image[0];
        const image1 = this.state.hotel.data.image[1];
        const image2 = this.state.hotel.data.image[2];
        const image3 = this.state.hotel.data.image[3];
        const image4 = this.state.hotel.data.image[4];
        const image5 = this.state.hotel.data.image[5];
        const address = this.state.hotel.data.address;
        return (


            <Grid>
                <Grid.Row centered>
                    <Grid.Row><h1>Click "Me" for Pictures</h1></Grid.Row>
                    <Carousel
                        cellAlign="center"
                        slideWidth={0.9}
                        slideHeight={0.2}
                        dragging={true}
                        speed={5}
                        easing="easeInOutElastic"
                    >

                        <Image src={image0} />
                        <Image src={image1} />
                        <Image src={image2} />
                        <Image src={image3} />
                        <Image src={image4} />
                        <Image src={image5} />
                    </Carousel>
                </Grid.Row>

                <Grid.Row columns={3}>
                    <Grid.Column rows={4}>
                        <Grid.Row>
                            <h1>{this.state.hotel.data.name}</h1>
                        </Grid.Row>
                        <Grid.Row>
                            <h3 >Address: {this.state.hotel.data.address.street.toString()} {this.state.hotel.data.address.state.toString()} </h3>

                        </Grid.Row>

                        <Grid.Row>
                            <h2 >${this.state.hotel.data.currentRoomPrice}/Night</h2>
                        </Grid.Row>
                        <Grid.Row>
                            <h5 >{this.state.hotel.data.details}</h5>
                        </Grid.Row>
                    </Grid.Column>

                    <Grid.Column rows={4}>
                        <Grid.Row>
                            <h4>CheckInDate</h4>
                        </Grid.Row>

                        <Grid.Row>
                            <DatesRangeInput
                                name="datesRange"
                                minDate={today}
                                initialDate={this.state.datesRange}
                                dateFormat="MM-DD-YYYY"
                                onChange={this.props.handleCheckInOut}
                                value={this.props.datesRange}
                                icon="bullhorn"
                                iconPosition="left"
                                placeholder="From - To"
                            />
                        </Grid.Row>


                        {/*<Grid.Row>*/}
                            {/*<h4>CheckOutDate</h4>*/}
                            {/*<DateInput*/}
                                {/*name="dateOut"*/}
                                {/*minDate={this.state.minCheckout}*/}
                                {/*dateFormat="MM-DD-YYYY"*/}
                                {/*onChange={this.handleCheckOutDate}*/}
                                {/*value={this.state.dateOut}*/}
                                {/*icon="paper plane"*/}
                                {/*iconPosition="left"*/}
                                {/*placeholder="MM-DD-YYYY"*/}
                            {/*/>*/}
                        {/*</Grid.Row>*/}

                        <Grid.Row>
                            <h3>Book Now</h3>
                            <Button color="green" size="small" width="70px">Book</Button>
                        </Grid.Row>
                    </Grid.Column>


                    <Grid.Column>

                        <Image src="https://beta.techcrunch.com/wp-content/uploads/2013/05/sf-search-results.png"/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>RoomType</Table.HeaderCell>
                                <Table.HeaderCell>Number of Room</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Total price</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>One bed Room</Table.Cell>
                                {/*<Table.Cell>{this.state.reservation.rooms[0].numb}</Table.Cell>*/}
                                {/*<Table.Cell><Input defaultValue={this.state.reservation.room_types[0].numb} /></Table.Cell>*/}
                                {/*<Table.Cell>${this.state.reservation.room_types[0].price}/Night</Table.Cell>*/}
                                {/*<Table.Cell>${this.state.reservation.room_types[0].price * this.state.reservation.room_types[0].numb}</Table.Cell>*/}
                                {/*<Table.Cell><Button color="green" size="small" >Book</Button></Table.Cell>*/}
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>Two bed Room</Table.Cell>
                                {/*<Table.Cell><Input defaultValue={this.state.reservation.room_types[1].numb} /></Table.Cell>*/}
                                {/*<Table.Cell>{this.state.reservation.rooms[1].numb}</Table.Cell>*/}
                                {/*<Table.Cell>${this.state.reservation.room_types[1].price}/Night</Table.Cell>*/}
                                {/*<Table.Cell>${this.state.reservation.room_types[1].price * this.state.reservation.room_types[1].numb}</Table.Cell>*/}
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>Luxury Room</Table.Cell>
                                {/*<Table.Cell><Input defaultValue={this.state.reservation.room_types[2].numb} /></Table.Cell>*/}
                                {/*<Table.Cell>{this.state.reservation.rooms[2].numb}</Table.Cell>*/}
                                {/*<Table.Cell>${this.state.reservation.room_types[2].price}/Night</Table.Cell>*/}
                                {/*<Table.Cell>${this.state.reservation.room_types[2].price * this.state.reservation.room_types[2].numb}</Table.Cell>*/}
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column width={13}>

                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Grid.Row>
                            Total Price : {this.state.reservation.totalPrice}
                        </Grid.Row>
                        <Grid.Row>
                            <Button primary onClick={()=> this.makeReservation()}>Book</Button>
                            <Button primary onClick={()=> this.cancelReservation()}>Delete</Button>
                            <Button onClick={()=> this.getRes()}>GetRes</Button>
                            {/*<Button primary onClick={()=> this.props.firebase.addReservationToDB(this.state.reservation.user_id,this.state.reservation).then(alert('123'))}>Book</Button>*/}

                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}


export default withFirebase (HotelPage);
