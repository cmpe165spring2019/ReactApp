import React from "react";
import { Header, Button} from "semantic-ui-react";
const CancelReservationForm = props => {
	const {
		oldReservation,
		hotel,
		setNewReservationData,
		newReservationData
	} = props;

	return (
		<div>
			<Header>Edit Reservation</Header>
			<Button onClick={(event) => {const newdat = Date.now(); setNewReservationData({end_date : Number(newdat)})}}/>
		</div>
	);
};

export default CancelReservationForm;
