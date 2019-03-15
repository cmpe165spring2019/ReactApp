import React from 'react';
import Background from '../../Image/LandingBackground.jpg';
import BunkerImage from '../../Image/bunker.png';
import {Form} from 'semantic-ui-react';


import * as ROUTES from '../../constants/routes';


class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location: "",
        }
    }
    onClick = () => {
        const test = [{
            name: "dasda",
            location: "Dsadas",
            image: "asda",
        },
            {
                name: "123",
                location: "123",
                image: "123",
            }]
        // this.props.firebase.hotelFilter(this.state.location)
    // .then( (hotels) =>{
        this.props.history.push({
            pathname: ROUTES.HOME,
            // state: {hotels: test}
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
                      <Form.Field size = "medium">
                          <label>CHECK IN</label>
                          <input placeholder="Check In Date" />
                      </Form.Field>
                  </div>
                  <div style={CheckOut}>
                      <Form.Field size = "medium">
                          <label>CHECK OUT</label>
                          <input placeholder="Check Out Date" type="text"/>
                      </Form.Field >
                  </div>
                </div>

              <div style={Guests}>
                  <Form.Field size = "medium">
                      <label>GUESTS</label>
                      <input placeholder="Guests" />
                      {/*<select>*/}
                          {/*<option value={1}>1</option>*/}
                          {/*<option value={2}>2</option>*/}
                          {/*<option value={3}>3</option>*/}
                          {/*<option value={4}>4</option>*/}
                          {/*<option value={5}>5</option>*/}
                      {/*</select>*/}
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
const bunkerStyle = {
    margin: "auto",
    width: "300px",
    height: "300px",
    //Image: `url(${BunkerImage})`,
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
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "null",
};

export default Landing;
