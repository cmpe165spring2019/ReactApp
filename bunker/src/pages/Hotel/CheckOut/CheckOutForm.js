import React from "react";
import {Header, Segment} from "semantic-ui-react";
const CheckOutForm = props => {
	const {reservation, isUseReward, user, hotel} = props;

	const totalPrice = isUseReward
		? reservation.price - user.reward_points
		: reservation.price;

	const { name, address } = hotel.data;
	const { roomQuantity, room_types } = reservation;
	const roomTypeString = room_types.charAt(0).toUpperCase() + room_types.slice(1) + '-Person Room';

	return (
		<Segment>
			<h3>Your booking for: </h3>

			<p>{name}</p>
			<p>
				{address.street}, {address.city},{" "}
				{address.state}, {address.country}
			</p>
			<p>{roomQuantity} x {roomTypeString}</p>
			{!isUseReward ? (
				<h4>Total Price: ${totalPrice}</h4>
			) : (
				<p>Discounted Price: ${totalPrice}</p>
			)}
		</Segment>
	);
};

export default CheckOutForm;
