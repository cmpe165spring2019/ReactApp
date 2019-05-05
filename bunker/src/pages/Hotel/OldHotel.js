import React, { Component } from 'react';

// Components
import { DatesRangeInput } from "semantic-ui-calendar-react";
import { withFirebase } from '../../server/Firebase';
import {
    Button, Grid,
} from 'semantic-ui-react';

// Backend functionalities
import * as moment from "moment";

//Debugging purposes
import * as util from 'util' // has no default export
import CheckInOutCalendar from '../../commonComponents/CheckInOutCalendar';


const today = moment().format("MM-DD-YYYY");
const tommorrow = moment()
    .add(1, "days")
    .format("MM-DD-YYYY");

class HotelPage extends Component {
    constructor(props) {
        super(props);
        // this.makeReservation = this.makeReservation.bind(this);
        this.state = {
            ...props.location.state,
            dateIn: "",
            dateOut: "",
            maxCheckIn: "",
            minCheckout: tommorrow
        }
    }

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
            parseInt(parts[2]),
            parseInt(parts[0] - 1),
            parseInt(parts[1])
        );
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
<Grid></Grid>


        )
    }
}


export default HotelPage;