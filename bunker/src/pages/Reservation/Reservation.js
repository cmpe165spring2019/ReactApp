import React, {Component} from "react";
import {compose} from "recompose";
import {withFirebase} from "../../server/Firebase";
import {withRouter} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import _ from 'lodash';
import {
	Container,
	Header,
	Icon,
	Dimmer,
	Loader,
	Grid,
	Segment,
	Image
} from "semantic-ui-react";
import ChangeReservation from "./ChangeReservation/ChangeReservation";
import CancelReservation from "./CancelReservation/CancelReservation";

const ReservationPage = () => (
	<div>
		<Reservations />
	</div>
);
class Reservation extends Component {
	constructor(props) {
		super(props);
		const user = JSON.parse(localStorage.getItem("authUser"));

		this.state = {
			hotels: [],
			user: user,
			reservations: [],
			stupidway: 1,
			isLoading: false
		};

	}

	componentDidMount() {
		this.setState({
			isLoading: true
		})
		const user = JSON.parse(localStorage.getItem("authUser"));

		this.props.firebase
			.getReservations(user.reservations)
			.then(reservations => {
				let hotelIDs = [];
				reservations.forEach(reservation =>
					hotelIDs.push(reservation.data.hotel_id)
				);
				this.props.firebase.getHotels(hotelIDs).then(hotels => {
					console.log(hotels);
					this.setState({
						reservations: reservations,
						hotels: hotels,
					});
					this.setState({
						isLoading: false
					})
				});
			});
	}


	render() {
		const {reservations, isLoading} = this.state;
		return (
			<Segment>{reservations.length === 0 ? (<div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='hotel' circular />
      <Header.Content>No Reservation</Header.Content>
    </Header>

  </div>):(<div><Grid divided="vertically">
				{this.state.reservations.map((reservation, i) => {
					const hotel = this.state.hotels[i];
					const startDate = new Date(reservation.data.start_date);
					const endDate = new Date(reservation.data.end_date);
					return (
						<Grid.Row key={reservation.id} columns={3}>
							<Grid.Column width={1} />
							<Grid.Column >
								<Image
									src={hotel.data.image[0]}
									//size='medium'
									width="250px"
									height="150px"
								/>
								<h3> {hotel.data.name}</h3>
							</Grid.Column>

							<Grid.Column>
								<h2>
									{startDate.toDateString()} - {endDate.toDateString()}
								</h2>

								<Grid.Row>
									<CancelReservation
										hotel={hotel}
										reservation={reservation}
										updateReservations={(value) => {_.remove(reservations, value); this.setState({reservations: reservations})}}
									/>
								</Grid.Row>
								<p />
								<Grid.Row>
									<ChangeReservation
										hotel={hotel}
										reservation={reservation}
									/>
								</Grid.Row>
							</Grid.Column>
						</Grid.Row>
					);
				})}
			</Grid><Loader inverted active={isLoading} size='small'/></div>)}
</Segment>
		);
	}
}
const Reservations = compose(
	withRouter,
	withFirebase
)(Reservation);

export default ReservationPage;
