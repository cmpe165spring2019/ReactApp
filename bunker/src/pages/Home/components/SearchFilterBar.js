// This component contains the search bar with filters for users to narrow down their search based on date, guests, price, location, stars

import React, { Component } from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message,
    Card,
    Divider,
    Image,
    Select,
    Dropdown
} from "semantic-ui-react";
import {withFirebase} from '../../../server/Firebase/';
import { DateInput } from "semantic-ui-calendar-react";
import Logo from '../../../images/linkedin_banner_image_1.png';
import * as moment from 'moment';


const today=moment().format('MM-DD-YYYY');
const tommorrow=moment().add(1,'days').format('MM-DD-YYYY');
//const date3=moment().add(180,'days').format('MM-DD-YYYY');
//const date4=moment().add(120,'days').format('MM-DD-YYYY');
//const date5=moment().add(300,'days').format('MM-DD-YYYY');


class SearchFilterBar extends Component {
    constructor(props) {
        super(props);
          console.log(this.props.firebase.getCities());
          this.state={
            dateIn:'',
            dateOut:'',
            maxCheckIn: '',
            minCheckout:tommorrow,
            locations:[],

    }
    // for (var i = 0; i < this.props.firebase.getCities().length; i++) {
    //     let obj = {
    //         key: this.props.firebase.getCities()[i],
    //         text: this.props.firebase.getCities()[i],
    //         value: this.props.firebase.getCities()[i]
    //     };
    //     this.state.locations.push(obj);
    // }

  }


    componentDidMount() {
        this.setState({loading: true});
        this._asyncRequest = this.props.firebase.getCities().then(externalData => {
            this._asyncRequest = null;
            this.setState({locations: externalData});
        });


    }

    componentWillUnmount() {
        // if (this._asyncRequest) {
        //     this._asyncRequest.cancel();
        // }
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

    render() {
        const { email, password, locations, error} = this.state;

        const isInvalid = password === "" || email === "";
        const countryOptions = this.state.locations.map((location) =>
        ({
          key: location.data.city,
          text: `${location.data.city} , ${location.data.country}`,
          value: location.data.city,
        })
      );

        return (

            <Grid>
                <Grid.Column width={3} centered>
                    </Grid.Column>

                    <Grid.Column width={10}>

                          <Dropdown search selection fluid options={countryOptions} placeholder="City, Adress, Zip code..."/>
                        <Grid>
                        <Grid.Row></Grid.Row>
                        <Grid.Row columns={5}>
                        <Grid.Column>
                        <div>Check-In</div><DateInput name="dateIn"  minDate={today} maxDate={this.state.maxCheckIn} dateFormat="MM-DD-YYYY" onChange={this.handleCheckInDate} value={this.state.dateIn} icon="bullhorn" iconPosition="left" placeholder="MM-DD-YYYY"/>
                            </Grid.Column>
                            <Grid.Column>

                        <div>Check-Out</div><DateInput name="dateOut"  minDate={this.state.minCheckout} dateFormat="MM-DD-YYYY" onChange={this.handleCheckOutDate} value={this.state.dateOut} icon="paper plane" iconPosition="left" placeholder="MM-DD-YYYY"/>
                        </Grid.Column>

                            <Grid.Column>
                            <div>Number of Guests</div><GuestNum />
                            </Grid.Column>

                            <Grid.Column>
                            <div>Star Level</div><Stars /></Grid.Column>

                            <Grid.Column>
                            <div>Price Range</div><PriceRange />
                            </Grid.Column></Grid.Row></Grid>

                    </Grid.Column>

                    <Grid.Column width={3}>
                    <Button>Apply & Search</Button>
                    </Grid.Column>
                </Grid>
            );
        }
    }


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


const Stars = () => {
    let Star = [];
    for (var i = 0; i < 7; i++) {
        let obj = {
            key: i,
            text: i,
            value: i
        };
        Star.push(obj);
    }
    return (
        <Select icon="star" iconPosition="left" options={Star} />
    );
}

const PriceRange = () => {
    let PriceR=[];
var i=0;
while(i<700){
  let obj={
    key:i+'--'+(i+100),
    text:i+'--'+(i+100),
    value:i+'--'+(i+100)
  };i=i+100;
  PriceR.push(obj);
}

return (
    <Select icon="dollar sign" iconPosition="left" options={PriceR} />
);
}
export default withFirebase(SearchFilterBar);
