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

	const [openModal, setOpenModal] = React.useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [error, setError] = React.useState(new Error("null"));
	const [isEditable, setIsEditable] = React.useState(false);
	const [newReservationData, setNewReservationData] = React.useState({});
	const [isSuccess, setIsSuccess] = React.useState(false);

	const {hotel} = props;
	const oldReservation = props.reservation;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const handleChangeReservation = () => {
		console.log(newReservationData);
		props.firebase
			.editReservationInfo(oldReservation.id, newReservationData, user.uid)
			.then(() =>{
				setIsSuccess(true);
				setIsConfirmOpen(false);
				setOpenModal(false);
			})
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
				<Button size="small" color="yellow" onClick={()=>setOpenModal(true)}>
					<Icon name="edit" size="large" />
					Change this Reservation
				</Button>
			}
			open={openModal}
			onClose={()=>setOpenModal(false)}
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
				<Button.Group>
				<Button
					content={"Cancel"}
					onClick={()=> setOpenModal(false)}
				/>
				<Button.Or/>
				<Button
					content={"Confirm Changes"}
					color="yellow"
					onClick={() => setIsConfirmOpen(true)}
					disabled={newReservationData === {} ? true : false}
				/>


				</Button.Group>

				<Confirm
					content={"Do you still want to make changes to this reservation?"}
					confirmButton={"Yes, I am sure"}
					open={isConfirmOpen}
					onCancel={() => setIsConfirmOpen(false)}
					onConfirm={handleChangeReservation}
				/>
			</Modal.Actions>
			{isError ? (
				<Message onDismiss={()=> setIsError(false)} style={{ 'min-width':"350px", left: "40%", position: "fixed", top: "80%"}} negative>
				<Message.Header>Oops!!!</Message.Header>
				{false ? (
					<Message.Content>
						It seem like you have a reservation for the same day.
					</Message.Content>
				) : (
					<Message.Content>Something when wrong</Message.Content>
				)}
			</Message>
			) : null}
			{isSuccess ? (
				<Message
					onDismiss={() => setIsSuccess(false)}
					style={{
						width: "330px",
						height: "75px",
						left: "40%",
						position: "fixed",
						top: "80%"
					}}
					positive
				>
					<Message.Header>Edit Successed</Message.Header>
					<Message.Content>Your reservation have been changed</Message.Content>
				</Message>
			) : null}
		</Modal>
	);
};

export default withFirebase(ChangeReservation);
