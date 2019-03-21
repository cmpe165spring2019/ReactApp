import React, { Component } from "react";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { withAuthorization, withEmailVerification } from "../../server/Session";
import { withFirebase } from "../../server/Firebase";
// import Logo from "./logo_transparent.png";
// import Map from "./gmapsf.jpg";
import { DateInput } from "semantic-ui-calendar-react";
import { withRouter, Switch, Route, Link } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message,
    Card,
    Divider,
    Image,
    Select,
    Input
} from "semantic-ui-react";

const condition = authUser => !!authUser;

let Guests = [];
for (var i = 1; i < 6; i++) {
    let obj = {
        key: i,
        text: i,
        value: i
    };
    Guests.push(obj);
}

let Star = [];
for (var i = 0; i < 7; i++) {
    let obj = {
        key: i,
        text: i,
        value: i
    };
    Star.push(obj);
}

let PriceR = [];
var i = 0;
while (i < 700) {
    let obj = {
        key: i,
        text: i,
        value: i
    };
    i = i + 100;
    PriceR.push(obj);
}

const GuestNum = () => (
    <Select icon="user" iconPosition="left" options={Guests} />
);

const Stars = () => <Select icon="star" iconPosition="left" options={Star} />;

const PriceRange = () => (
    <Select icon="dollar sign" iconPosition="left" options={PriceR} />
);

const HomePage = () => (
    <div>
        <SearchFilterBar />
        <div class="ui section divider" />
        <div class="ui segment">
            <div class="ui two column very relaxed grid">
                <div class="column">
                    <ListingBase />
                </div>
                <div class="column">
                    {/*<Image src={Map} />*/}
                </div>
            </div>
            <div class="ui vertical divider" />
        </div>
    </div>
);

const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
};

class ListingBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [
                {
                    uid: "1",
                    name: "Park Inn San Jose by Radisson",
                    location: "San Jose, CA",
                    image1:
                        "https://s-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg",
                    image2:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/151/151408199.jpg",
                    image3:
                        "https://t-ec.bstatic.com/images/hotel/max1280x900/144/144211371.jpg",
                    image4:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/512/51237756.jpg",
                    image5:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/144/144210300.jpg",
                    detail: "Free Wifi & Parking & Gym ",
                    address: "1111",
                    price: "175",
                    oneBedPrice: "175",
                    twoBedPrice: "275",
                    LuxuryPrice: "375",
                    oneBedCap: "2",
                    twoBesCap: "4",
                    LuxuryCap: "6",
                    description:
                        "Walking distance from cal train station and Downtown San Jose"
                },

                {
                    uid: "2",
                    name: "Fairmont",
                    location: "San Jose, CA",
                    image1:
                        "https://thumbnails.trvl-media.com/vff-vkeZvCEFxU78UgLUmpictkY=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/20000/18200/18200/397a578b_z.jpg",
                    image2:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/151/151408199.jpg",
                    image3:
                        "https://t-ec.bstatic.com/images/hotel/max1280x900/144/144211371.jpg",
                    image4:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/512/51237756.jpg",
                    image5:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/144/144210300.jpg",
                    detail: "Free Wifi & Parking & Gym ",
                    address: "1111",
                    price: "200",
                    oneBedPrice: "200",
                    twoBedPrice: "275",
                    LuxuryPrice: "375",
                    oneBedCap: "2",
                    twoBesCap: "4",
                    LuxuryCap: "6",
                    description:
                        "Luxurious complex with swimming pool, spa, and massage. Hiking lessons and camping available."
                },

                {
                    uid: "2",
                    name: "Fairmont",
                    location: "San Jose, CA",
                    image1:
                        "https://thumbnails.trvl-media.com/vff-vkeZvCEFxU78UgLUmpictkY=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/20000/18200/18200/397a578b_z.jpg",
                    image2:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/151/151408199.jpg",
                    image3:
                        "https://t-ec.bstatic.com/images/hotel/max1280x900/144/144211371.jpg",
                    image4:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/512/51237756.jpg",
                    image5:
                        "https://s-ec.bstatic.com/images/hotel/max1280x900/144/144210300.jpg",
                    detail: "Free Wifi & Parking & Gym ",
                    address: "1111",
                    price: "200",
                    oneBedPrice: "200",
                    twoBedPrice: "275",
                    LuxuryPrice: "375",
                    oneBedCap: "2",
                    twoBesCap: "4",
                    LuxuryCap: "6",
                    description:
                        "Luxurious complex with swimming pool, spa, and massage. Hiking lessons and camping available."
                }
            ]
        };
    }

    render() {
        const { hotels } = this.state;
        return (
            <div>
                <div class="ui two stackable cards">
                    {hotels.map(hotel => (
                        <a
                            href={{
                                pathname: `${ROUTES.HOTEL}/${hotel.uid}`,
                                state: { hotel }
                            }}
                            class="ui card"
                        >
                            <div class="image">
                                <img src={hotel.image1} />
                            </div>
                            <div class="content">
                                <a class="header">{hotel.name}</a>
                                <div class="meta">
                                    <span class="date">${hotel.price}</span>
                                </div>
                                <div class="description">{hotel.description}</div>
                            </div>
                            <div class="extra">
                                Rating:
                                <div class="ui star rating" data-rating="4" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

class SearchFilterBar extends Component {
    constructor(props) {
        super(props);
        //this.state = { ...INITIAL_STATE };
        this.state = {
            dateIn: "",
            dateOut: "",
            todayString: ""
        };
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === "" || email === "";

        return (
            <Grid>
                <Grid.Column width={3}>
                    {/*<Image src={Logo} width="250" height="150" />*/}
                </Grid.Column>

                <Grid.Column width={10}>
                    <Input
                        fluid
                        icon="hand point right"
                        iconPosition="left"
                        placeholder="City, Street, Zip Code..."
                    />

                    <Grid>
                        <Grid.Row />
                        <Grid.Column width={3}>
                            <div>CheckInDate</div>
                            <DateInput
                                name="dateIn"
                                minDate="03-16-2019"
                                dateFormat="MM-DD-YYYY"
                                onChange={this.handleChange}
                                value={this.state.dateIn}
                                icon="bullhorn"
                                iconPosition="left"
                                placeholder="MM/DD/YYYY"
                            />
                        </Grid.Column>

                        <Grid.Column width={3}>
                            <div>CheckOutDate</div>
                            <DateInput
                                name="dateOut"
                                minDate="03-17-2019"
                                dateFormat="MM-DD-YYYY"
                                onChange={this.handleChange}
                                value={this.state.dateOut}
                                icon="paper plane"
                                iconPosition="left"
                                placeholder="MM/DD/YYYY"
                            />
                        </Grid.Column>

                        <Grid.Column width={3}>
                            <div>Number of Guests</div>
                            <GuestNum />
                        </Grid.Column>

                        <Grid.Column width={3}>
                            <div>Star Level</div>
                            <Stars />
                        </Grid.Column>

                        <Grid.Column width={3}>
                            <div>Lowest Price</div>
                            <PriceRange />
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

export default compose(
    withFirebase,
    withEmailVerification,
    withAuthorization(condition)
)(HomePage);
