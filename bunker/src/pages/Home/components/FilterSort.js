import React from 'react';
import { Grid, Button, Icon, Select, Segment } from 'semantic-ui-react';
import Slider from 'react-input-slider';

const RatingFilter = () => {
    let starOptions = [];
    for (let i = 0; i < 5; i++) {
        let obj = {
            key: i,
            text: i + "+",
            value: i
        };
        starOptions.push(obj);
    }
    return (
       starOptions
    );
}

const ratingOptions = RatingFilter();

const sortOptions = [
    {
      key: 'ratingHL',
      text: 'Rating (High to Low)',
      value: 'ratingHL'
    },
    {
        key: 'ratingLH',
        text: 'Rating (Low to High)',
        value: 'ratingLH'
    },
    {
        key: 'priceHL',
        text: 'Price (High to Low)',
        value: 'priceHL'
     },
     {
        key: 'priceLH',
        text: 'Price (Low to High)',
        value: 'priceLH'
     },
     {
        key: 'nameAZ',
        text: 'Name (A-Z)',
        value: 'nameAZ'
     },
     {
        key: 'nameZA',
        text: 'Name (Z-A)',
        value: 'nameZA'
     },
  ];

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

const SearchFilter = (props) => (

    <Grid centered>
        <Grid.Row>
            <Grid.Column width={2}>
            <div>
                        Price:
                    </div>
                    <Slider axis="x" x={50} onChange={({x}) => this.setState(price=> ({price}))}>
                    </Slider>         
            </Grid.Column>
            <Grid.Column width={2}>
            <div>
                        Rating:
                    </div>
                    <Select 
                        name="rating"
                        placeholder='' 
                        options={ratingOptions}
                        onChange={props.handleFilter} />
            </Grid.Column>
            <Grid.Column width={2}>
            <div>
                        Sort By:
                    </div>
                        <Select 
                        name="sort"
                        placeholder='' 
                        options={sortOptions}
                        onChange={props.handleSort} />
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
        </Grid.Row>
    </Grid>   
    
)

export default SearchFilter;
