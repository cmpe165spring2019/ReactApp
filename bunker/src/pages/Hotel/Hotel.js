import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import{DateInput}from 'semantic-ui-calendar-react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../server/Session';
import { withFirebase } from '../../server/Firebase';
import * as ROUTES from "../../constants/routes";
import {
    Button,
} from 'semantic-ui-react';
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import * as moment from "moment";
import CheckOut from '../CheckOut/CheckOut';

// const hotel = [{
//     name: "1",
//     location: "Dsadas",
//     image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
//     address:"1111",
//     price:"222"
// }]
const today = moment().format("MM-DD-YYYY");
const tommorrow = moment()
    .add(1, "days")
    .format("MM-DD-YYYY");

class HotelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.location.state,
            dateIn: "",
            dateOut: "",
            maxCheckIn: "",
            minCheckout: tommorrow,
            openPayment: false,
            reservation:{
                room_types: [
                    {
                        type:"single",
                        number:3,
                    },
                    {
                        type:"double",
                        number:3,
                    },
                ],
                price: 100,
            }
        }
    }

    handleCheckInDate = (event, { name, value }) => {
        let parts = value.split("-");
        let dt = new Date(
            parseInt(parts[2]),
            parseInt(parts[0] - 1),
            parseInt(parts[1])
        );
        //if(value.length>=10 && dt<new Date()){
        //  window.alert("The Earliest CheckInDate is today, please choose from calendar")
        //  }
        //  else{

        let date = moment(dt)
            .add(1, "days")
            .format("MM-DD-YYYY");
        console.log(date);
        //let date1=moment(dt2).add(120,'days').format('MM-DD-YYYY');
        if (this.state.hasOwnProperty(name)) {
            console.log("good1");
            this.setState({ [name]: value, minCheckout: date });
        }
        //}
    };

    handleCheckOutDate = (event, { name, value }) => {
        console.log("good2");
        let parts = value.split("-");
        let dt = new Date(
            parseInt(parts[2]),
            parseInt(parts[0] - 1),
            parseInt(parts[1])
        );
        //  if(value.length>=10 && dt<=new Date()){
        //  window.alert("The Earliest CheckOutDate is tommorrow, please choose from calendar");
        //  }
        //  else{
        let date = moment(dt)
            .subtract(1, "days")
            .format("MM-DD-YYYY");
        //let date1=today;
        //  if(moment(dt).subtract(120,'days')>moment()){
        //date1=moment(dt).subtract(120,'days').format('MM-DD-YYYY');
        //  }
        if (this.state.hasOwnProperty(name)) {
            console.log("good3");
            this.setState({ [name]: value, maxCheckIn: date });
        }
        //}
    };

    render() {
        return (

            <div>
                {/*<div><SearchFilterBar /></div>*/}
                <div style={imageDiv}>
                    <img src={this.state.hotel.image1} style={imageStyle}/>
                    <img src={this.state.hotel.image2} style={imageStyle1}/>
                    <img src={this.state.hotel.image3} style={imageStyle1}/>
                    <img src={this.state.hotel.image4} style={imageStyle1}/>
                    <img src={this.state.hotel.image5} style={imageStyle1}/>
                </div>
                <div style={hotelDiv}>
                    <div style={leftDiv}>
                        <div style={hotelNameDiv}>
                            <h1 style={hotelName}>{this.state.hotel.data.name}</h1>
                        </div>
                        <div style={locationDiv}>
                            <h3 >{this.state.hotel.data.city}, {this.state.hotel.data.country}</h3>
                        </div>

                        <div style={priceDiv}>
                            <h2 >${this.state.hotel.price}/Night</h2>
                        </div>
                        <div style={detail}>
                            <h2 >{this.state.hotel.data.details}</h2>
                        </div>
                    </div>
                    <div style={rightDiv}>
                        <div style={checkIn}>
                            <div><h4>CheckInDate</h4></div>
                            <DateInput
                                name="dateIn"
                                minDate={today}
                                maxDate={this.state.maxCheckIn}
                                dateFormat="MM-DD-YYYY"
                                onChange={this.handleCheckInDate}
                                value={this.state.dateIn}
                                icon="bullhorn"
                                iconPosition="left"
                                placeholder="MM-DD-YYYY"
                            />
                        </div>
                        <div style={checkOut}>
                            <div><h4>CheckOutDate</h4></div>
                            <DateInput
                                name="dateOut"
                                minDate={this.state.minCheckout}
                                dateFormat="MM-DD-YYYY"
                                onChange={this.handleCheckOutDate}
                                value={this.state.dateOut}
                                icon="paper plane"
                                iconPosition="left"
                                placeholder="MM-DD-YYYY"
                            />
                        </div>
                        <div style={bookDiv1}>
                            <h3>Book Now</h3>
                            <Button color="green" size="small" width="70px" onClick={() => this.setState({openPayment: !this.state.openPayment})}>Book now</Button>
                            <CheckOut open={this.state.openPayment} handleClose={() =>this.setState({openPayment: !this.state.openPayment})} hotel={this.state.hotel} reservation={this.state.reservation}/>
                        </div>
                    </div>
                    <div style={googleMapDiv}>
                        <img src={"https://beta.techcrunch.com/wp-content/uploads/2013/05/sf-search-results.png"} style={googleMap}/>
                    </div>
                </div>

                <div style={bookDiv2}>
                    <table className="ui celled table">
                        <thead className="">
                        <tr className="">
                            <th className="">Room Type</th>
                            <th className="">Guest Capacity</th>
                            <th className="">Total Price</th>
                            <th className="">Book Now</th>

                        </tr>
                        </thead>
                        <tbody className="">
                        <tr className="">
                            <td className="">One bed Room</td>
                            <td className="">{this.state.hotel.oneBedCap}</td>
                            <td className="">${this.state.hotel.oneBedPrice}/Night</td>
                            <td className=""><Button color="green" size="small" >Book</Button></td>
                        </tr>
                        <tr className="">
                            <td className="">Two Bed Room</td>
                            <td className="">{this.state.hotel.twoBesCap}</td>
                            <td className="">${this.state.hotel.twoBedPrice}/Night</td>
                            <td className=""><Button color="green" size="small" >Book</Button></td>
                        </tr>
                        <tr className="">
                            <td className="">Luxury Room</td>
                            <td className="">{this.state.hotel.LuxuryCap}</td>
                            <td className="">${this.state.hotel.LuxuryPrice}/Night</td>
                            <td className=""><Button color="green" size="small" >Book</Button></td>
                        </tr>
                        </tbody>
                        <tfoot className="">
                        </tfoot>
                    </table>
                </div>

            </div>
        )
    }
}
const imageDiv = {
    width:"100%",
    height:"400px",
    margin:"0 auto"
};

