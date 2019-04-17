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
import { DatesRangeInput } from "semantic-ui-calendar-react";

const today=moment().format('MM-DD-YYYY');
const tomorrow=moment().add(1,'days').format('MM-DD-YYYY');
const aWeekFromToday = moment().add(5, 'days').format('MM-DD-YYYY');
const defaultDateRangeArray = [today, aWeekFromToday];
const defaultDateRange = defaultDateRangeArray.join(" - ");



class CancelReservationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newReservation: {
                start_date: props.oldReservation.data.start_date,
                end_date: props.oldReservation.data.end_date,
                room_types: props.oldReservation.data.room_types,
                roomQuantity: props.oldReservation.data.roomQuantity,
            }
        }
    }





    handleCheckInOut=(event,{name,value})=>{

        //parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
        if(value.length > 13) {
            const tempa = value.split(" - ")
            let checkInDate = new Date(tempa[0]).getTime();
            let checkOutDate = new Date(tempa[1]).getTime();


            this.setState({
                newReservation: {
                    start_date: checkInDate,
                    end_date: checkOutDate
                }
            });
        }

    }
    // handleCheckInOut=(event,{name,value})=>{
    //     //   console.log("name: " + name + " value: " + value);
    //     if(this.state.hasOwnProperty(name)){
    //         this.setState({[name]:value});
    //     }
    //
    //     //parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
    //     if(value.length > 13){
    //         let parsedValue = value.split(" ");
    //         let checkInString = parsedValue[0];
    //         let checkOutString = parsedValue[2];
    //         let checkInArray = checkInString.split("-");
    //         let checkOutArray = checkOutString.split("-");
    //         let checkInDate = new Date(
    //             parseInt(checkInArray[2]),
    //             parseInt(checkInArray[0]-1),
    //             parseInt(checkInArray[1])
    //         );
    //         let checkOutDate = new Date(
    //             parseInt(checkOutArray[2]),
    //             parseInt(checkOutArray[0]-1),
    //             parseInt(checkOutArray[1])
    //         );
    //         this.setState({
    //                         newReservation: {
    //                             start_date: checkInDate,
    //                             end_date: checkOutDate
    //                         }
    //         });
    //
    //         // console.log("check in :" + checkInDate + " check out: " + checkOutDate);
    //     }
    // }

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

    // updateCalendar = (event, {name, value}) =>{
    //
    //     setNewRes(updateRes);

    // }
    const dateRange = moment(this.state.newReservation.start_date).format('MM-DD-YYYY') + " - " +
        moment(this.state.newReservation.end_date).format('MM-DD-YYYY');
    return (
        <div>
            <Header>Edit Reservation</Header>
            {/*<Button onClick={(event) => {const newdat = Date.now(); setNewReservationData({end_date : Number(newdat)})}}/>*/}
            <Grid>
                <Grid.Row>
                    <div>
                        Check In/Out:
                    </div>

                    <DatesRangeInput
                        name="datesRange"
                        minDate={today}

                        dateFormat="MM-DD-YYYY"
                        onChange={this.handleCheckInOut}
                        icon="bullhorn"
                        iconPosition="left"
                        placeholder="From - To"
                    />
                    {/*<p>{oldReservation.data.start_date}</p>*/}
                    {/*{setNewReservationData({start_date: 123123,end_date:13123,room_types:{type: 'single', quantity: }})}*/}
                </Grid.Row>
                <Grid.Row>
                    <div>Room Type:</div>
                    <Select
                        name="roomType"
                        placeholder=''
                        options={roomTypeOptions}
                        // onChange={this.props.handleRoomType}
                        defaultValue={this.state.newReservation.room_types}
                    />
                </Grid.Row>
                <Grid.Row>
                    <div>Quantity:</div>
                    <Dropdown
                        compact
                        selection
                        name="roomQuantity"
                        placeholder=''
                        options={roomQuantityOptions}
                        // onChange={handleRoomType}
                        text={this.state.newReservation.roomQuantity}
                    />
                </Grid.Row>
            </Grid>
        </div>
    );
}
};

export default CancelReservationForm;
