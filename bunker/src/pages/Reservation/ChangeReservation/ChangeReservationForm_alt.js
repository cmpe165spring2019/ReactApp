import React from "react";
import {
	Image,
	Button,
	Table,
	Grid,
	Input,
	Header,
	Select,
	Dropdown
} from "semantic-ui-react";
import * as moment from "moment";
// import { DatesRangeInput,DateInput } from "semantic-ui-calendar-react";
// import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import CheckInOutCalendar from "../../../commonComponents/CheckInOutCalendar";
import RoomTypeSelect from "../../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from "../../../commonComponents/RoomQuantitySelect";
import {DatesRangeInput} from "semantic-ui-calendar-react";

// const today=moment().format('MM-DD-YYYY');
// const tomorrow=moment().add(1,'days').format('MM-DD-YYYY');
// const aWeekFromToday = moment().add(5, 'days').format('MM-DD-YYYY');
// const defaultDateRangeArray = [today, aWeekFromToday];
// const defaultDateRange = defaultDateRangeArray.join(" - ");

const ChangeReservationForm = props => {
	const [newDatesRange, setNewDatesRange] = React.useState('');
	const {start_date, end_date, roomQuantity, room_types, datesRange} = props;
	const {newReservation, setNewReservationData} = props;

  React.useEffect(() => {
    parseDatesRange(newDatesRange);
},[newDatesRange]);

	const handleDate = date => {
		// console.log(date[0]);
		setNewReservationData({
			start_date: date[0].getTime(),
			end_date: date[1].getTime()
		});

		console.log(start_date);
		const start = moment(start_date).format("MM-DD-YYYY");
		const end = moment(end_date).format("MM-DD-YYYY");
		console.log("is:" + start);
		console.log(end_date);
		console.log("is:" + end);

		// setNewReservationData({ date })
	};

	const handleCheckInOut = ({value}) => {
		//set datesRange whenever calendar range is updated
		setNewDatesRange(
			value
			// , () => {
			//parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
			// parseDatesRange(value);
			// }
		);
	};

	const parseDatesRange = datesRange => {
		if (datesRange.length > 13) {
			let parsedValue = datesRange.split(" - ");

			let checkInDate = new Date(parsedValue[0].split("-"));
			let checkOutDate = new Date(parsedValue[1].split("-"));
      console.log(checkInDate,checkOutDate,parsedValue);
			console.log(props.datesRange);
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

		<Grid>
			<Grid.Row>
				<div>CheckInOutCalendar In/Out:</div>
				<CheckInOutCalendar
					onChange={(event, {name, value}) => {setNewDatesRange(value)}}
					value={newDatesRange}
				/>
			</Grid.Row>
			<Grid.Row>
				<div>Room Type:</div>
				<RoomTypeSelect
					name="room_types"
					onChange={handleChange}
					value={room_types}
				/>
			</Grid.Row>
			<Grid.Row>
				<div>Quantity:</div>
				<RoomQuantitySelect
					name="roomQuantity"
					onChange={handleChange}
					value={roomQuantity}
				/>
			</Grid.Row>
			<Button
				onClick={event => {
					props.setNewReservationData({});
				}}
			>
				Submit
			</Button>
		</Grid>
	);
};

export default ChangeReservationForm;
