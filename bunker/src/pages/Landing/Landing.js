import React from 'react';
import Background from '../../images/LandingBackground.jpg';
import BunkerImage from '../../images/bunkertransparent.png';
import {Form, Select} from 'semantic-ui-react';


import * as ROUTES from '../../constants/routes';
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import * as moment from "moment";
import { DateInput } from "semantic-ui-calendar-react";


const today=moment().format('MM-DD-YYYY');
const tommorrow=moment().add(1,'days').format('MM-DD-YYYY');

class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dateIn:'',
            dateOut:'',
            maxCheckIn: '',
            minCheckout:tommorrow,
        }
    }
    handleCheckInDate=(event,{name,value})=>{

        let parts=value.split("-");
        let dt=new Date(parseInt(parts[2]),parseInt(parts[0]-1),parseInt(parts[1]));
        //if(value.length>=10 && dt<new Date()){
        //  window.alert("The Earliest CheckInDate is today, please choose from calendar")
        //  }
        //  else{

        let date=moment(dt).add(1,'days').format('MM-DD-YYYY');
        console.log(date);
        //let date1=moment(dt2).add(120,'days').format('MM-DD-YYYY');
        if(this.state.hasOwnProperty(name)){
            console.log("good1")
            this.setState({[name]:value,minCheckout:date});
        }
        //}
    }
    handleCheckOutDate=(event,{name,value})=>{
        console.log("good2");
        let parts=value.split("-");
        let dt=new Date(parseInt(parts[2]),parseInt(parts[0]-1),parseInt(parts[1]));
        //  if(value.length>=10 && dt<=new Date()){
        //  window.alert("The Earliest CheckOutDate is tommorrow, please choose from calendar");
        //  }
        //  else{
        let date=moment(dt).subtract(1,'days').format('MM-DD-YYYY');
        //let date1=today;
        //  if(moment(dt).subtract(120,'days')>moment()){
        //date1=moment(dt).subtract(120,'days').format('MM-DD-YYYY');
        //  }
        if(this.state.hasOwnProperty(name)){
            console.log("good3");
            this.setState({[name]:value,maxCheckIn:date});
        }
        //}

    }

    onClick = () => {
        const hotel = [{
            name: "1",
            location: "Dsadas",
            image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
            address:"1111",
            price:"222"
        },
            {
                name: "2",
                location: "123",
                image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                address:"1111",
                price:"222"
            },
            {
                name: "3",
                location: "123",
                image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                address:"1111",
                price:"222"
            },
            {
                name: "4",
                location: "123",
                image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                address:"1111",
                price:"222"
            },
            {
                name: "5",
                location: "123",
                image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                address:"1111",
                price:"222"
            },
            {
                name: "6",
                location: "123",
                image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                address:"1111",
                price:"222"
            },
            {
                name: "7",
                location: "123",
                image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                address:"1111",
                price:"222"
            },
            {
                name: "8",
                location: "123",
                image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                address:"1111",
                price:"222"
            },
            {
                name: "9",
                location: "123",
                image: "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                address:"1111",
                price:"222"
            },
            ]
        // this.props.firebase.hotelFilter(this.state.location)
    // .then( (hotels) =>{
        this.props.history.push({
            pathname: ROUTES.HOME,
             state: {
                hotels: hotel,

             }
        })
    // });
    }

    render() {
        return(
  <div style={backgroundStyle}>
      <div style={bunkerStyle}>
          <img src={BunkerImage} width="300" height="300" />
      </div>
      <div style={boxStyle}>
          <div style={introDiv}>
              <h1 style={introD}>Start Your Wonderful Trip With Bunker</h1>
          </div>
          <Form>
              <div style={Place}>
                  <Form.Field>
                      <label> WHERE</label>
                      <input placeholder="Anywhere" />
                  </Form.Field>
              </div>

              <div style={InOutDiv}>
                  <div style={CheckIn}>
                      {/*<Form.Field size = "medium">*/}
                          {/*<label>CHECK IN</label>*/}
                          {/*<input placeholder="Check In Date" />*/}
                      {/*</Form.Field>*/}
                      <div>CheckInDate</div><DateInput name="dateIn"  minDate={today} maxDate={this.state.maxCheckIn} dateFormat="MM-DD-YYYY" onChange={this.handleCheckInDate} value={this.state.dateIn} icon="bullhorn" iconPosition="left" placeholder="MM-DD-YYYY"/>
                  </div>
                  <div style={CheckOut}>
                      <div>CheckOutDate</div>
                      <DateInput name="dateOut"  minDate={this.state.minCheckout} dateFormat="MM-DD-YYYY" onChange={this.handleCheckOutDate} value={this.state.dateOut} icon="paper plane" iconPosition="left" placeholder="MM-DD-YYYY"/>
                      {/*<Form.Field size = "medium">*/}
                          {/*<label>CHECK OUT</label>*/}
                          {/*<input placeholder="Check Out Date" type="text"/>*/}
                      {/*</Form.Field >*/}
                  </div>
                </div>

              <div style={Guests}>
                  <Form.Field size = "medium">
                      <label>GUESTS</label>
                      {/*<input placeholder="Guests" />*/}
                      <GuestNum />
                  </Form.Field>
              </div>
              <div style={buttonDiv}>
                  <Form.Button onClick={this.onClick}>Submit</Form.Button>
              </div>
          </Form>
      </div>
  </div>
);
}}
const GuestNum = () => {
    let Guests = [];
    for (var i = 1; i < 6; i++) {
        let obj = {
            key: i,
            text: i,
            value: i
        };
        Guests.push(obj);
    }
    return (
        <Select icon="user" iconPosition="left" options={Guests} />
    );
}
const bunkerStyle = {
    margin: "auto",
    width: "300px",
    height: "300px",
};
const introDiv = {
    margin:"20px auto 0 auto ",
    width:"360px",
    height: "70px",
}
const introD = {
    width:"360px",
    height: "70px",
    fontcolor:"grey",
}
const Place = {
    margin:"20px auto 0 auto ",
    width:"360px",
};
const InOutDiv = {
    width:"360px",
    margin:"20px auto 0 auto ",
    height: "60px",
}
const CheckIn = {
    float:'left',
    width:"180px",
};
const CheckOut = {
    float:'left',
    width:"180px",
};
const Guests = {
    margin:"20px auto 0 auto ",
    width:"360px",
};
const buttonDiv = {
    margin:"20px auto 0 auto ",
    width:"360px"
};

const boxStyle = {
    margin: "0 auto 50px auto",
    // padding-left:'auto'
    // padding-right:'auto'
    border: '5px solid white',
    borderRadius:"5px",
    width: '500px',
    height: '429px',
    backgroundColor: 'white',
    backgroundRepeat:'',
    position:'center'
};

const backgroundStyle = {
    // width: "100%",
    // height: "100%",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "null",
    backgroundSize: 'cover',
    overflow: 'hidden',
};

export default Landing;
