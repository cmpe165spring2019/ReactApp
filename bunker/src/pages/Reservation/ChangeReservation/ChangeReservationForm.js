import React, {Component} from "react";
import {
    Image,
    Button,
    Table,
    Grid,
    Input,
    Header, Select, Dropdown,
} from 'semantic-ui-react';
import * as moment from "moment";
// import { DatesRangeInput,DateInput } from "semantic-ui-calendar-react";
// import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import CheckInOutCalendar from '../../../commonComponents/CheckInOutCalendar';
import RoomTypeSelect from "../../../commonComponents/RoomTypeSelect";
import RoomQuantitySelect from "../../../commonComponents/Navigation/RoomQuantitySelect";

// const today=moment().format('MM-DD-YYYY');
// const tomorrow=moment().add(1,'days').format('MM-DD-YYYY');
// const aWeekFromToday = moment().add(5, 'days').format('MM-DD-YYYY');
// const defaultDateRangeArray = [today, aWeekFromToday];
// const defaultDateRange = defaultDateRangeArray.join(" - ");



class ChangeReservationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newReservation: {},
        }

        this.handleRoomType = this.handleRoomType.bind(this);
    }

    componentDidMount() {
        this.setState({
            newReservation: {
                start_date: this.props.oldReservation.data.start_date,
                end_date: this.props.oldReservation.data.end_date,
                room_types: this.props.oldReservation.data.room_types,
                roomQuantity: this.props.oldReservation.data.roomQuantity,
                datesRange: this.props.oldReservation.data.datesRange || null
            }
        })
        console.log(this.state);
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    // handleRoomType = (event,{name,value}) =>{
    //     console.log("name: " + name + " value: " + value);
    //     const {newReservation} = this.state;
    //     this.setState({
    //         newReservation:{
    //             ...newReservation,
    //             room_types: value,
    //         }
    //     });
    // }

    handleRoomQuantityOptions = (event,{name,value}) =>{
        // console.log("name: " + name + " value: " + value);
        const {newReservation} = this.state;
        this.setState({
            newReservation:{
                ...newReservation,
                roomQuantity: value,
            }
        });
        console.log('new quantity: '+ this.state.newReservation.roomQuantity)
        // alert(this.state.newReservation.room_types)
    }


    // handleDate = (event) =>{
    //     console.log(event.target.value);
    // }

    handleDate = date => {
        // console.log(date[0]);
        const {newReservation} = this.state;
        this.setState({
            newReservation:{
                ...newReservation,
                start_date: date[0].getTime(),
                end_date: date[1].getTime(),
            }
        });

        // const dateRange = moment(this.state.newReservation.start_date).format('MM-DD-YYYY') + " - " +
        //     moment(this.state.newReservation.end_date).format('MM-DD-YYYY');
        // const start = moment(this.state.newReservation.start_date).format('MM-DD-YYYY')
        // console.log(start);
        // console.log(" + ")
        console.log(this.state.newReservation.start_date);
        const start = moment(this.state.newReservation.start_date).format('MM-DD-YYYY')
        const end = moment(this.state.newReservation.end_date).format('MM-DD-YYYY')
        console.log('is:'+start);
        console.log(this.state.newReservation.end_date);
        console.log('is:'+end);

        // this.setState({ date })
    }

    handleCheckInOut = (event, {name, value}) => {
		//set datesRange whenever calendar range is updated
		if (this.state.hasOwnProperty(name)) {
			this.setState({[name]: value}, () => {
				//parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
				this.parseDatesRange(value);
			});
		}
    };

    handleRoomTypeQuantity=(e, {name, value})=>{
        this.setState({
            newReservation: {
                ...this.state.newReservation,
                room_types: value
            }
        });
    }
    
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
        newReservation: {
            ...this.state.newReservation,
            start_date: checkInDate.getTime(),
            end_date: checkOutDate.getTime()
        },
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,

      });
		}
	};


    render()


{

    const roomTypeOptions = [
        {
            key: 'single',
            text: 'Single-Person',
            value: 'single'
        },
        {
            key: 'double',
            text: 'Double-Person',
            value: 'double'
        },
        {
            key: 'multiple',
            text: 'Multiple-Person',
            value: 'multiple'
        }
    ];

    const roomQuantityOptions = [];

    for(let i = 0; i < 17; i++){
        let obj = {
            key: i,
            text: i,
            value: i
        };
        roomQuantityOptions.push(obj);
    }


    // const dateRange = moment(this.state.newReservation.start_date).format('MM-DD-YYYY') + " - " +
    //     moment(this.state.newReservation.end_date).format('MM-DD-YYYY');


    const datesRange = [(this.state.newReservation.start_date), (this.state.newReservation.end_date)];

    return (
        <div>
            <Header>Edit Reservation</Header>
            {/*<Button onClick={(event) => {const newdat = Date.now(); setNewReservationData({end_date : Number(newdat)})}}/>*/}
            <Button onClick={(event) => {this.props.setNewReservationData(this.state.newReservation)}}>Submit</Button>
            <Grid>
                <Grid.Row>
                    <div>
                        Check In/Out:
                    </div>
                    <CheckInOutCalendar
                    onChange={this.handleCheckInOut.bind(this)}
                    value={this.state.newReservation.datesRange}
                    />
                </Grid.Row>
                <Grid.Row>
                    <div>Room Type:</div>
                    <RoomTypeSelect
                        onChange={this.handleRoomTypeQuantity.bind(this)}
                        defaultValue={this.state.newReservation.room_types}
                        />
                    {/* <Select
                        name="roomType"
                        placeholder=''
                        options={roomTypeOptions}
                        onChange={this.handleRoomType.bind(this)}
                        defaultValue={this.state.}
                    /> */}
                </Grid.Row>
                <Grid.Row>
                    <div>Quantity:</div>
                    {/* <Dropdown
                        compact
                        selection
                        name="roomQuantity"
                        placeholder=''
                        options={roomQuantityOptions}
                        onChange={this.handleRoomQuantityOptions}
                        defaultValue={parseInt(this.state.newReservation.roomQuantity)}

                    /> */}
                        <RoomQuantitySelect
                        onChange={this.handleRoomTypeQuantity.bind(this)}
                        defaultValue={this.state.newReservation.roomQuantity}
                        />
                </Grid.Row>
            </Grid>
        </div>
    );
}
};

export default ChangeReservationForm;
