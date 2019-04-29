import React from "react";
import {
	Modal,
	Grid,
	TransitionablePortal,
	Button,
	Message,
	Segment,
	Confirm
} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import ChangeReservationForm from "./ChangeReservationForm";

const ChangeReservation = props => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [error, setError] = React.useState(new Error("null"));
	const [isEditable, setIsEditable] = React.useState(false);
	const [newReservationData, setNewReservationData] = React.useState({});

	const {hotel} = props;
	const oldReservation = props.reservation;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const handleChangeReservation = () => {
		console.log(newReservationData);
		props.firebase
			.editReservationInfo(oldReservation.id, newReservationData, user.uid)
			.catch(error => {
				setIsError(true);
				setError(error);
				console.log(error);
			});
		console.log("handle Edit");
	};

	return (
		<Modal size="mini"
			trigger={
				<Button size="small" color="yellow" width="70px">
					Change this reservation
				</Button>
			}
		>
			<Modal.Header>Edit Reservation</Modal.Header>
			<Modal.Description>
			</Modal.Description>
			<Modal.Actions>
				<Button
					content={"Edit This Reservation"}
					color="yellow"
					onClick={() => setIsConfirmOpen(true)}
			<Segment
				size={"big"}
				style={{left: "70%", position: "fixed", top: "15%", zIndex: 1000}}
			>
				<ChangeReservationForm
					oldReservation={oldReservation}
					setNewReservationData={setNewReservationData}
					isError={isError}
					isEditable={isEditable}
					setIsEditable={setIsEditable}
					user={user}
					hotel={hotel}
					newReservationData={newReservationData}
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
					{error.message === "multiplebooking" ? (
						<Message.Content>
							It seem like you have a reservation for the same day.
						</Message.Content>
					) : (
						<Message.Content>Something when wrong</Message.Content>
					)}
				</Message>
			) : null}
		</Modal>
	);
};

export default withFirebase(ChangeReservation);
