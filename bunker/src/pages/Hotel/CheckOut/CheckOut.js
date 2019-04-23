import React from "react";
import {Modal, Button, Message, Image} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import CheckOutForm from "./CheckOutForm";
import PayPalButton from "../../../server/Payment/PayPalButton";

const CheckOut = props => {
	const [isError, setIsError] = React.useState(false);
	const [isUseReward, setIsUseReward] = React.useState(false);
	const handleUseReward = () => {
		setIsUseReward(!isUseReward);
	};

	const {reservation, hotel, datesRange} = props;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const onSuccess = payment => {
		console.log("Successful payment!", payment);
		const reservation_with_payment = {user_id: user.uid, payment: payment, hotel_id: hotel.id, ...reservation, };
		props.firebase.addReservationToDB(
			user.uid,
			reservation_with_payment,
		);
	};
	const onCancel = data => {
		console.log("Cancel: ", data);
		setIsError(true);
	};
	const onError = error => {
		console.log("Error: ", error);
		setIsError(true);
	};

	return (
		<Modal
			centered={true}
			size="large"
			trigger={
				<Button
					color="blue"
					size="small"
					width="70px"
				>
					Book now
				</Button>
			}
		>
			<Modal.Header>Payment confirm</Modal.Header>
			<Modal.Content image>
				<Image wrapped size="medium" src={hotel.data.image[0]} />
				<Modal.Description>
					<CheckOutForm
						hotel={hotel}
						reservation={reservation}
						user={user}
						isUseReward={isUseReward}
					/>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content={
						isUseReward
							? "Reward is used"
							: `Reward left: ${user.reward_points}`
					}
					disabled={user.reward_points <= 0}
					negative={isUseReward}
					positive={!isUseReward}
					onClick={handleUseReward}
				/>
				<PayPalButton
					total={reservation.price || 100}
					currency={"USD"}
					commit={true}
					onSuccess={onSuccess}
					onError={onError}
					onCancel={onCancel}
				/>
			</Modal.Actions>
			{isError ? (
				<Message negative>
					<Message.Header>Opps!!!</Message.Header>
					<p>Something when wrong</p>
				</Message>
			) : null}
		</Modal>
	);
};

export default withFirebase(CheckOut);
