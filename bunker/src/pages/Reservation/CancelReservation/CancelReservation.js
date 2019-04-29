import React from "react";
import {TransitionablePortal,Modal, Button, Message, Segment, Confirm} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import CancelReservationForm from "./CancelReservationForm";

const CancelReservation = props => {
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [isOpen,setIsOpen]=React.useState(false);


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
		<TransitionablePortal
			trigger={
				<Button
					size="small"
					color="red"
					width="70px"
				>
					Delete this Reservation
				</Button>
			} onClose={()=> setIsOpen(false)} onOpen={()=> setIsOpen(true)} open={isOpen}
		>
				<Segment
				size={"massive"}
				style={{left: "70%", position: "fixed", top: "0%", zIndex: 1000}}
       >
					<CancelReservationForm
						reservation={reservation}
						isError={isError}
						user={user}
						hotel={hotel}
					/>

					<Button
						content={"Confirm Cancellation"}
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
					size="mini"
					/>

				{isError ? (
					<Message size="mini" negative>
						<Message.Header>Opps!!!</Message.Header>
						<p>Something when wrong</p>
					</Message>
				) : null}
       	</Segment>
		</TransitionablePortal>
	);
};
//	111
export default withFirebase(CancelReservation);
