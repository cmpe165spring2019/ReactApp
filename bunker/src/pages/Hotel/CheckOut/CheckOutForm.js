import React from "react";
import {Icon, Segment} from "semantic-ui-react";
import * as util from 'util';

const CheckOutForm = props => {
	const {reservation, isUseReward, user, hotel} = props;

	const totalPrice = isUseReward
		? reservation.price - user.reward_points
		: reservation.price;

	const { name, address } = hotel.data;
	const { roomQuantity, room_types } = reservation;
	const roomTypeString = room_types.charAt(0).toUpperCase() + room_types.slice(1) + '-Person Room';
console.log(util.inspect(reservation));

	return (
		<Segment>
			<h4>Your booking for: </h4>
			<h3>{name}</h3>
			<p>
				{address.street}, {address.city},{" "}
				{address.state}, {address.country}
			</p>
			<p>
			<Icon name="calendar alternate outline" size="large" />

				{new Date(reservation.start_date).toDateString()} -
				{new Date(reservation.end_date).toDateString()}
			</p>
			<p>
			<Icon name="bed" size="large" />

			{roomQuantity} x {roomTypeString}
			</p>
			
			{!isUseReward ? (
				<h4><Icon name="money" size="large" /> Total Price: ${totalPrice}</h4>
			) : (
				<h4><Icon name="money" size="large" /> Discounted Price: ${totalPrice}</h4>
			)}
		</Segment>
	);
};

export default CheckOutForm;
