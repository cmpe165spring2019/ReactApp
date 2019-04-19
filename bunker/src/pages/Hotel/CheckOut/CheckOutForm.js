import React from "react";
import { Header} from "semantic-ui-react";
const CheckOutForm = props => {
	const {
		reservation,
		isUseReward,
		user,
		hotel,
	} = props;

	const totalPrice = isUseReward
		? reservation.price - user.reward_points
		: reservation.price;
	return (
		<div>
			<Header>Payment confirm</Header>
			<p>Hotel: {hotel.data.name}</p>
			<p>
				Address: {hotel.data.address.street}, {hotel.data.address.city},{" "}
				{hotel.data.address.state}, {hotel.data.address.country}
			</p>
			{reservation.room_types.map(room_type => (
				<div>
					<p>Type: {room_type.type}</p>
					<p>Number of Room: {room_type.number}</p>
				</div>
			))}
			{!isUseReward? (<p>Total Price: {totalPrice}</p>) : (<p>Discounted Price: {totalPrice}</p>)}
		</div>
	);
};

export default CheckOutForm;
