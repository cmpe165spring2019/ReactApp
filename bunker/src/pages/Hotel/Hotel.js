import React, {Component} from "react";

// Components
import {withFirebase} from "../../server/Firebase";
import {
	Grid,
	Button,
	Container,
	Header,
	Segment,
	Divider,
	Rating
} from "semantic-ui-react";
import CheckOut from "./CheckOut/CheckOut";

// import Carousel from 'react-bootstrap/Carousel';
// import { Carousel } from 'react-responsive-carousel';

import * as moment from "moment";

//Debugging purposes
import * as util from "util"; // has no default export
import CheckInOutCalendar from "../../commonComponents/CheckInOutCalendar";
import RoomTypeSelect from "../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from "../../commonComponents/Navigation/RoomQuantitySelect";

class HotelPage extends Component {
  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = {
      ...props.location.state,
      checkInDate: "",
      checkOutDate: "",
      start_date: 0,
      end_date: 0,
    };
  }

	componentDidMount() {
		//parse dates into check in and out

		this.parseDatesRange(this.state.datesRange);
		this.calculatePricePerNight();
	}

	componentDidUpdate(prevProps, prevState) {}

	parseDatesRange = datesRange => {
		if (datesRange.length > 13) {
			let parsedValue = datesRange.split(" ");
			let checkInString = parsedValue[0];
			let checkOutString = parsedValue[2];
			let checkInArray = checkInString.split("-");
			let checkOutArray = checkOutString.split("-");
			let checkInDate = new Date(
				parseInt(checkInArray[2]),
				parseInt(checkInArray[0] - 1),
				parseInt(checkInArray[1])
			);
			let checkOutDate = new Date(
				parseInt(checkOutArray[2]),
				parseInt(checkOutArray[0] - 1),
				parseInt(checkOutArray[1])
			);

      this.setState({
        ...this.state,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        start_date: checkInDate.getTime(),
        end_date: checkOutDate.getTime()
      });
		}
	};

	handleCheckInOut = (event, {name, value}) => {
		//set datesRange whenever calendar range is updated
		if (this.state.hasOwnProperty(name)) {
			this.setState({[name]: value}, () => {
				//parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
				this.parseDatesRange(value);
			});
		}
	};

	handleRoomTypeQuantity = (e, {name, value}) => {
		this.setState(
			{
				[name]: value
			},
			() => {
				this.calculatePricePerNight();
			}
		);
	};

	calculatePricePerNight() {
		const {room_types} = this.state.hotel.data;
		const {roomQuantity} = this.state;
		const roomTypeData = room_types.filter(
			roomType => roomType.type === this.state.roomType
		);
		const roomPrice = roomTypeData[0].price;

		const pricePerNight = roomPrice * roomQuantity;
		console.log(pricePerNight);

    this.setState({
      currentRoomPrice: roomPrice,
      pricePerNight: pricePerNight
    });
	}

	calculateTotalPrice() {
		const {pricePerNight, checkInDate, checkOutDate} = this.state;
		let a = moment(checkInDate);
		let b = moment(checkOutDate);
		let totalDays = b.diff(a, "days");
		let totalPrice = totalDays * pricePerNight;
    console.log(totalPrice);
    return totalPrice
	}

	render() {
		const {
			name,
			address,
			details,
			image,
			rating,

		} = this.state.hotel.data;
		const {
			hotel,
			start_date,
      end_date,
			roomQuantity,
      roomType,
			pricePerNight
		} = this.state;

		return (
			<Grid centered celled columns={2}>
				<Grid.Row>insert carousel</Grid.Row>
				<Grid.Row width={13} centered columns={3}>
					<Grid.Column width={8}>
						<Segment textAlign="left" padded="very">
							<Container textAlign="left">
								<Header as="h2">{name}</Header>
								<p>
									{address.street}
									<br />
									{address.city}, {address.state} {address.country}
								</p>
								<p>{details}</p>
							</Container>
						</Segment>
					</Grid.Column>
					<Grid.Column width={4}>
						<Segment padded="very">
							<Container textAlign="center">
								<Header as="h3">${pricePerNight} / night</Header>
								<Rating
									disabled
									icon="star"
									defaultRating={rating}
									maxRating={5}
								/>
								<br />
								<Divider />
								<br />
								<p>
									Check In/Out Date:
									<CheckInOutCalendar
										onChange={this.handleCheckInOut.bind(this)}
										value={this.state.datesRange}
									/>
								</p>
								<p>
									Room Type/Quantity:
									<br />
									<RoomTypeSelect
										onChange={this.handleRoomTypeQuantity.bind(this)}
										defaultValue={roomType}
									/>
									<RoomQuantitySelect
										onChange={this.handleRoomTypeQuantity.bind(this)}
										defaultValue={roomQuantity}
									/>
								</p>
								<br />
								<Divider />
								<br />
								<CheckOut hotel={hotel} reservation={{
                  room_types: roomType,
                  roomQuantity,
                  start_date,
                  price: this.calculateTotalPrice(),
                  end_date,
                }} />
							</Container>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default HotelPage;
