import React from 'react';
import Background from '../../images/LandingBackground.jpg';
import BunkerImage from '../../images/bunkertransparent.png';
import {Form, Select,Dropdown, Container} from 'semantic-ui-react';
import RoomTypeSelect from '../../commonComponents/RoomTypeSelect';
import RoomQuantitySelect from '../../commonComponents/RoomQuantitySelect';
import CheckInOutCalendar from '../../commonComponents/CheckInOutCalendar'
import {withFirebase} from '../../server/Firebase' ;


import * as ROUTES from '../../constants/routes';
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import * as moment from "moment";
import { DateInput } from "semantic-ui-calendar-react";


const today=moment().format('MM-DD-YYYY');
const fivedayfromtoday=moment().add(5,'days').format('MM-DD-YYYY');

class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location: {},
            roomType:'',
            roomQuantity: 0,
            datesRange: '',
            locationOptions: '',

        }
    }
    componentDidMount(){
      this.setState({
        roomType: 'single',
        roomQuantity: 1,
        datesRange: today + " - " + fivedayfromtoday
      })

      this.props.firebase.getCities().then(locationData => {
      	locationData.sort((a, b) => {
      		if (a.data.city.toLowerCase() > b.data.city.toLowerCase()) {
      			return 1;
      		} else {
      			return -1;
      		}
      	});

      	const locationOptions = locationData.map(location => ({
      		key: location.data.city,
      		text: `${location.data.city} , ${location.data.state}, ${
      			location.data.country
      		}`,
      		value: location
      	}));

      	this.setState({locationOptions: locationOptions});
      });

    }

    onChange = (event, {name, value}) =>{
      this.setState({[name]: value})
    }

    onClick = () => {
        const {location, roomType, roomQuantity, datesRange} = this.state;
        const locationID = location.id;

        this.props.history.push({
            pathname: ROUTES.HOME,
            state: {
              locationID,
              roomType,
              roomQuantity,
              datesRange,
            }
        })
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
                      <Dropdown
                          search selection
                                      name='location'
                                      options={this.state.locationOptions}
                                      placeholder="City, Adress, Zip code..."
                                      onChange={this.onChange}
                                      onSearchChange={this.onChange}
                                      onLabelClick={this.onChange}
                              />
                  </Form.Field>
              </div>

              <div style={InOutDiv}>
                  <div>Check In/Out</div>
                  <CheckInOutCalendar
                  onChange={this.onChange}
                  value={this.state.datesRange}
                  />
                </div>

              <div style={Guests}>
                  <Form.Field size = "medium">
                      <Container fluid>
                      <div>Room Type/Quantity:</div>
                      <RoomTypeSelect
                      defaultValue={'single'}
                      onChange={this.onChange}
                      />
                      <RoomQuantitySelect
                      defaultValue={1}
                      onChange={this.onChange}
                      /></Container>
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

export default withFirebase(Landing);
