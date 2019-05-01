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
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);

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
			size=""
			trigger={
				<Button icon labelPosition="left" size="small" color="red">
					<Icon name="cancel" size="large" />
					Delete this Reservation
				</Button>
			}
		>
			<Modal.Header>Cancel Reservation</Modal.Header>
			<Modal.Content image>

				<Image wrapped src={hotel.data.image[0]} size="large" alt="No Image" />
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
				<Button
					content={"Confirm Cancellation"}
					color="red"
					onClick={() => setIsConfirmOpen(true)}
				/>
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
