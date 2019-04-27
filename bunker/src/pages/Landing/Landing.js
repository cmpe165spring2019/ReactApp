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
import CheckInOutCalendar from '../../commonComponents/CheckInOutCalendar';
import RoomTypeSelect from '../../commonComponents/RoomTypeSelect';
import RoomQuantitySelect from '../../commonComponents/RoomQuantitySelect';

// Backend functionalities
import { withFirebase } from '../../server/Firebase/index';
import * as ROUTES from '../../constants/routes';
import * as moment from "moment";


class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            datesRange: '',
            locationOptions: [],
             search: {
                location: {},
                roomType: '',
                roomQuantity: 0
            }
        }
    }

    componentDidUpdate() {
        console.log(this.state);
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

        handleCheckInOut=(event,{name,value})=>{
            console.log('name: ' + name + " value: " + value);
            //set datesRange whenever calendar range is updated
                if(this.state.hasOwnProperty(name)){
                    this.setState({[name]:value},
                        ()=>{
                            //parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
                            this.parseDatesRange(value);
                        });
                }
        }

        parseDatesRange = (datesRange) => {
            if(datesRange.length > 13){
                let parsedValue = datesRange.split(" ");
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
                    ...this.state,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    start_date: checkInDate.getTime(),
                    end_date: checkOutDate.getTime()
                });
    
        }
    }

    handleRoomTypeQuantity=(e, {name, value})=>{
        this.setState({
            [name]: value
        });
    }

    onClick = () => {
        const state = this.state;

        this.props.history.push({
            pathname: ROUTES.HOME,
             state: {...state}
        });

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
                  Location:
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
                             Check In/Out:
                         </label>
                         <CheckInOutCalendar
                            onChange={this.handleCheckInOut.bind(this)}
                            value={this.state.datesRange}
                        />        
                           </div>
                </div>
                <div style={InOutDiv}>
                <div style={Room}>

              <div style={RoomType}>
              <label>
    Room Type: 
    <br></br>
</label>
  <RoomTypeSelect
    onChange={this.handleRoomTypeQuantity}
    defaultValue={'single'}
    />
    </div>
                        <div style={RoomQuantity}>
                        <div>Quantity:</div>
    <RoomQuantitySelect
    onChange={this.handleRoomTypeQuantity}
    defaultValue={1}
    />
                        </div>

              </div>
              </div>

              <div style={buttonDiv}>
                  <Button onClick={this.onClick}>Submit</Button>
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
    float:'right',
    width:"180px",
};
const Room = {
    margin:"20px auto 0 auto ",
    width:"360px",
};
const RoomType = {
    float: 'left',
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
