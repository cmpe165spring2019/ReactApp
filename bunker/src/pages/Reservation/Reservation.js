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
	Label,
	Grid,
	Segment,
	Image,
	Button,
	Dropdown
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
			isError: false,
			user: user
		},
		()=>{
			console.log('this.state.user: ' + util.inspect(this.state.user));
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
		const {reservations, isLoading, isEmpty, isError, user} = this.state;
		return (
			<div>
				{ 
					isEmpty === true ? 
					(
						<Segment placeholder padded="very">
							<Header as="h2" icon textAlign="center">
								<Icon name="hotel" circular />
								<Header.Content>No Reservations Booked</Header.Content>
							</Header>
							<Link to={ROUTES.HOME}>
								<Button primary>Book a Hotel</Button>
							</Link>
						</Segment>
					) 
					: 
					(
						<Segment padded="very">
							<Grid centered columns={2}>
								<Grid.Column width={12}>

					
									<Loader active={isLoading} inline="centered" size="large" />
									<Header as='h2'>
										Welcome, {user.username}!
									</Header>
									<Header as='h3'>
									Your currently booked reservations:
									</Header>
									{
										reservations.map((reservation, i) => {

											console.log('reservation: ' + util.inspect(reservation));
											const datesRange = reservation.data.datesRange;
											const roomType = reservation.data.room_types;
											const roomQuantity = reservation.data.roomQuantity;
											const hotel = this.state.hotels[i];
											const startDate = new Date(reservation.data.start_date);
											const endDate = new Date(reservation.data.end_date);
											return (
												<Segment padded="very">
													<Label attached='top left'>
														Reservation ID: {reservation.id}
													</Label>
													<Grid columns={3} >
														<Grid.Row>
															<Grid.Column width={7}>
																<Link to = {{
																	pathname: `${ROUTES.HOTEL}/${hotel.id}`,
																	state: { hotel, datesRange, roomType, roomQuantity }
																}}>
																<Image
																	src={hotel.data.image[0]}
																	wrapped size='large'
																/>
																</Link>
															</Grid.Column>
															<Grid.Column width={5}>
																<Header as='h2'>
																	{hotel.data.name}
																</Header>
																{hotel.data.address.street}, {hotel.data.address.city}, {hotel.data.address.state}, {hotel.data.address.country}
																<Header as='h4'>
																	<Icon name="calendar alternate outline" size="large" />
																	Date Booked: 
																</Header>
																{startDate.toDateString()} - {endDate.toDateString()}
																<Header as='h4'>
																	<Icon name="bed" size="large" />
																	Rooms:
																</Header>
																{reservation.data.roomQuantity}{" "}
																{_.upperFirst(reservation.data.room_types)} Room(s)
																<Header as='h4'>
																	<Icon name="money" size="large" />
																	Total Price:	${reservation.data.price}
																</Header>
															</Grid.Column>
															<Grid.Column width={4}>
																<Grid.Row>
																	<Button.Group vertical>
																		<ChangeReservation
																			hotel={hotel}
																			reservation={reservation}
																		/>
																		<CancelReservation
																			hotel={hotel}
																			reservation={reservation}
																		/>
																	</Button.Group>
																</Grid.Row>
															</Grid.Column>
														</Grid.Row>
													</Grid>
												</Segment>

											)
										})
									}
								</Grid.Column>
							</Grid>
						</Segment>
					)
				}
													
				{
					isError ? 
					(
						<Message floating negative hidden={!isError}>
							<Message.Header>We could't load that content</Message.Header>
							<p>Please contact an administrator to resolve the problem</p>
						</Message>
					) : null
				}
			</div>
		);
	}
}
const Reservations = compose(
	withRouter,
	withFirebase
)(Reservation);

export default ReservationPage;
