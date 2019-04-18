import React, { Component } from 'react';
<<<<<<< Updated upstream
import {withRouter} from 'react-router-dom';
import{DateInput}from 'semantic-ui-calendar-react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../server/Session';
=======

// Components
import Carousel from 'nuka-carousel'
import { DatesRangeInput } from "semantic-ui-calendar-react";
>>>>>>> Stashed changes
import { withFirebase } from '../../server/Firebase';
import {
    Button,
} from 'semantic-ui-react';
<<<<<<< Updated upstream
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import * as moment from "moment";

// const hotel = [{
//     name: "1",
//     location: "Dsadas",
//     image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
//     address:"1111",
//     price:"222"
// }]
=======

// Backend functionalities
import * as moment from "moment";

//Debugging purposes
import * as util from 'util' // has no default export


>>>>>>> Stashed changes
const today = moment().format("MM-DD-YYYY");
const tommorrow = moment()
    .add(1, "days")
    .format("MM-DD-YYYY");

class HotelPage extends Component {
    constructor(props) {
        super(props);
<<<<<<< Updated upstream
=======
        // this.makeReservation = this.makeReservation.bind(this);
>>>>>>> Stashed changes
        this.state = {
            ...props.location.state,
            dateIn: "",
            dateOut: "",
            maxCheckIn: "",
            minCheckout: tommorrow
        }
    }

<<<<<<< Updated upstream
    handleCheckInDate = (event, { name, value }) => {
        let parts = value.split("-");
        let dt = new Date(
=======
    componentDidMount() {
        console.log('this.state: ' + util.inspect(this.state));
        console.log('this.state.hotel: ' + this.state.hotel);
        // const {rooms} = this.props;
        // const totalPrice = this.state.reservation.room_types.reduce((result, room) => result + (room.price*room.numb), 0);
        const user_id = JSON.parse(localStorage.getItem('authUser')).uid;

        // parse datesRange into checkin/out date
        const datesRange = this.state.datesRange;
        let parts = datesRange.split("-");
        let startDate = new Date(
>>>>>>> Stashed changes
            parseInt(parts[2]),
            parseInt(parts[0] - 1),
            parseInt(parts[1])
        );
<<<<<<< Updated upstream
        //if(value.length>=10 && dt<new Date()){
        //  window.alert("The Earliest CheckInDate is today, please choose from calendar")
        //  }
        //  else{

        let date = moment(dt)
            .add(1, "days")
            .format("MM-DD-YYYY");
        console.log(date);
        //let date1=moment(dt2).add(120,'days').format('MM-DD-YYYY');
        if (this.state.hasOwnProperty(name)) {
            console.log("good1");
            this.setState({ [name]: value, minCheckout: date });
        }
        //}
    };

    handleCheckOutDate = (event, { name, value }) => {
        console.log("good2");
        let parts = value.split("-");
        let dt = new Date(
            parseInt(parts[2]),
            parseInt(parts[0] - 1),
            parseInt(parts[1])
        );
        //  if(value.length>=10 && dt<=new Date()){
        //  window.alert("The Earliest CheckOutDate is tommorrow, please choose from calendar");
        //  }
        //  else{
        let date = moment(dt)
            .subtract(1, "days")
            .format("MM-DD-YYYY");
        //let date1=today;
        //  if(moment(dt).subtract(120,'days')>moment()){
        //date1=moment(dt).subtract(120,'days').format('MM-DD-YYYY');
        //  }
        if (this.state.hasOwnProperty(name)) {
            console.log("good3");
            this.setState({ [name]: value, maxCheckIn: date });
        }
        //}
    };

    render() {
        return (

            <div>
                {/*<div><SearchFilterBar /></div>*/}
                <div style={imageDiv}>
                    <img src={this.state.hotel.image1} style={imageStyle}/>
                    <img src={this.state.hotel.image2} style={imageStyle1}/>
                    <img src={this.state.hotel.image3} style={imageStyle1}/>
                    <img src={this.state.hotel.image4} style={imageStyle1}/>
                    <img src={this.state.hotel.image5} style={imageStyle1}/>
                </div>
                <div style={hotelDiv}>
                    <div style={leftDiv}>
                        <div style={hotelNameDiv}>
                            <h1 style={hotelName}>{this.state.hotel.data.name}</h1>
                        </div>
                        <div style={locationDiv}>
                            <h3 >{this.state.hotel.data.city}, {this.state.hotel.data.country}</h3>
                        </div>

                        <div style={priceDiv}>
                            <h2 >${this.state.hotel.price}/Night</h2>
                        </div>
                        <div style={detail}>
                            <h2 >{this.state.hotel.data.details}</h2>
                        </div>
                    </div>
                    <div style={rightDiv}>
                        <div style={checkIn}>
                            <div><h4>CheckInDate</h4></div>
                            <DateInput
                                name="dateIn"
=======
        let endDate = new Date(
            parseInt(parts[5]),
            parseInt(parts[3] - 1),
            parseInt(parts[4]));

            console.log('startDate.getTime(): ' + startDate.getTime());


        this.setState({
            reservation : {
                hotel_id: this.state.hotel.id,
                // totalPrice: totalPrice,
                price:20,
                rooms_id:77,
                start_date: startDate.getTime(),
                end_date: endDate.getTime(),
                roomQuantity: this.state.roomQuantity,
                room_types: this.state.roomType,
                user_id: user_id,

            }
        })

    }

    // ***CURRENTLY BROKEN*** this sends reservation object to firebase
    makeReservation = ()=>{
        // const {reservation} = this.state.reservation;
        //console.log(reservation);
        this.props.firebase.addReservationToDB(this.state.reservation.user_id,this.state.reservation);
        alert('hello123');

    };

    getRes=()=>{


      const user = JSON.parse(localStorage.getItem('authUser'));
    //  let reservations= [];

    //   console.log(user);
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

        return (


            <Grid>
                <Grid.Row centered>
                {/* insert carousel here */}
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

                <Grid.Row columns={3} centered>
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
>>>>>>> Stashed changes
                                minDate={today}
                                maxDate={this.state.maxCheckIn}
                                dateFormat="MM-DD-YYYY"
                                onChange={this.handleCheckInDate}
                                value={this.state.dateIn}
                                icon="bullhorn"
                                iconPosition="left"
                                placeholder="MM-DD-YYYY"
                            />
                        </div>
                        <div style={checkOut}>
                            <div><h4>CheckOutDate</h4></div>
                            <DateInput
                                name="dateOut"
                                minDate={this.state.minCheckout}
                                dateFormat="MM-DD-YYYY"
                                onChange={this.handleCheckOutDate}
                                value={this.state.dateOut}
                                icon="paper plane"
                                iconPosition="left"
                                placeholder="MM-DD-YYYY"
                            />
                        </div>
                        <div style={bookDiv1}>
                            <h3>Book Now</h3>
                            <Button color="green" size="small" width="70px">Book</Button>
<<<<<<< Updated upstream
                        </div>
                    </div>
                    <div style={googleMapDiv}>
                        <img src={"https://beta.techcrunch.com/wp-content/uploads/2013/05/sf-search-results.png"} style={googleMap}/>
                    </div>
                </div>

                <div style={bookDiv2}>
                    <table className="ui celled table">
                        <thead className="">
                        <tr className="">
                            <th className="">Room Type</th>
                            <th className="">Guest Capacity</th>
                            <th className="">Total Price</th>
                            <th className="">Book Now</th>

                        </tr>
                        </thead>
                        <tbody className="">
                        <tr className="">
                            <td className="">One bed Room</td>
                            <td className="">{this.state.hotel.oneBedCap}</td>
                            <td className="">${this.state.hotel.oneBedPrice}/Night</td>
                            <td className=""><Button color="green" size="small" >Book</Button></td>
                        </tr>
                        <tr className="">
                            <td className="">Two Bed Room</td>
                            <td className="">{this.state.hotel.twoBesCap}</td>
                            <td className="">${this.state.hotel.twoBedPrice}/Night</td>
                            <td className=""><Button color="green" size="small" >Book</Button></td>
                        </tr>
                        <tr className="">
                            <td className="">Luxury Room</td>
                            <td className="">{this.state.hotel.LuxuryCap}</td>
                            <td className="">${this.state.hotel.LuxuryPrice}/Night</td>
                            <td className=""><Button color="green" size="small" >Book</Button></td>
                        </tr>
                        </tbody>
                        <tfoot className="">
                        </tfoot>
                    </table>
                </div>

            </div>
=======
                        </Grid.Row>
                    </Grid.Column>


                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    {/*<Table celled>*/}
                        {/*<Table.Header>*/}
                            {/*<Table.Row>*/}
                                {/*<Table.HeaderCell>RoomType</Table.HeaderCell>*/}
                                {/*<Table.HeaderCell>Number of Room</Table.HeaderCell>*/}
                                {/*<Table.HeaderCell>Price</Table.HeaderCell>*/}
                                {/*<Table.HeaderCell>Total price</Table.HeaderCell>*/}
                            {/*</Table.Row>*/}
                        {/*</Table.Header>*/}

                        {/*<Table.Body>*/}
                            {/*<Table.Row>*/}
                                {/*<Table.Cell>One bed Room</Table.Cell>*/}
                                {/*/!*<Table.Cell>{this.state.reservation.rooms[0].numb}</Table.Cell>*!/*/}
                                {/*/!*<Table.Cell><Input defaultValue={this.state.reservation.room_types[0].numb} /></Table.Cell>*!/*/}
                                {/*/!*<Table.Cell>${this.state.reservation.room_types[0].price}/Night</Table.Cell>*!/*/}
                                {/*/!*<Table.Cell>${this.state.reservation.room_types[0].price * this.state.reservation.room_types[0].numb}</Table.Cell>*!/*/}
                                {/*/!*<Table.Cell><Button color="green" size="small" >Book</Button></Table.Cell>*!/*/}
                            {/*</Table.Row>*/}

                            {/*<Table.Row>*/}
                                {/*<Table.Cell>Two bed Room</Table.Cell>*/}
                                {/*/!*<Table.Cell><Input defaultValue={this.state.reservation.room_types[1].numb} /></Table.Cell>*!/*/}
                                {/*/!*<Table.Cell>{this.state.reservation.rooms[1].numb}</Table.Cell>*!/*/}
                                {/*/!*<Table.Cell>${this.state.reservation.room_types[1].price}/Night</Table.Cell>*!/*/}
                                {/*/!*<Table.Cell>${this.state.reservation.room_types[1].price * this.state.reservation.room_types[1].numb}</Table.Cell>*!/*/}
                            {/*</Table.Row>*/}

                            {/*<Table.Row>*/}
                                {/*<Table.Cell>Luxury Room</Table.Cell>*/}
                                {/*/!*<Table.Cell><Input defaultValue={this.state.reservation.room_types[2].numb} /></Table.Cell>*!/*/}
                                {/*/!*<Table.Cell>{this.state.reservation.rooms[2].numb}</Table.Cell>*!/*/}
                                {/*/!*<Table.Cell>${this.state.reservation.room_types[2].price}/Night</Table.Cell>*!/*/}
                                {/*/!*<Table.Cell>${this.state.reservation.room_types[2].price * this.state.reservation.room_types[2].numb}</Table.Cell>*!/*/}
                            {/*</Table.Row>*/}
                        {/*</Table.Body>*/}
                    {/*</Table>*/}
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
                            {/*<Button primary onClick={()=> this.cancelReservation()}>Delete</Button>*/}
                            {/*<Button onClick={()=> this.getRes()}>GetRes</Button>*/}
                            {/*<Button primary onClick={()=> this.props.firebase.addReservationToDB(this.state.reservation.user_id,this.state.reservation).then(alert('123'))}>Book</Button>*/}

                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
>>>>>>> Stashed changes
        )
    }
}
const imageDiv = {
    width:"100%",
    height:"400px",
    margin:"0 auto"
};

const imageStyle = {
    width:"50%",
    height:"400px",
    float:"left",
    border: '1px solid black'
};
const imageStyle1 = {
    width:"25%",
    height:"200px",
    float:"left",
    border: '1px solid black'
};
const hotelDiv = {
    width:"100%",
    height:"300px"
}
const leftDiv={
    margin:"20px 0 0 100px",
    float:"left",
    width:"25%",
    height:"300px"
};
const rightDiv={
    margin:"20px 0 0 100px",
    float:"left",
    width:"20%",
    height:"300px"
}
const googleMapDiv={
    margin:"20px 0 0 0",
    float:"left",
    width:"30%",
    height:"300px"
}
const googleMap={
    width:"100%",
    height:"300px",
}
const hotelName = {

    clear:"both"
}
const hotelNameDiv={
    clear:"both",
}
const locationDiv={
    margin: "20px 0 0 0",
}
const priceDiv={
    margin: "20px 0 0 0",
}
const detail={
    margin: "20px 0 0 0",
}
const checkIn={
    margin:"20px 0 0 0"
}
const checkOut={
    margin:"20px 0 0 0"
}
const bookDiv1={
    margin: "20px 0 0 0",
}
const bookDiv2={
    clear:"both",
    margin: "50px 0 0 0",
    width:"100%",
    height:"300px"
}

export default withRouter(HotelPage);