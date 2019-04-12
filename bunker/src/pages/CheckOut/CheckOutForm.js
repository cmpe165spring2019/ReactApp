import React from "react";
import {Button, Message, Segment, Header} from "semantic-ui-react";
import PayPalButton from "../../server/Payment/PayPalButton";
const CheckOutForm = props => {
	const {
		reservation,
		isUseReward,
		user,
		hotel,
		handleUseReward,
		onSuccess,
		onError,
		onCancel,
		isError
	} = props;

	const totalPrice = isUseReward
		? reservation.price - user.reward_points
		: reservation.price;
	return (
		<Segment
			size={"massive"}
			style={{left: "30%", position: "fixed", top: "0%", zIndex: 1000}}
		>
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
			<Button
				content={
					isUseReward ? "Reward is used" : `Reward left: ${user.reward_points}`
				}
				negative={isUseReward}
				positive={!isUseReward}
				onClick={handleUseReward}
			/>
			<PayPalButton
				total={reservation.price}
				currency={"USD"}
				commit={true}
				onSuccess={onSuccess}
				onError={onError}
				onCancel={onCancel}
			/>
			{isError ? (
				<Message negative>
					<Message.Header>Opps!!!</Message.Header>
					<p>Something when wrong</p>
				</Message>
			) : null}
		</Segment>
	);
};

export default CheckOutForm;
