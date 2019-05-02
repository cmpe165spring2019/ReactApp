import React from "react";
import {Button, Icon, Grid, Segment, Container, Divider, Image, Header, Label} from "semantic-ui-react";
import * as moment from "moment";
import _ from "lodash";
import CheckInOutCalendar from "../../../commonComponents/CheckInOutCalendar";
import RoomTypeSelect from "../../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from "../../../commonComponents/RoomQuantitySelect";
import {DatesRangeInput} from "semantic-ui-calendar-react";

const ChangeReservationForm = props => {
	const [newDatesRange, setNewDatesRange] = React.useState("");
	const [currentPrice, setCurrentPrice] = React.useState(0);
	const {
		start_date,
		end_date,
		roomQuantity,
		room_types,
		datesRange,
		price
	} = props.oldReservation.data;
	const {newReservationData, setNewReservationData, hotel, oldReservation} = props;
	React.useEffect(() => {
		setNewDatesRange(datesRange);
		setCurrentPrice(price);
	}, []);

	React.useEffect(
		() => {
			parseDatesRange(newDatesRange);
		},
		[newDatesRange]
	);

	React.useEffect(
		() => {
			if (newReservationData) {
				console.log(newReservationData.room_types);
				const currentPrice = (_.find(hotel.data.room_types, {
					type: newReservationData.room_types || room_types
				})).price;
				const currentQuantity = newReservationData.roomQuantity || roomQuantity;
				console.log(room_types, currentPrice,currentQuantity);
				setCurrentPrice(
					(currentQuantity *
						currentPrice *
						(newReservationData.end_date - newReservationData.start_date)) /
						86400000
				);
			}
		},
		[newReservationData]
	);

	const parseDatesRange = editDateRanges => {
		if (editDateRanges.length > 13) {
			let parsedValue = editDateRanges.split(" - ");

			let checkInDate = new Date(parsedValue[0].split("-"));
			let checkOutDate = new Date(parsedValue[1].split("-"));
			console.log(checkInDate, checkOutDate, parsedValue);
			console.log(props.editDateRanges);
			setNewReservationData({
				...newReservationData,
				start_date: checkInDate.getTime(),
				end_date: checkOutDate.getTime(),
				datesRange: newDatesRange
			});
		}
	};

	const handleChange = (event, {name, value}) => {
		props.setNewReservationData({
			...newReservationData,
			[name]: value
		});
	};
	return (
        <Segment textAlign="left" padded="very">
        <Container text>
            Your Reservation For: 
            <Divider />
            <Grid container centered textAlign='center' verticalAlign='middle' columns={2}>
                <Grid.Column width={8}>
                    <Container>
                        <Image wrapped src={hotel.data.image[0]} size="huge" alt="No Image" />
                    </Container>
                </Grid.Column>
                <Grid.Column>
                    <Container padded="very">
                        <Header as='h2'>
                            {hotel.data.name}
                        </Header>
                        {hotel.data.address.street}, {hotel.data.address.city}, {hotel.data.address.state}, {hotel.data.address.country}
                        <Header as='h4'>
                            <Icon name="calendar alternate outline" size="large" />
                            Edit Date Booked: 
                        </Header>
							<CheckInOutCalendar
								onChange={(event, {name, value}) => {
									setNewDatesRange(value);
								}}
								value={newDatesRange}
							/>
                        <Header as='h4'>
                            <Icon name="bed" size="large" />
                            Edit Rooms:
                        </Header>
						<RoomTypeSelect
							name="room_types"
							onChange={handleChange}
							defaultValue={room_types}
						/>
						<RoomQuantitySelect
							name="roomQuantity"
							onChange={handleChange}
							defaultValue={roomQuantity}
						/>
                        <Header as='h4'>
                            <Icon name="money" size="large" />Total Price: ${currentPrice}
                        </Header>
                   
                    </Container>
                </Grid.Column>
            </Grid>
            <Divider />
            <Header as='h3'>
                Note to User: 	
            </Header>
            <p>
                If changes need to be made to check-in/check-out dates or room types/quantity, requests will be granted based off of availability at the time of change.
                Total price will be affected based off of changes made by the user.
                Additional/reduced fees will be charged/refunded to the same method of payment used for the previous booking.
                Refunds are only eligible within 48 hours of check-in date from the original booking date. 
                After that, all fees and payments are non-refundable and any reward points spent are not guaranteed to be returned. 
                By clicking "Edit Cancellation" you agree to abide by these rules and this policy. 
                Bunker is not responsible for any miscalculated bookings, late cancellations, or forgetfulness upon your actions.
            </p>
        </Container>
        <Label attached='top right'>
            Reservation ID: 	{oldReservation.id}
        </Label>
    </Segment>
	);
};

export default ChangeReservationForm;
