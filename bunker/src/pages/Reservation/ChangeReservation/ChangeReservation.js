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
	const [isEditable,setIsEditable]=React.useState(false);
	const [newReservationData, setNewReservationData] = React.useState({});

	const {hotel} = props;
	const oldReservation = props.reservation;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const handleChangeReservation = () => {
		console.log(newReservationData);
		props.firebase
			.editReservationInfo(oldReservation.id, newReservationData,user.uid)
			.catch(error => {
				setIsError(true);
				setError(error);
				console.log(error);
			});
		console.log("handle Edit");
	};

	return (
		<TransitionablePortal closeOnTriggerClick openOnTriggerClick trigger={
<Button
size="small"
color="yellow"
width="70px"
positie={!isOpen}
negative={isOpen}
>
Change this reservation
</Button>
} onClose={() => setIsOpen(false)} onOpen={() => {setIsOpen(true); setIsEditable(false)}} open={isOpen}>
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
<p></p>
{isEditable ? (
<Button
  active
content={"Modify This Reservation"}
color="yellow"
onClick={() => {setIsConfirmOpen(true);handleChangeReservation()}}
      />) : (
<Button
   disabled
content={"Modify This Reservation"}
color="yellow"
onClick={() => setIsConfirmOpen(true)}
/>
)}
<Confirm
content={
"Changes on your Reservation are successfully completed!"
}
confirmButton={"OK"}
open={isConfirmOpen}
onCancel={() => setIsConfirmOpen(false)}
//onConfirm={handleChangeReservation}
/>

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

</Segment>
</TransitionablePortal>


	);
};

export default withFirebase(ChangeReservation);
