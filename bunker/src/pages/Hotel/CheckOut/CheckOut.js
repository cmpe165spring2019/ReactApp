import React from "react";
import {
	TransitionablePortal,
	Button,
	Message,
	Segment
} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import CheckOutForm from "./CheckOutForm";
import PayPalButton from "../../../server/Payment/PayPalButton";

const CheckOut = props => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [isUseReward, setIsUseReward] = React.useState(false);
	const handleUseReward = () => {
		setIsUseReward(!isUseReward);
	};

	const {reservation, hotel} = props;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const onSuccess = payment => {
		console.log("Successful payment!", payment);
		const reservation_with_payment = {payment: payment, ...reservation};
		props.firebase.addReservation(
			user.uid,
			reservation_with_payment,
			isUseReward
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
			<TransitionablePortal onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} open={isOpen} closeOnTriggerClick openOnTriggerClick trigger={
				<Button
					color="blue"
					size="small"
					width="70px"
					positive={!isOpen}
					negative={isOpen}
				>
					Book now
				</Button>
			}>
				<Segment
					size={"massive"}
					style={{left: "30%", position: "fixed", top: "0%", zIndex: 1000}}
				>
					<CheckOutForm
						hotel={hotel}
						reservation={reservation}
						user={user}
						isUseReward={isUseReward}
					/>
					<Button
						content={
							isUseReward
								? "Reward is used"
								: `Reward left: ${user.reward_points}`
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
			</TransitionablePortal>
	);
};

export default withFirebase(CheckOut);
