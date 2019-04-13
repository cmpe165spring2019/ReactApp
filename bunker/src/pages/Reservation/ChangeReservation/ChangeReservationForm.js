import React from "react";
import { Header} from "semantic-ui-react";
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
		</div>
	);
};

export default CancelReservationForm;
