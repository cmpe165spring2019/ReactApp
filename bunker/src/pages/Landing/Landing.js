import React from 'react';
import Background from '../../images/LandingBackground.jpg';
// import BunkerImage from '../../images/bunkertransparent.png';
import {Form, Select,Dropdown, Container} from 'semantic-ui-react';
import RoomTypeSelect from '../../commonComponents/RoomTypeSelect';
import RoomQuantitySelect from '../../commonComponents/RoomQuantitySelect';
import CheckInOutCalendar from '../../commonComponents/CheckInOutCalendar'
import {withFirebase} from '../../server/Firebase' ;
// import BunkerImage from '../../../public/bunkertransparent.png';


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
            i : 0,
            maintxt :'Decentralized Certificates on the Ethereum Blockchain',
            speed : 100,
            displaytxt: '',
            tmpTitle: 'Start your trip with Bunker!   ',
            fullTitle: 'Start your trip with Bunker!',
            j: 0

        }
        const spinner = document.getElementById('spinner');

        if (spinner && !spinner.hasAttribute('hidden')) {
            spinner.setAttribute('hidden', 'true');
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

    componentDidMount() {
        this.timeout = setInterval(() => {
            if (this.state.i < this.state.maintxt.length) {
                let newI = this.state.i+1;
                this.setState({ i: newI });
            }
            //     else{
            //         console.log("eh");
            //           this.setState({i:0});
            // }
        }, 50);
        this.timeout = setInterval(() => {
            if(this.state.j < this.state.tmpTitle.length){
                let newJ = this.state.j+1;
                this.setState({ j: newJ });
            }
            //     else{
            //         console.log("eh");
            //           this.setState({i:0});
            // }
        }, 65);
    }
    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    goTo(event){
        var destination = event.target.value;
        this.props.history.push(`/${destination}`);
    }

    render() {
        let displaytext = this.state.maintxt.substring(0,this.state.i);
        let displayTitle ='';
        if(this.state.j >= this.state.tmpTitle.length){
            displayTitle = this.state.fullTitle;
        }else{
            displayTitle = this.state.tmpTitle.substring(0,this.state.j);
        }
        return(
  <div style={backgroundStyle}>
      <div style={bunkerStyle}>
          {/*<img src={BunkerImage} width="300" height="300" />*/}
      </div>
      <div style={boxStyle}>
          <div style={introDiv}>
              <h1 style={introD}>{displayTitle}</h1>
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
    height: "200px",
};
const introDiv = {
    margin:"20px auto 0 auto ",
    width:"360px",
    height: "70px",
    // color: 'white'
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
    position:'center',
    opacity: '0.95'
};

const backgroundStyle = {
    // width: "100%",
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "null",
    backgroundSize: 'cover',
    overflow: 'hidden',

};

export default withFirebase(Landing);
