import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from '../../server/Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Image
} from 'semantic-ui-react';

const ReservationPage= () => (
  <div>
    <h1></h1>
    <Reservations />


  </div>
);
class Reservation extends Component{
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('authUser'));

this.state = {
        hotels:[],
        user: user,
        reservations:[],
        openChangeReservation:false,
        stupidway: 1
    };
  }



  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('authUser'));

    this.props.firebase.getReservations(user.reservations).then(reservations => {
      const hotelIDs = reservations.map(reservation => reservation.data.hotel_id);
      console.log(reservations);
      this.props.firebase.getHotels(hotelIDs).then(hotels => {
        console.log(hotels);
        this.setState({
          reservations: reservations,
          hotels: hotels,
        });
      });
    });
  }



  render(){
    return(
      <Grid divided='vertically'>



      <Grid.Row columns={3}>
      <Grid.Column width={1}>
      </Grid.Column>
          <Grid.Column>
               <Image
                src="https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg"
                //size='medium'
                width="250px"
                height="150px"
                />
                <h3>  Hilton San Jose</h3>
          </Grid.Column>

          <Grid.Column>
            <h2>April 11th, 2019 - May 11th,2019</h2>
             <Grid.Row>
            <Button color='yellow' size='large'>Change Reservation</Button>
            </Grid.Row>
              <p></p>
            <Grid.Row>
            <Button color='red' size="large">Cancel  Reservation </Button>
            </Grid.Row>
          </Grid.Column>

</Grid.Row>


      </Grid>
    );
  }
}
const Reservations = compose(
  withRouter,
  withFirebase,
)(Reservation);

export default ReservationPage;
