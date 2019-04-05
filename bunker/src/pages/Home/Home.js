// This page can be accessed by anyone including guests

import React, { Component } from "react";

//Components
import SearchFilterBar from './components/SearchFilterBar';
import ListingBase from './components/ListingBase';
import FilterSort from './components/FilterSort';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import * as moment from 'moment';


// Backend functionalities
import { withFirebase } from '../../server/Firebase/index';

//Debugging purposes
import * as util from 'util' // has no default export

class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            allHotels: [],
            filteredHotels: [],
            searchedHotels: [],
            locationOptions: [],
            datesRange: '',
            search: {
                location: {},
                checkInDate: null,
                checkOutDate: null,
                roomType: '',
            },
            filter: {
                price: 100,
                rating: 0,
            },
            sort: '',
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        this._asyncRequest = this.props.firebase.getCities()
            .then(externalData => {
            this._asyncRequest = null;
            this.setState({locationOptions: externalData});
        });

        this._asyncRequest = this.props.firebase.getAllHotels()
            .then(result => {
                this._asyncRequest = null;
                this.setState({
                    allHotels: result,
                    filteredHotels: result
                },
                ()=>{
                    
                    console.log("FIREBASE RETRIEVAL for this.state.allHotels: " + util.inspect(this.state.allHotels));
                    // console.log("searchedHotels: " + util.inspect(this.state.searchedHotels));
                    // console.log("filteredHotels: " + util.inspect(this.state.filteredHotels));
                });
            });

    
        //** DELETE LATER WHEN FIREBASE DATA IS PULLED */
        // load hotel data for both arrays
        // hotels[] stays constant
        // set state of searchHotels[] to hotels[]
        // call filter and sort methods
        // filteredHotels is what gets rendered after filtering/sorting hotels

        // this.setState({
        // hotels: DUMMYHOTELS,
        // filteredHotels: DUMMYHOTELS  })

    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    componentDidUpdate(prevState) {
        // console.log(this.state);
        // console.log("allHotels: " + util.inspect(this.state.allHotels));
        // console.log("searchedHotels: " + util.inspect(this.state.searchedHotels));
        // console.log("filteredHotels: " + util.inspect(this.state.filteredHotels));
    }

    handleCheckInOut=(event,{name,value})=>{
    //   console.log("name: " + name + " value: " + value);
        if(this.state.hasOwnProperty(name)){
            this.setState({[name]:value});
        }

        //parse the dates into checkInDate and checkOutDate as Date objects after the user clicks the 2nd date
        if(value.length > 13){
            let parsedValue = value.split(" ");
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
                search: {
                    ...this.state.search,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                }
            });

            // console.log("check in :" + checkInDate + " check out: " + checkOutDate);
        }
      }


    handleRoomType=(e, {value})=>{
        this.setState({
            search: {
                ...this.state.search,
                roomType: value
            }
        });
        //Make pop up modal for guests
    }

    handleLocation=(e, {name,value})=>{
        // console.log(value);
        this.setState({
            search: {
                ...this.state.search,
                location: value
            }
        });
    }

    handleSearch=(e)=>{
        //*** */BACK-END IMPLEMENTATION:
        // filter hotels[] by search criteria & store into searchedHotels[]
        let searchedHotels = [];
        
        const { searchCity, searchState, searchCountry } = this.state.search.location.data;
        // console.log('search for location: ' + city + state + country);
        // searchedHotels = this.state.allHotels.filter(
        //     hotel=>
        //         hotel.data.address.city.toLowerCase().includes(searchCity)
        //         &&hotel.data.address.state.toLowerCase().includes(searchState)
        //         && hotel.data.address.country.toLowerCase().includes(searchCountry)
            

        // );

        this.state.allHotels.forEach(hotel=>{
            console.log(hotel.data.address);

            if(typeof hotel.data.city== 'undefined'){
                console.log("error with :" + hotel.data.name + " " + hotel.id);
                // console.log(hotel.id);
            }
            else{
                console.log(hotel.data.address.city);
            }
            if(typeof hotel.data.name == 'undefined'){
                console.log(hotel.id);
            }
       
        });

        // console.log('search print out ' + city.toLowerCase());
            // console.log('city print out ' + (this.state.allHotels[0].data.address.city.toLowerCase()));
            // console.log('compare ' + city.toLowerCase().includes(this.state.allHotels[0].data.address.city.toLowerCase()));
       
            // set state of searchedHotels[]
        // clear values for search
        this.setState({
            searchedHotels: searchedHotels,
            filteredHotels: searchedHotels,
            // search: {
            //     location: null,
            //     checkInDate: null,
            //     checkOutDate: null,
            //     roomType: ''
            // },
            sort: '',
            // filter: {
            //     price: 100,
            //     rating: 0,
            // },
        });
        // call methods to re-filter and re-sort hotel cards
        // set state of filteredHotels[]
        // page gets re-rendered & displays filteredHotels[]
        
    }

    handleSort=(e, {name, value})=>{
        //sets the state of sort
        this.setState({
            [name]: value
        });

        const filteredHotels = this.state.filteredHotels;
        let sortedHotels = [];
        console.log(name);
        if(value.includes("rating")){
            if(value.includes("LH")){
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        return a.rating - b.rating
                    }
                );            }
            else{
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        return b.rating - a.rating
                    }
                );            }
        }
        else if (value.includes("price")){
            if(value.includes("LH")){
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        return a.price - b.price
                    }
                );
            }
            else{
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        return b.price - a.price
                    }
                );
            }
        }
        else if (value.includes("name")){
            if(value.includes("AZ")){
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();
                        console.log(x + y);
                        if (x < y) return -1;
                        else if (x > y) return 1;
                        else return 0;
                    }
                );
            }
            else{
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();
                        if (x < y) return 1;
                        else if (x > y) return -1;
                        else return 0;
                    }
                );
            }        }

        if(sortedHotels.length>0){
            this.setState({
                filteredHotels: sortedHotels
            })

        }

    }

    handleSlider=(e)=>{
        this.setState({
            filter:{
                ...this.state.filter,
                price: e.x
            },

        },
        ()=>{
            this.handleFilter();
        }
        );
    }

    handleRating=(e, {name, value})=>{
        console.log("name: " + name + "value: " + value);
        this.setState(
            {
                filter:{
                    ...this.state.filter,
                    rating: value
                }
            },
            ()=>{
                this.handleFilter();
            }
        );
    }

    handleFilter=()=>{
        //update state for filteredHotels
        const searchedHotels = this.state.searchedHotels;
        const price = this.state.filter.price;
        const rating = this.state.filter.rating;
        console.log("filtering by $" + price + " and rating " + rating);

        let filteredHotels1 = searchedHotels.filter(
            hotel => hotel.price <= price
        );

        console.log("filtered hotels by price: " + filteredHotels1);

        let filteredHotels2 = filteredHotels1.filter(
            hotel => hotel.rating >= this.state.filter.rating
        );

        console.log("filtered hotels by rating: " + filteredHotels2);

        this.setState({
            filteredHotels: filteredHotels2

        });
    }

    render() {

        const locationOptions = this.state.locationOptions.map(
            (location) =>
            ({
            key: location.data.city,
            text: `${location.data.city} , ${location.data.state}, ${location.data.country}`,
            value: location
            })
        );

      const roomOptions = [
          {
            key: 'single',
            text: 'Single-Person',
            value: 'single'
          },
          {
            key: 'double',
            text: 'Double-Person',
            value: 'double'
          },
          {
            key: 'multiple',
            text: 'Multiple-Person',
            value: 'multiple'
          }
        ];

        return (
            <div>
            <SearchFilterBar
            datesRange={this.state.datesRange}
            locationOptions={locationOptions}
            roomOptions={roomOptions}
            handleLocation={this.handleLocation.bind(this)}
            handleCheckInOut={this.handleCheckInOut.bind(this)}
            handleRoomType={this.handleRoomType.bind(this)}
            handleSearch={this.handleSearch.bind(this)}
            />
            <FilterSort
            handleSort={this.handleSort.bind(this)}
            handleRating={this.handleRating.bind(this)}
            handleFilter={this.handleFilter.bind(this)}
            handleSlider={this.handleSlider.bind(this)}
            price={this.state.filter.price}
            defaultRating={this.state.filter.rating}
            />
                <Segment>
                    <Grid celled columns={2}>
                        <Grid.Column width={10}>
                            <ListingBase
                            hotels={this.state.filteredHotels}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            insert maps here
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
        }

    }

export default withFirebase(HomePage)
