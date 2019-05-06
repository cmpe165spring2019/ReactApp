import React from 'react';
import Background from '../../images/LandingBackground.jpg';
import {Form, Select,Dropdown, Image, Segment} from 'semantic-ui-react';
import CheckInOutCalendar from '../../commonComponents/CheckInOutCalendar'
import {withFirebase} from '../../server/Firebase' ;


import * as ROUTES from '../../constants/routes';
import * as moment from "moment";
import BunkerImage from '../../images/bunker.png';



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
      </div>
      <div style={boxStyle}>
      <div style={image}>
      <Image src={BunkerImage} circular wrapped size="medium" centered></Image>
      </div>
          <div style={introDiv}>

              <h1>{displayTitle}</h1>
          </div>
          <Form>
              <div style={Place}>
                  <Form.Field>
                      <p><b>Location:</b></p>
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
              <p><b>Check In/Out: </b></p>
                  
                  <CheckInOutCalendar
                  onChange={this.onChange}
                  value={this.state.datesRange}
                  />
                  
                </div>
              <div style={buttonDiv}>
              <br></br>
              <p>
                  <Form.Button primary onClick={this.onClick}>Submit</Form.Button>
                  </p>
              </div>
          </Form>



          

      </div>
      {/* <Segment attached='bottom'>
          <Image src={BunkerImage} wrapped size="small" centered></Image>
          </Segment> */}
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
    height: "15%",
};
const introDiv = {
    margin:"20px auto 0 auto ",
    width:"360px",
    height: "70px",
    // color: 'white'
}
// const introD = {
//     width:"360px",
//     height: "70px",
//     fontcolor:"grey",
// }
const Place = {
    margin:"0px auto 0 auto ",
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
    margin:"-46px 0px 0 340px ",
    width:"360px"
};

const image = {
        display: "block",
margin: '50px auto 0 auto',
        width: "50%"
      
}

const boxStyle = {
    margin: "15px auto 0px auto",
    // padding-left:'auto'
    // padding-right:'auto'
    border: '5px solid white',
    borderRadius:"5px",
    width: '500px',
    height: '450px',
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
