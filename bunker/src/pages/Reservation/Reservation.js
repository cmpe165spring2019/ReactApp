import React, {Component} from "react";
import {compose} from "recompose";
import {withFirebase} from "../../server/Firebase";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {AuthUserContext} from "../../server/Session";
import * as ROUTES from "../../constants/routes";
import _ from "lodash";
import {
	Message,
	Header,
	Icon,
	Loader,
	List,
	Grid,
	Segment,
	Image
} from "semantic-ui-react";
import ChangeReservation from "./ChangeReservation/ChangeReservation";
import CancelReservation from "./CancelReservation/CancelReservation";
import moment from "moment";
import * as util from 'util';

const ReservationPage = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser => <Reservations user={authUser} />}
		</AuthUserContext.Consumer>
	</div>
);
class Reservation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotels: [],
			user: {},
			reservations: [],
			isLoading: true,
			isEmpty: true,
			isError: false
		};
	}

	componentDidMount() {
		const {user} = this.props;

		this.setState({
			isLoading: true,
			isEmpty: false,
			isError: false
		});
		this.subscribe = this.props.firebase.subscribeReservations(
			user.uid,
			// Date.now(),
			newreservations => {
				let hotelIDs = [];
				const today = new Date(
					moment()
						.format("MM-DD-YYYY")
						.split("-")
				);
				const reservations = newreservations.filter(
					item => item.data.start_date >= today.getTime()
				);
				console.log(newreservations);
				console.log(reservations);

				reservations.forEach(reservation =>
					hotelIDs.push(reservation.data.hotel_id)
				);
				console.log(reservations);
				this.props.firebase
					.getHotels(hotelIDs)
					.then(hotels => {
						this.setState({
							reservations: reservations,
							isLoading: false,
							isEmpty: reservations.length || true,
							hotels: hotels,
							isError: false
						});
					})
					.catch(err => {
						console.log(err);
						this.setState({
							isLoading: false,
							isError: true
						});
					});
			},
			error => {
				this.setState({
					isError: true,
					isLoading: false
				});
			}
		);
		// );
		// 		this.props.firebase.getReservations(user.reservations).then(result => {
		// 			console.log(result);
		// 			const reservations = result.filter(
		// 				item => item.data.start_date <= Date.now() && item
		// 			);
		// 			let hotelIDs = [];
		// 			reservations.forEach(reservation =>
		// 				hotelIDs.push(reservation.data.hotel_id)
		// 			);
		// 			this.props.firebase
		// 				.getHotels(hotelIDs)
		// 				.then(hotels => {
		// 					console.log(hotels);
		// 					this.setState({
		// 						reservations: reservations,
		// 						hotels: hotels,
		// 						user: user,
		// 						isEmpty: reservations.length === 0 ? true : false,
		// 						isLoading: false,
		// 						isError: false
		// 					});
		// 				})
		// 				.catch(error => {
		// 					console.log(error);
		// 					this.setState({
		// 						isError: true,
		// 						isLoading: false,
		// 						isEmpty: reservations.length === 0 ? true : false
		// 					});
		// 				});
		// 		});
	}

	componentWillUnmount() {
		this.subscribe();
	}

	render() {
		const {reservations, isLoading, isEmpty, isError} = this.state;
		console.log(isLoading);
		return (
			<Segment>
				{isEmpty === true ? (
					<Header as="h2" icon textAlign="center">
						<Icon name="hotel" circular />
						<Header.Content>No Reservation</Header.Content>
					</Header>
				) : (
					<Segment>
						<Loader active={isLoading} inline="centered" size="large" />

						<Grid divided="vertically">
							{reservations.map((reservation, i) => {
								console.log('reservation: ' + util.inspect(reservation));
								const datesRange = reservation.data.datesRange;
								const roomType = reservation.data.room_types;
								const roomQuantity = reservation.data.roomQuantity;
								const hotel = this.state.hotels[i];
								const startDate = new Date(reservation.data.start_date);
								const endDate = new Date(reservation.data.end_date);
								return (
									<Grid.Row key={reservation.id} columns={4}>
										<Grid.Column width={1} />
										<Grid.Column with={5}>
										<Link to = {{
										pathname: `${ROUTES.HOTEL}/${hotel.id}`,
											state: { hotel, datesRange, roomType, roomQuantity }
										}}
										>
											<Image
												src={hotel.data.image[0]}
												//size='medium'
												alt="No image"
												width="250px"
												height="150px"
											/>
										</Link>
											
											<h2> {hotel.data.name}</h2>
											<Icon name="building" size="large" />
											<i>
												{hotel.data.address.street} , {hotel.data.address.city}{" "}
												{hotel.data.address.state} {hotel.data.address.country}
											</i>
										</Grid.Column>

										<Grid.Column width={7}>
											<Grid centered columns={4}>
												<p />
												<h2>
													{startDate.toDateString()} - {endDate.toDateString()}
												</h2>
												<Grid.Row>
													<Icon name="bed" size="big" />
													<font size="+2">
														{reservation.data.roomQuantity}{" "}
														{_.upperFirst(reservation.data.room_types)} Room(s)
													</font>
												</Grid.Row>

												<Grid.Row>
													<Icon name="money" size="big" />
													<font size="+2">${reservation.data.price}</font>
												</Grid.Row>

												<Grid.Row>
													<List bulleted horizontal>
														{hotel.data.details.split(", ").map(item => (
															<List.Item>{item}</List.Item>
														))}
													</List>
												</Grid.Row>
											</Grid>
										</Grid.Column>

										<Grid.Column>
											<p />
											<div />
											<Grid.Row>
												<CancelReservation
													hotel={hotel}
													reservation={reservation}
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
						</Grid>
					</Segment>
				)}
				{isError ? (
					<Message floating negative hidden={!isError}>
						<Message.Header>We could't load that content</Message.Header>
						<p>Please contact us to resolve the problem</p>
					</Message>
				) : null}
			</Segment>
		);
	}
}
const Reservations = compose(
	withRouter,
	withFirebase
)(Reservation);

export default ReservationPage;
