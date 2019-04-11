import React from 'react';

// Components
import Background from '../../images/LandingBackground.jpg';
import BunkerImage from '../../images/bunkertransparent.png';
import {
    Form,
    Button,
    Grid,
    Select,
    Dropdown
} from "semantic-ui-react";
import { DateInput, DatesRangeInput } from "semantic-ui-calendar-react";


// Backend functionalities
import { withFirebase } from '../../server/Firebase/index';
import * as ROUTES from '../../constants/routes';
import * as moment from "moment";


const today=moment().format('MM-DD-YYYY');
const tommorrow=moment().add(1,'days').format('MM-DD-YYYY');

class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            locationOptions: [],
            datesRange: '',
            search: {
                location: {},
                roomType: '',
                roomQuantity: 0
            }
        }
    }

    componentDidMount(){
                //set initial values of checkIn/Out calendar
                const today=moment().format('MM-DD-YYYY');
                const aWeekFromToday = moment().add(5, 'days').format('MM-DD-YYYY');
                const defaultDateRangeArray = [today, aWeekFromToday];
                const defaultDateRange = defaultDateRangeArray.join(" - ");
                this.setState({
                    // datesRange: defaultDateRange
                });

        //get the search location options from firebase, set locationOptions
        this._asyncRequest = this.props.firebase.getCities()
            .then(locationData => {
            this._asyncRequest = null;
            locationData.sort((a,b)=>{
                if(a.data.city.toLowerCase() > b.data.city.toLowerCase()){
                    return 1
                }
                else{
                    return -1
                }
            });

            const locationOptions = locationData.map(
                (location) =>
                ({
                key: location.id,
                text: `${location.data.city} , ${location.data.state}, ${location.data.country}`,
                value: location
                })
            );
            this.setState({locationOptions: locationOptions});
            console.log(this.state.locationOptions);
        });

        // set default room options

        const roomOptions = [
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

          const roomQuantity = [];

          for(let i = 0; i < 16; i++){
              let obj = {
                  key: i,
                  text: i,
                  value: i
              };
              roomQuantity.push(obj);
          }

          this.setState({
            roomOptions: roomOptions,
            roomQuantity: roomQuantity
        });
    }

    handleCheckInOut=(event,{name,value})=>{
        //   console.log("name: " + name + " value: " + value);
            if(this.state.hasOwnProperty(name)){
                this.setState({[name]:value});
            }
    
            //parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
            if(value.length > 13){
                let parsedValue = value.split(" ");
                let checkInString = parsedValue[0];
                let checkOutString = parsedValue[2];
                let checkInArray = checkInString.split("-");
                let checkOutArray = checkOutString.split("-");
                let checkInDate = new Date(
                    parseInt(checkInArray[2]),
                    parseInt(checkInArray[0]-1),
                    parseInt(checkInArray[1])
                );
                let checkOutDate = new Date(
                    parseInt(checkOutArray[2]),
                    parseInt(checkOutArray[0]-1),
                    parseInt(checkOutArray[1])
                );
                this.setState({
                    search: {
                        ...this.state.search,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                    }
                });
    
                // console.log("check in :" + checkInDate + " check out: " + checkOutDate);
            }
          }

          handleRoomType=(e, {name, value})=>{
            this.setState({
                search: {
                    ...this.state.search,
                    [name]: value
                }
            });
            //Make pop up modal for guests
        }

        handleLocation=(e, {name,value})=>{
            // console.log(value);
            this.setState({
                search: {
                    ...this.state.search,
                    [name]: value
                }
            });
        }

    onClick = () => {
        this.props.history.push({
            pathname: ROUTES.HOME,
             state: {
                ...this.state
             }
        })
        console.log("landingState: " + this.state);
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
              <label>
                  LOCATION:
              </label>
              <Dropdown search selection fluid 
                     name="location"
                     options={this.state.locationOptions} 
                     placeholder="City, Adress, Zip code..."
                     onChange={this.handleLocation}
                     onSearchChange={this.handleLocation}
                     onLabelClick={this.handleLocation}
                     />

              </div>

              <div style={InOutDiv}>
                  <div style={CheckIn}>
                      <label>
                             CHECK IN/OUT:
                         </label>
                         <DatesRangeInput 
                         name="datesRange"  
                         minDate={today}
                        //  initialDate={this.state.defaultDateRange}
                         dateFormat="MM-DD-YYYY" 
                         onChange={this.handleCheckInOut} 
                         value={this.state.datesRange} 
                         icon="bullhorn" 
                         iconPosition="left" 
                         placeholder="From - To"
                        />                  </div>
                </div>
                <div style={InOutDiv}>

              <div style={RoomType}>
                      <label>
                          ROOM TYPE: 
                          <br></br>
                      </label>
                      <Select 
                        name="roomType"                        
                        placeholder='Single, Double, Multiple...' 
                        options={this.state.roomOptions} 
                        onChange={this.handleRoomType}
                        />
                        <div style={RoomQuantity}>
                                              <Select 
                        name="roomQuantity"                        
                        placeholder='Select' 
                        options={this.state.roomQuantity} 
                        onChange={this.handleRoomType}
                        />
                        </div>

              </div>
              </div>

              <div style={buttonDiv}>
                  <Form.Button onClick={this.onClick}>Submit</Form.Button>
              </div>
          </Form>
      </div>
  </div>
);
}}

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
    width:"360px",
};
const RoomQuantity = {
    float:'left',
    width:"180px",
};
const RoomType = {
    margin:"20px auto 0 auto ",
    width:"180px",
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

export default withFirebase(Landing)
