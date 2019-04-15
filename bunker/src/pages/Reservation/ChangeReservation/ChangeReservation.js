import React from "react";
import {
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
	const [newReservationData, setNewReservationData] = React.useState({start_data: 12345});

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
			<Button
				size="small"
				color="yellow"
				width="70px"
				onClick={props.handleOpen}
				positie={!isOpen}
				negative={isOpen}
			>
				Edit this Reservation
			</Button>
			<TransitionablePortal onClose={props.handleClose} open={isOpen}>
				<Segment
					size={"massive"}
					style={{left: "30%", position: "fixed", top: "0%", zIndex: 1000}}
				>
					<ChangeReservationForm
						oldReservation={oldReservation}
						setNewReservationData={setNewReservationData}
						isError={isError}
						user={user}
						hotel={hotel}
						newReservationData={newReservationData}
					/>
					<Button
						content={"Edit This Reservation"}
						color="yellow"
						onClick={() => setIsConfirmOpen(true)}
					/>
					<Confirm
						content={
							"Do you still want to edited this reservation"
						}
						confirmButton={"Yes, I am sure"}
						open={isConfirmOpen}
						onCancel={() => setIsConfirmOpen(false)}
						onConfirm={handleChangeReservation}
					/>
					{isError ? (
						<Message negative>
							<Message.Header>Opps!!!</Message.Header>
							<p>Something when wrong</p>
						</Message>
					) : null}
				</Segment>
			</TransitionablePortal>
		</div>
	);
};

export default withFirebase(ChangeReservation);
