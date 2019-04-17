import React from "react";
import { Header} from "semantic-ui-react";
const CancelReservationForm = props => {
	const {
		reservation,
		hotel,
	} = props;

	return (
		<div>
			<Header>Payment confirm</Header>
			<p>Hotel: {hotel.data.name}</p>
			<p>
				Address: {hotel.data.address.street}, {hotel.data.address.city},{" "}
				{hotel.data.address.state}, {hotel.data.address.country}
			</p>
			<p>{reservation.data.room_types}</p>
			{!reservation.data.isUseReward? (<p>Total Price: {reservation.data.price}</p>) : (<p>Discounted Price: {reservation.data.price}</p>)}
		</div>
	);
};

export default CancelReservationForm;
