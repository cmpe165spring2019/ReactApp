import React from "react";
import {
	Modal,
	Icon,
	Button,
	Message,
	Segment,
	Image,
	Confirm
} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import CancelReservationForm from "./CancelReservationForm";

const CancelReservation = props => {

	const [openModal, setOpenModal] = React.useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);

	//fake data

	const {reservation, hotel} = props;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const handleDeleteReservation = () => {
		console.log("handle Delete for: " + reservation.id);

		props.firebase
			.deleteReservationFromDB(reservation.id, user.uid, reservation.data.price)
			.catch(error => {
				setIsError(true);
				console.log(error);
			});
	};

	return (
		<Modal
			size=""
			trigger={
				<Button size="small" color="red" onClick={()=>setOpenModal(true)}>
					<Icon name="cancel" size="large" />
					Delete this Reservation
				</Button>
			}
			open={openModal}
			onClose={()=>setOpenModal(false)}
		>
			<Modal.Header>Cancel Reservation</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<CancelReservationForm
						reservation={reservation}
						isError={isError}
						user={user}
						hotel={hotel}
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
					content={"Confirm Cancellation"}
					color="red"
					onClick={() => setIsConfirmOpen(true)}
				/>
				</Button.Group>
				
				<Confirm
					content={
						"You will only recieve 80% of your payment back, do you still want to cancel reservation?"
					}
					confirmButton={"Yes, Cancel My Reservation"}
					open={isConfirmOpen}
					onCancel={() => setIsConfirmOpen(false)}
					onConfirm={handleDeleteReservation}
					size="mini"
				/>
			</Modal.Actions>

			{isError ? (
				<Message size="mini" negative>
					<Message.Header>Oops!!!</Message.Header>
					<p>Something when wrong</p>
				</Message>
			) : null}
		</Modal>
	);
};
//	111
export default withFirebase(CancelReservation);
