import React from "react";
import {
	Modal,
	Grid,
	TransitionablePortal,
	Button,
	Icon,
	Message,
	Segment,
	Header,
	Image,
	Confirm
} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import ChangeReservationForm from "./ChangeReservationForm";

const ChangeReservation = props => {
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
		<Modal
			trigger={
				<Button size="small" color="yellow">
					<Icon name="edit" size="large" />
					Change this reservation
				</Button>
			}
		>
			<Modal.Header>Edit Reservation</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
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
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content={"Confirm Changes"}
					color="yellow"
					onClick={() => setIsConfirmOpen(true)}
					disabled={newReservationData === {} ? true : false}
				/>
				<Confirm
					content={"Do you still want to make changes to this reservation?"}
					confirmButton={"Yes, I am sure"}
					open={isConfirmOpen}
					onCancel={() => setIsConfirmOpen(false)}
					onConfirm={handleChangeReservation}
				/>
			</Modal.Actions>
			{isError ? (
				<Message negative>
					<Message.Header>Oops!!!</Message.Header>
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
