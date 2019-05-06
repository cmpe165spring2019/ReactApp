import React from 'react';
import { Grid, Menu, Container, Icon, Select, Segment } from 'semantic-ui-react';
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

const SearchFilter = (props) => (
    <div>
        <Menu compact style={{position: "relative", left: "20%"}} secondary>
            <Menu.Item>
                <Container fluid>
                <div>
                        Price: ${props.minPrice} to ${Math.round(props.price)}
                    </div>
                    <Slider
                    name="slider"
                    axis="x"
                    x={props.x}
                    onChange={props.handleSlider}>
                    </Slider>
                </Container>

            </Menu.Item>
            <Menu.Item>
                <Container fluid>
                <div>
                        Rating:
                    </div>
                    <Select compact
                        name="rating"
                        placeholder=''
                        options={ratingOptions}
                        defaultValue={props.defaultRating}
                        onChange={props.handleRating} />
                </Container>
            </Menu.Item>
            <Menu.Item>
                <Container fluid>
                <div>
                        Sort By:
                    </div>
                        <Select
                        name="sort"
                        defaultValue={props.defaultSort}
                        placeholder=''
                        options={sortOptions}
                        onChange={props.handleSort} />
                </Container>
            </Menu.Item>

        </Menu>


    {/* <Grid centered>
        <Grid.Row>
            <Grid.Column width={3}>
            <div>
                        Price: ${props.minPrice} to ${Math.round(props.price)}
                    </div>
                    <Slider
                    name="slider"
                    axis="x"
                    x={props.x}
                    onChange={props.handleSlider}>
                    </Slider>
            </Grid.Column>
            <Grid.Column width={2}>
            <div>
                        Rating:
                    </div>
                    <Select compact
                        name="rating"
                        placeholder=''
                        options={ratingOptions}
                        defaultValue={props.defaultRating}
                        onChange={props.handleRating} />
            </Grid.Column>
            <Grid.Column width={2}>
            <div>
                        Sort By:
                    </div>
                        <Select
                        name="sort"
                        defaultValue={props.defaultSort}
                        placeholder=''
                        options={sortOptions}
                        onChange={props.handleSort} />
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
        </Grid.Row>
    </Grid>    */}
    </div>
)

export default SearchFilter;
