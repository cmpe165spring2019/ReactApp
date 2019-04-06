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
    };
  }

  render() {

    return (
      <div>
        <Grid stackable padded="vertically" columns={3}>
          <Grid.Row>
            {
              this.props.hotels.map(hotel => {
                const roomTypeData = hotel.data.room_types.filter(roomType=> roomType.type === this.props.roomType);
                const price = roomTypeData[0].price;
                console.log(util.inspect(roomTypeData));
                console.log(price);
                return(
                  <Grid.Column stretched padded="vertically">
                <Link to = {{
                  pathname: `${ROUTES.HOTEL}/${hotel.id}`,
                  state: { hotel }
                }}
                >
                <HotelCard 
                hotelImage={hotel.data.image[0]}
                hotelName={hotel.data.name}
                hotelPrice={price}
                hotelDescription={hotel.data.details}
                hotelRating={hotel.data.rating}
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
