import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from '../../server/Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Image
} from 'semantic-ui-react';

const ReservationPage= () => (
  <div>
    <h1></h1>
    <Reservations />


  </div>
);
class Reservation extends Component{
  constructor(props) {
    super(props);

    this.state = {};
  }

  render(){
    return(
      <Grid divided='vertically'>
      <Grid.Row columns={3}>
      <Grid.Column width={1}>
      </Grid.Column>
          <Grid.Column>
               <Image
                src="https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg"
                //size='medium'
                width="250px"
                height="150px"
                />
                <h3>  Hilton San Jose</h3>
          </Grid.Column>

          <Grid.Column>
            <h2>April 11th, 2019 - May 11th,2019</h2>
             <Grid.Row>
            <Button color='yellow' size='large'>Change Reservation</Button>
            </Grid.Row>
              <p></p>
            <Grid.Row>
            <Button color='red' size="large">Cancel  Reservation </Button>
            </Grid.Row>
          </Grid.Column>
</Grid.Row>

<Grid.Row columns={3}>
<Grid.Column width={1}>
</Grid.Column>
    <Grid.Column>
         <Image
          src="https://thumbnails.trvl-media.com/vff-vkeZvCEFxU78UgLUmpictkY=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/20000/18200/18200/397a578b_z.jpg"
          //size='medium'
          width="250px"
          height="150px"
          />
          <h3>Four Season San Francisco</h3>
    </Grid.Column>

    <Grid.Column>
      <h2>March 29th, 2019 - April 10th,2019</h2>
       <Grid.Row>
      <Button color='yellow' size='large'>Change Reservation</Button>
      </Grid.Row>
        <p></p>
      <Grid.Row>
      <Button color='red' size="large">Cancel  Reservation </Button>
      </Grid.Row>
    </Grid.Column>


</Grid.Row>

<Grid.Row columns={3}>
<Grid.Column width={1}>
</Grid.Column>
    <Grid.Column>
         <Image
          src="https://s-ec.bstatic.com/images/hotel/max1280x900/151/151408199.jpg"
          //size='medium'
          width="250px"
          height="150px"
          />
          <h3>Shelton Sacramento</h3>
    </Grid.Column>

    <Grid.Column>
      <h2>March 11th, 2019 - March 28th,2019</h2>
       <Grid.Row>
      <Button color='yellow' size='large'>Change Reservation</Button>
      </Grid.Row>
        <p></p>
      <Grid.Row>
      <Button color='red' size="large">Cancel  Reservation </Button>
      </Grid.Row>
    </Grid.Column>


</Grid.Row>



      </Grid>
    );
  }
}
const Reservations = compose(
  withRouter,
  withFirebase,
)(Reservation);

export default ReservationPage;
