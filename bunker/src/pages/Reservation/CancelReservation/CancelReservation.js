import React from "react";
import {Modal, Button, Message, Segment, Confirm} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import CancelReservationForm from "./CancelReservationForm";

const CancelReservation = props => {
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);

	//fake data

	const {reservation, hotel} = props;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const handleDeleteReservation = () => {
		props.firebase
			.deleteReservationFromDB(reservation.id, user.uid, reservation.data.price)
			.catch(error => {
				setIsError(true);
				console.log(error);
			});
		console.log("handle Delete");
	};

	return (
		<Modal
			trigger={
				<Button
					size="small"
					color="red"
					width="70px"
				>
					Delete this Reservation
				</Button>
			}
		>
				<Modal.Header>Delete Payment</Modal.Header>
				<Modal.Description>
					<CancelReservationForm
						reservation={reservation}
						isError={isError}
						user={user}
						hotel={hotel}
					/>
				</Modal.Description>
				<Modal.Actions>
					<Button
						content={"Delete This Reservation"}
						color="red"
						onClick={() => setIsConfirmOpen(true)}
					/>
					<Confirm
					content={
						"You will only recieve 80% of your payment, do you still want to cancel reservation"
					}
					confirmButton={"Yes, I am sure"}
					open={isConfirmOpen}
					onCancel={() => setIsConfirmOpen(false)}
					onConfirm={handleDeleteReservation}
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
//	111
export default withFirebase(CancelReservation);
