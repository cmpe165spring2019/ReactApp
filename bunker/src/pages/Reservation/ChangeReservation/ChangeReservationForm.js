import React from "react";
import {Button, Icon, Grid, Segment, Card} from "semantic-ui-react";
import * as moment from "moment";
import _ from "lodash";
import CheckInOutCalendar from "../../../commonComponents/CheckInOutCalendar";
import RoomTypeSelect from "../../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from "../../../commonComponents/RoomQuantitySelect";
import {DatesRangeInput} from "semantic-ui-calendar-react";

const ChangeReservationForm = props => {
	const [newDatesRange, setNewDatesRange] = React.useState("");
	const [currentPrice, setCurrentPrice] = React.useState(0);
	const {
		start_date,
		end_date,
		roomQuantity,
		room_types,
		datesRange,
		price
	} = props.oldReservation.data;
	const {newReservationData, setNewReservationData, hotel, oldReservation} = props;
	React.useEffect(() => {
		setNewDatesRange(datesRange);
		setCurrentPrice(price);
	}, []);

	React.useEffect(
		() => {
			parseDatesRange(newDatesRange);
		},
		[newDatesRange]
	);

	React.useEffect(
		() => {
			if (newReservationData) {
				console.log(newReservationData.room_types);
				const currentPrice = (_.find(hotel.data.room_types, {
					type: newReservationData.room_types || room_types
				})).price;
				const currentQuantity = newReservationData.roomQuantity || roomQuantity;
				console.log(room_types, currentPrice,currentQuantity);
				setCurrentPrice(
					(currentQuantity *
						currentPrice *
						(newReservationData.end_date - newReservationData.start_date)) /
						86400000
				);
			}
		},
		[newReservationData]
	);

	const parseDatesRange = editDateRanges => {
		if (editDateRanges.length > 13) {
			let parsedValue = editDateRanges.split(" - ");

			let checkInDate = new Date(parsedValue[0].split("-"));
			let checkOutDate = new Date(parsedValue[1].split("-"));
			console.log(checkInDate, checkOutDate, parsedValue);
			console.log(props.editDateRanges);
			setNewReservationData({
				...newReservationData,
				start_date: checkInDate.getTime(),
				end_date: checkOutDate.getTime(),
				datesRange: newDatesRange
			});
		}
	};

	const handleChange = (event, {name, value}) => {
		props.setNewReservationData({
			...newReservationData,
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
					<Grid.Row>
						<Icon name="money" size="big" />
						<font size="+2">Total Price: ${currentPrice}</font>
					</Grid.Row>
				</Grid>
			</Card.Content>
		</Card>
	);
};

export default ChangeReservationForm;
