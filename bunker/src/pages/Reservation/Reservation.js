import React, {Component} from "react";
import {compose} from "recompose";
import {withFirebase} from "../../server/Firebase";
import {withRouter} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {
	Button,
	Form,
	Grid,
	Header,
	Segment,
	Message,
	Image
} from "semantic-ui-react";
import ChangeReservation from "./ChangeReservation/ChangeReservation";
import CancelReservation from "./CancelReservation/CancelReservation";

const ReservationPage = () => (
	<div>
		<h1 />
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
			openCancle: [],
			openChange: [],
			stupidway: 1
		};
	}

	componentDidMount() {
		const user = JSON.parse(localStorage.getItem("authUser"));

		this.props.firebase
			.getReservations(user.reservations)
			.then(reservations => {
				let hotelIDs = [];
				reservations.forEach(reservation =>
					hotelIDs.push(reservation.data.hotel_id)
				);
				let openCancle = [];
				let openChange = [];
				reservations.forEach(() => {
					openCancle.push(false);
					openChange.push(false);
				});
				this.props.firebase.getHotels(hotelIDs).then(hotels => {
					console.log(hotels);
					this.setState({
						reservations: reservations,
						hotels: hotels,
						openCancle: openCancle,
						openChange: openChange
					});
				});
			});
	}

	render() {
		return (
			<Grid divided="vertically">
				{this.state.reservations.map((reservation, i) => {
					const hotel = this.state.hotels[i];
					const startDate = new Date(reservation.data.start_date);
					const endDate = new Date(reservation.data.end_date);
					const openCancle = this.state.openCancle[i];
					const openChange = this.state.openChange[i];

					return (
						<Grid.Row columns={3}>
							<Grid.Column width={1} />
							<Grid.Column>
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
										open={openCancle}
										handleOpen={() => {
											const newOpenCancle = this.state.openCancle;
											newOpenCancle[i] = true;
											this.setState({
												openCancle: newOpenCancle
											});
										}}
										handleClose={() => {
											const newOpenCancle = this.state.openCancle;
											newOpenCancle[i] = false;
											this.setState({
												openCancle: newOpenCancle
											});
										}}
									/>
								</Grid.Row>
								<p />
								<Grid.Row>
									<ChangeReservation
										hotel={hotel}
										reservation={reservation}
										open={openChange}
										handleOpen={() => {
											const newOpenChange = this.state.openChange;
											newOpenChange[i] = true;
											this.setState({
												openChange: newOpenChange
											});
										}}
										handleClose={() => {
											const newOpenChange = this.state.openChange;
											newOpenChange[i] = false;
											this.setState({
												openChange: newOpenChange
											});
										}}
									/>
								</Grid.Row>
							</Grid.Column>
						</Grid.Row>
					);
				})}
			</Grid>
		);
	}
}
const Reservations = compose(
	withRouter,
	withFirebase
)(Reservation);

export default ReservationPage;
