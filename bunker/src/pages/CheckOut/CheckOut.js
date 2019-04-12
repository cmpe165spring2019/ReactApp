import React from "react";
import {TransitionablePortal} from "semantic-ui-react";
import {withFirebase} from "../../server/Firebase";
import CheckOutForm from "./CheckOutForm";

const CheckOut = props => {
	const [isOpen, setIsOpen] = React.useState(false);

	const [isError, setIsError] = React.useState(false);
	const [isUseReward, setIsUseReward] = React.useState(false);
	const handleUseReward = () => {
		setIsUseReward(!isUseReward);
	};

	const {reservation} = props;
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

	React.useEffect(() => {
		setIsOpen(false);
	}, []);
	React.useEffect(
		() => {
			setIsOpen(props.open);
		},
		[props.open]
	);

	return (
		<div>
			<TransitionablePortal onClose={props.handleClose} open={isOpen}>
				<CheckOutForm
					hotel={props.hotel}
					reservation={props.reservation}
					onSuccess={onSuccess}
					onCancel={onCancel}
					onError={onError}
					isError={isError}
					handleUseReward={handleUseReward}
					user={user}
					isUseReward={isUseReward}
				/>
			</TransitionablePortal>
		</div>
	);
};

export default withFirebase(CheckOut);
