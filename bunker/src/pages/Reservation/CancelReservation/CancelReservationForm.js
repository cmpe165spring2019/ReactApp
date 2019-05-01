import React from "react";
<<<<<<< HEAD
import {Grid, Image, Divider, Header, Icon, Label, Segment, Container} from "semantic-ui-react";
=======
import {Grid, Header, Icon, Card} from "semantic-ui-react";
>>>>>>> 73137b997399c68c8f031e75e2c83e14d919d699
import _ from "lodash";
const CancelReservationForm = props => {
	const {reservation, hotel} = props;

	return (
<<<<<<< HEAD

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

					Date Booked: 
				</Header>
				{new Date(reservation.data.start_date).toDateString()} -{" "}
				{new Date(reservation.data.end_date).toDateString()}			
				<Header as='h4'>
				<Icon name="bed" size="large" />
					Rooms:
				</Header>
				{reservation.data.roomQuantity}{" "}
				{_.upperFirst(reservation.data.room_types)}-Person Room(s)
				<Header as='h4'>
				<Icon name="money" size="large" />Total Price:

				</Header>
				 ${reservation.data.price}
				</Container>
				</Grid.Column>
					
					
				</Grid>
				


				 <Header as='h3'>
				 <Divider />
			Cancellation Policy: 	
			</Header>
			<p>
				Hotel cancellations are eligible for refunds up to 80% within 48 hours of check-in date. 
				After that, all fees and payments are non-refundable and any reward points spent are not guaranteed to be returned. 
				By clicking "Confirm Cancellation" you agree to abide by these rules and this policy. 
				Bunker is not responsible for any miscalculated bookings, late cancellations, or forgetfulness upon your actions.
			</p>
			<p>
			If you have further questions about Bunker's Reservation Policy, please contact (408) 165-9999 with your 
				Reservation ID displayed in the top right corner of this dialog.
		
			</p>
			</Container>
		
		<Label attached='top right'>
		Reservation ID: 	{reservation.id}</Label>
		</Segment>		


=======
		<Card color="red" fluid>
			<Card.Content>
				<Grid centered columns={4}>
					<font size="+1">
						{new Date(reservation.data.start_date).toDateString()} -{" "}
						{new Date(reservation.data.end_date).toDateString()}
					</font >
					<Grid.Row>
						<Icon name="bed" size="big" />
						<font size="+1">
							{reservation.data.roomQuantity}{" "}
							{_.upperFirst(reservation.data.room_types)} Room(s)
						</font>
					</Grid.Row>

					<Grid.Row>
						<Icon name="money" size="big" />
						<font size="+1"> Total Price: ${reservation.data.price}</font>
					</Grid.Row>
				</Grid>
			</Card.Content>
		</Card>
>>>>>>> 73137b997399c68c8f031e75e2c83e14d919d699
	);
};

export default CancelReservationForm;
