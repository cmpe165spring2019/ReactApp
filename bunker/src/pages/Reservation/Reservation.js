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
            let hotelIDs = [];
            reservations.forEach(reservation => hotelIDs.push(reservation.data.hotel_id));
            console.log(hotelIDs);
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
                {
                    this.state.reservations.map( (reservation, i)  =>{
                        const hotel=this.state.hotels[i];
                        const startDate = new Date(reservation.data.start_date);
                        const endDate = new Date(reservation.data.end_date);

                        return(
                            <Grid.Row columns={3}>
                                <Grid.Column width={1}>
                                </Grid.Column>
                                <Grid.Column>
                                    <Image
                                        src= {hotel.data.image[0]}
                                        //size='medium'
                                        width="250px"
                                        height="150px"
                                    />
                                    <h3>  {hotel.data.name}</h3>
                                </Grid.Column>

                                <Grid.Column>
                                    <h2>{startDate.toDateString()} - {endDate.toDateString()}</h2>

                                    <Grid.Row>
                                        <Button color='yellow' size='large'>Change Reservation</Button>
                                    </Grid.Row>
                                    <p></p>
                                    <Grid.Row>
                                        <Button color='red' size="large">Cancel  Reservation </Button>
                                    </Grid.Row>
                                </Grid.Column>

                            </Grid.Row>
                        );
                    })
                }

            </Grid>
        );
    }
}
const Reservations = compose(
    withRouter,
    withFirebase,
)(Reservation);

export default ReservationPage;
