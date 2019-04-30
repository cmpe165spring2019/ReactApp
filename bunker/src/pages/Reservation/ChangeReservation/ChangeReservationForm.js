import React from "react";
import {Button, Icon, Grid, Segment, Card} from "semantic-ui-react";
import * as moment from "moment";
// import { DatesRangeInput,DateInput } from "semantic-ui-calendar-react";
// import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import CheckInOutCalendar from "../../../commonComponents/CheckInOutCalendar";
import RoomTypeSelect from "../../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from "../../../commonComponents/RoomQuantitySelect";
import {DatesRangeInput} from "semantic-ui-calendar-react";

const ChangeReservationForm = props => {
	const [newDatesRange, setNewDatesRange] = React.useState("");
	const {
		start_date,
		end_date,
		roomQuantity,
		room_types,
		datesRange
	} = props.oldReservation.data;
	const {newReservation, setNewReservationData} = props;
	React.useEffect(() => {
		setNewDatesRange(datesRange);
	}, []);

	React.useEffect(
		() => {
			parseDatesRange(newDatesRange);
		},
		[newDatesRange]
	);

	const parseDatesRange = editDateRanges => {
		if (editDateRanges.length > 13) {
			let parsedValue = editDateRanges.split(" - ");

			let checkInDate = new Date(parsedValue[0].split("-"));
			let checkOutDate = new Date(parsedValue[1].split("-"));
			console.log(checkInDate, checkOutDate, parsedValue);
			console.log(props.editDateRanges);
			setNewReservationData({
				...newReservation,
				start_date: checkInDate.getTime(),
				end_date: checkOutDate.getTime(),
				datesRange: newDatesRange
			});
		}
	};

	const handleChange = (event, {name, value}) => {
		props.setNewReservationData({
			...newReservation,
			[name]: value
		});
	};
	return (
		<Card fluid>
			<Card.Content>
				<Grid>
					<Grid.Row columns={3}>
						<Icon name="suitcase" size="big" />
						<Card.Content extra>
							<CheckInOutCalendar
								onChange={(event, {name, value}) => {
									setNewDatesRange(value);
								}}
								value={newDatesRange}
							/>
						</Card.Content>
					</Grid.Row>
					<Grid.Row>
						<Icon name="bed" size="big" />
						<RoomTypeSelect
							name="room_types"
							onChange={handleChange}
							defaultValue={room_types}
						/>
						<RoomQuantitySelect
							name="roomQuantity"
							onChange={handleChange}
							defaultValue={roomQuantity}
						/>
					</Grid.Row>
				</Grid>
			</Card.Content>
		</Card>
	);
};

export default ChangeReservationForm;
