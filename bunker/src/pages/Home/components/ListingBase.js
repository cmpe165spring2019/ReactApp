import React, { Component } from "react";
import * as ROUTES from "../../../constants/routes";
import { Link } from "react-router-dom";
import  HotelCard from "./HotelCard";
import { Grid, Select } from 'semantic-ui-react';
import * as util from 'util' // has no default export




export default class ListingBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datesRange:'',
      roomtype:'',
    };
  }
  componentDidUpdate(prevProps){
        if(this.props.datesRange!== this.state.datesRange){
            this.setState({
                datesRange:this.props.datesRange,
            })
        }

    }

  render() {

      const { datesRange, roomType, roomQuantity } = this.props;

    return (
      <div>
        <Grid stackable padded="vertically" columns={3} style={{height: '70%'}}>
          <Grid.Row>
            {
              this.props.hotels.map(hotel => {
                // const roomTypeData = hotel.data.room_types.filter(roomType=> roomType.type === this.props.roomType);
                // const price = roomTypeData[0].price;
                const price = hotel.data.currentRoomPrice;
                return(
                  <Grid.Column stretched padded="vertically">
                <Link to = {{
                  pathname: `${ROUTES.HOTEL}/${hotel.id}`,
                    state: { hotel, datesRange, roomType, roomQuantity }
                }}
                >
                <HotelCard
                hotel={hotel}
                />
                </Link>
              </Grid.Column>
                );
              })
            }
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
