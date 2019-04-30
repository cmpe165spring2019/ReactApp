import React from "react";
import {Grid, Header, Icon, Card} from "semantic-ui-react";
import _ from "lodash";
const CancelReservationForm = props => {
	const {reservation, hotel} = props;

	return (
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
	);
};

export default CancelReservationForm;
