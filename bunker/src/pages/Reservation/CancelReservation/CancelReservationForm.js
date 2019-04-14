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
			{reservation.data.room_types.map(room_type => (
				<div>
					<p>Type: {room_type.type}</p>
					<p>Number of Room: {room_type.number}</p>
				</div>
			))}
			{!reservation.data.isUseReward? (<p>Total Price: {reservation.data.price}</p>) : (<p>Discounted Price: {reservation.data.price}</p>)}
		</div>
	);
};

export default CancelReservationForm;