const imageStyle = {
    width:"50%",
    height:"400px",
    float:"left",
    border: '1px solid black'
};
const imageStyle1 = {
    width:"25%",
    height:"200px",
    float:"left",
    border: '1px solid black'
};
const hotelDiv = {
    width:"100%",
    height:"300px"
}
const leftDiv={
    margin:"20px 0 0 100px",
    float:"left",
    width:"25%",
    height:"300px"
};
const rightDiv={
    margin:"20px 0 0 100px",
    float:"left",
    width:"20%",
    height:"300px"
}
const googleMapDiv={
    margin:"20px 0 0 0",
    float:"left",
    width:"30%",
    height:"300px"
}
const googleMap={
    width:"100%",
    height:"300px",
}
const hotelName = {

    clear:"both"
}
const hotelNameDiv={
    clear:"both",
}
const locationDiv={
    margin: "20px 0 0 0",
}
const priceDiv={
    margin: "20px 0 0 0",
}
const detail={
    margin: "20px 0 0 0",
}
const checkIn={
    margin:"20px 0 0 0"
}
const checkOut={
    margin:"20px 0 0 0"
}
const bookDiv1={
    margin: "20px 0 0 0",
}
const bookDiv2={
    clear:"both",
    margin: "50px 0 0 0",
    width:"100%",
    height:"300px"
}

export default withRouter(HotelPage);
