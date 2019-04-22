import React from "react";
import {Modal, Button, Message, Segment, Confirm} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import ChangeReservationForm from "./ChangeReservationForm";

const ChangeReservation = props => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [newReservationData, setNewReservationData] = React.useState({});

	const {hotel} = props;
	const oldReservation = props.reservation;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const handleChangeReservation = () => {
		console.log(newReservationData);
		props.firebase
			.editReservationInfo(oldReservation.id, newReservationData)
			.catch(error => {
				setIsError(true);
				console.log(error);
			});
		console.log("handle Edit");
	};

	return (
		<Modal
			trigger={
				<Button
					size="small"
					color="yellow"
					width="70px"
					positie={!isOpen}
					negative={isOpen}
				>
					Change this reservation
				</Button>
			}
		>
			<Modal.Header>Edit Reservation</Modal.Header>
			<Modal.Description>
				<ChangeReservationForm
					oldReservation={oldReservation}
					setNewReservationData={setNewReservationData}
					isError={isError}
					user={user}
					hotel={hotel}
					newReservationData={newReservationData}
				/>
			</Modal.Description>
			<Modal.Actions>
				<Button
					content={"Edit This Reservation"}
					color="yellow"
					onClick={() => setIsConfirmOpen(true)}
				/>
				<Confirm
					content={"Do you still want to edited this reservation"}
					confirmButton={"Yes, I am sure"}
					open={isConfirmOpen}
					onCancel={() => setIsConfirmOpen(false)}
					onConfirm={handleChangeReservation}
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

export default withFirebase(ChangeReservation);
