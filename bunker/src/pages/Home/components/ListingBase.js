import React, { Component } from "react";
import * as ROUTES from "../../../constants/routes";
import { Link } from "react-router-dom";
import  HotelCard from "./HotelCard";
import { Grid, Select } from 'semantic-ui-react';



export default class ListingBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    //Dummy Hotel Data
    // let hotels = [
    //   {
    //     uid: "1",
    //     name: "Park Inn San Jose by Radisson",
    //     location: "San Jose, CA",
    //     image1:
    //       "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
    //     image2:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/151/151408199.jpg",
    //     image3:
    //       "https://t-ec.bstatic.com/images/hotel/max1280x900/144/144211371.jpg",
    //     image4:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/512/51237756.jpg",
    //     image5:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/144/144210300.jpg",
    //     detail: "Free Wifi & Parking & Gym ",
    //     address: "1111",
    //     price: "175",
    //     oneBedPrice: "175",
    //     twoBedPrice: "275",
    //     LuxuryPrice: "375",
    //     oneBedCap: "2",
    //     twoBesCap: "4",
    //     LuxuryCap: "6",
    //     description:
    //       "Walking distance from cal train station and Downtown San Jose"
    //   },

    //   {
    //     uid: "2",
    //     name: "Fairmont",
    //     location: "San Jose, CA",
    //     image1:
    //       "https://thumbnails.trvl-media.com/vff-vkeZvCEFxU78UgLUmpictkY=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/20000/18200/18200/397a578b_z.jpg",
    //     image2:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/151/151408199.jpg",
    //     image3:
    //       "https://t-ec.bstatic.com/images/hotel/max1280x900/144/144211371.jpg",
    //     image4:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/512/51237756.jpg",
    //     image5:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/144/144210300.jpg",
    //     detail: "Free Wifi & Parking & Gym ",
    //     address: "1111",
    //     price: "200",
    //     oneBedPrice: "200",
    //     twoBedPrice: "275",
    //     LuxuryPrice: "375",
    //     oneBedCap: "2",
    //     twoBesCap: "4",
    //     LuxuryCap: "6",
    //     description:
    //       "Luxurious complex with swimming pool, spa, and massage. Hiking lessons and camping available."
    //   },

    //   {
    //     uid: "2",
    //     name: "Fairmont",
    //     location: "San Jose, CA",
    //     image1:
    //       "https://thumbnails.trvl-media.com/vff-vkeZvCEFxU78UgLUmpictkY=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/20000/18200/18200/397a578b_z.jpg",
    //     image2:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/151/151408199.jpg",
    //     image3:
    //       "https://t-ec.bstatic.com/images/hotel/max1280x900/144/144211371.jpg",
    //     image4:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/512/51237756.jpg",
    //     image5:
    //       "https://s-ec.bstatic.com/images/hotel/max1280x900/144/144210300.jpg",
    //     detail: "Free Wifi & Parking & Gym ",
    //     address: "1111",
    //     price: "200",
    //     oneBedPrice: "200",
    //     twoBedPrice: "275",
    //     LuxuryPrice: "375",
    //     oneBedCap: "2",
    //     twoBesCap: "4",
    //     LuxuryCap: "6",
    //     description:
    //       "Luxurious complex with swimming pool, spa, and massage. Hiking lessons and camping available."
    //   }
    // ]

    return (
      <div>
        <Grid stackable padded="vertically" columns={3}>
          <Grid.Row>
            {
              this.props.hotels.map(hotel => (
              <Grid.Column stretched padded="vertically">
                <Link to = {{
                  pathname: `${ROUTES.HOTEL}/${hotel.uid}`,
                  state: { hotel }
                }}
                >
                <HotelCard 
                hotelImage={hotel.image1}
                hotelName={hotel.name}
                hotelPrice={hotel.price}
                hotelDescription={hotel.description}
                hotelRating={hotel.rating}
                />
                </Link>
              </Grid.Column>
              ))
            }
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
