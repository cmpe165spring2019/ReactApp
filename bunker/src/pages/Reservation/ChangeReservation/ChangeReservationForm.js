import React, {Component} from "react";
import {
    Icon,
    Card,
    Image,
    Button,
    Table,
    Grid,
    Input,
    Header, Select, Dropdown,
} from 'semantic-ui-react';
import * as moment from "moment";
import { DatesRangeInput,DateInput } from "semantic-ui-calendar-react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

const today=moment().format('MM-DD-YYYY');
const tomorrow=moment().add(1,'days').format('MM-DD-YYYY');
const aWeekFromToday = moment().add(5, 'days').format('MM-DD-YYYY');
const defaultDateRangeArray = [today, aWeekFromToday];
const defaultDateRange = defaultDateRangeArray.join(" - ");



class ChangeReservationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newReservation: {
                start_date: props.oldReservation.data.start_date,
                end_date: props.oldReservation.data.end_date,
                room_types: props.oldReservation.data.room_types,
                roomQuantity: props.oldReservation.data.roomQuantity,
                datesRange:props.oldReservation.data.datesRange,
            },
            isUpdated:false
            // datesRange:[this.state.newReservation.start_date, this.state.newReservation.end_date],
        }

        this.handleRoomType = this.handleRoomType.bind(this);
    }






    // handleCheckInOut=(event,{name,value})=>{
    //
    //     //parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
    //     if(value.length > 13) {
    //         const tempa = value.split(" - ")
    //         let checkInDate = new Date(tempa[0]).getTime();
    //         let checkOutDate = new Date(tempa[1]).getTime();
    //
    //
    //         this.setState({
    //             newReservation: {
    //                 start_date: checkInDate,
    //                 end_date: checkOutDate
    //             }
    //         });
    //     }
    //
    // }
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

    handleRoomType = (event,{name,value}) =>{
        console.log("name: " + name + " value: " + value);
        const {newReservation} = this.state;
        this.props.setIsEditable(false);
        this.setState({
            newReservation:{
                ...newReservation,
                room_types: value,
            },
            isUpdated:true,
        });
        // console.log('new type: '+ this.state.newReservation.room_types)
        // alert(this.state.newReservation.room_types)
    }

    handleRoomQuantityOptions = (event,{name,value}) =>{
        // console.log("name: " + name + " value: " + value);
        const {newReservation} = this.state;
        this.props.setIsEditable(false);
        this.setState({
            newReservation:{
                ...newReservation,
                roomQuantity: value,
            },
            isUpdated:true,
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
        this.props.setIsEditable(false);
        this.setState({
            newReservation:{
                ...newReservation,
                start_date: date[0].getTime(),
                end_date: date[1].getTime(),
            },
            isUpdated:true,
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
  //  const datesRange = [new Date().setDate(new Date().getDate()-1), new Date()];
    console.log(this.state.newReservation.start_date);
    return (
        <div>

             <Card color="purple">

             <Card.Content>
             <Grid>
             <h1><i>Changes.....</i></h1>



            {/*<Button onClick={(event) => {const newdat = Date.now(); setNewReservationData({end_date : Number(newdat)})}}/>*/}


                <Grid.Row columns={3}>

                    <h3>
                        <Icon name="suitcase" size="big"/>
                    </h3>

                    <Card.Content extra>

                    <DateRangePicker
                       // name="dates"
                       minDate={new Date()}
                       value={datesRange}
                       onChange={this.handleDate}

                   />



                     </Card.Content>



</Grid.Row>

                <Grid.Row>

                    <Icon name="bed" size="big"/>


                    <Select fluid
                        name="roomType"
                        placeholder=''
                        options={roomTypeOptions}
                        onChange={this.handleRoomType.bind(this)}
                        defaultValue={this.state.newReservation.room_types}
                    />

                </Grid.Row>
                <Grid.Row columns={3}>
                     <Grid.Column>
                      <Icon name="x" size="big"/>

                    </Grid.Column>
                    <Card.Description>
                    <Dropdown fluid
                        compact
                        selection
                        name="roomQuantity"
                        placeholder=''
                        options={roomQuantityOptions}
                        onChange={this.handleRoomQuantityOptions}
                        defaultValue={parseInt(this.state.newReservation.roomQuantity)}

                    />
                     </Card.Description>
                </Grid.Row>

                <Grid.Row>
                { this.state.isUpdated ? (
                  <Button color="violet" active onClick={(event) => {this.props.setNewReservationData(this.state.newReservation);this.props.setIsEditable(true);this.setState({isUpdated:false})}}>Confirm Changes</Button>
                ) : (
                  <Button color="violet" disabled onClick={(event) => {this.props.setNewReservationData(this.state.newReservation);this.props.setIsEditable(true)}}>Confirm Changes</Button>
                )
              }

                </Grid.Row>
</Grid>
              </Card.Content>

            </Card>

        </div>
    );
}
};

export default ChangeReservationForm;
