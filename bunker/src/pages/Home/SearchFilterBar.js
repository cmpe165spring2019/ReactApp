import React, { Component } from 'react';
import{ DateInput }from 'semantic-ui-calendar-react';
import Logo from './linkedin_banner_image_11.pdf';
import {
    Button,
    Grid,
    Image,
    Select,
    Input,
  } from 'semantic-ui-react';

  const GuestNum = () =>{
    let Guests=[];
    for(var i=1;i<6;i++){
      let obj={
        key:i,
        text:i,
        value:i
      };
      Guests.push(obj);
    }
    return (<Select icon="user" iconPosition="left" options={Guests}/>
    );
}

  const Stars=()=>{
    let Star=[];
for(var i=0;i<7;i++){
  let obj={
    key:i,
    text:i,
    value:i
  };
  Star.push(obj);
}
return (
    <Select icon="star" iconPosition="left" options={Star}/>

);
}

const PriceRange=()=>{

    let PriceR=[];
    var i=0;
    while(i<700){
    let obj={
        key:i,
        text:i,
        value:i
    };i=i+100;
    PriceR.push(obj);
    }

    return (
        <Select icon="dollar sign" iconPosition="left" options={PriceR}/>
    );
}
  
export default class SearchFilterBar extends Component {
    constructor(props) {
      super(props);
        //this.state = { ...INITIAL_STATE };
        this.state={
          dateIn:'',
          dateOut:'',
          todayString: ''
        };
    }
  
    handleChange=(event,{name,value})=>{
      if(this.state.hasOwnProperty(name)){
        this.setState({[name]:value});
      }
    }
 
  
  
    render() {
  
      const { email, password, error } = this.state;
  
      const isInvalid = password === '' || email === '';
  
      return (
  
       <Grid>
          <Grid.Column width={3}>
              <Image src={Logo} width="250" height="150" />
            </Grid.Column>
  
            <Grid.Column width={10}>
                <Input fluid icon="hand point right" iconPosition="left" placeholder="City, Street, Zip Code..." />
  
                <Grid>
                  <Grid.Row></Grid.Row>
                  <Grid.Column width ={3}>
                  <div>CheckInDate</div><DateInput  name="dateIn" minDate="03-16-2019" dateFormat="MM-DD-YYYY" onChange={this.handleChange} value={this.state.dateIn} icon="bullhorn" iconPosition="left" placeholder="MM/DD/YYYY"/>
                    </Grid.Column>
  
                      <Grid.Column width ={3}>
                  <div>CheckOutDate</div><DateInput name="dateOut" minDate="03-17-2019" dateFormat="MM-DD-YYYY" onChange={this.handleChange} value={this.state.dateOut} icon="paper plane" iconPosition="left" placeholder="MM/DD/YYYY"/>
                  </Grid.Column>
  
                     <Grid.Column width={3}>
                     <div>Number of Guests</div><GuestNum />
                     </Grid.Column>
  
                     <Grid.Column width={3}>
                     <div>Star Level</div><Stars /></Grid.Column>
  
                      <Grid.Column width={3}>
                      <div>Lowest Price</div><PriceRange />
                      </Grid.Column>
  
  
                </Grid>
  
            </Grid.Column>
  
             <Grid.Column width={3}>
            <Button>Apply & Search</Button>
              </Grid.Column>
        </Grid>
      );
    }
  }
