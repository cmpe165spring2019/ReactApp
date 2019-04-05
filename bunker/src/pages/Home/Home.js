// This page can be accessed by anyone including guests

import React, { Component } from "react";

//Components
import SearchBar from './components/SearchBar';
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
            searchedSortedHotels: [],
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
            sort: 'ratingHL',
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        this._asyncRequest = this.props.firebase.getCities()
            .then(locationData => {
            this._asyncRequest = null;
            locationData.sort((a,b)=>{
                if(a.data.city.toLowerCase() > b.data.city.toLowerCase()){
                    return 1
                }
                else{
                    return -1
                }
            })
            this.setState({locationOptions: locationData});
        });

        this._asyncRequest = this.props.firebase.getAllHotels()
            .then(result => {
                this._asyncRequest = null;
                this.setState({
                    allHotels: result,
                    searchedSortedHotels: result,
                    filteredHotels: result
                },
                ()=>{
                    //apply default sort and then render it
                    this.sortHotels(this.state.allHotels, this.state.sort);
                    // console.log("FIREBASE RETRIEVAL for this.state.allHotels: " + util.inspect(this.state.allHotels));
                    // console.log("searchedHotels: " + util.inspect(this.state.searchedHotels));
                    // console.log("filteredHotels: " + util.inspect(this.state.filteredHotels));
                });
            });
            console.log('sort: ' + this.state.sort);

    
        //** DELETE LATER WHEN FIREBASE DATA IS PULLED */
        // load hotel data for both arrays
        // hotels[] stays constant
        // set state of searchHotels[] to allHotels[]
        // call filter and sort methods
        // filteredHotels is what gets rendered after filtering/sorting hotels

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
        let searchedHotels = this.state.searchedSortedHotels;
        // console.log(this.state.search.location);
        if(this.state.search.location.hasOwnProperty('data')){
            const { city, state, country } = this.state.search.location.data;
            if( city && state && country ){
                searchedHotels = this.state.allHotels.filter(
                    hotel=>
                        hotel.data.address.city.toLowerCase().includes(city.toLowerCase())
                        &&hotel.data.address.state.toLowerCase().includes(state.toLowerCase())
                        && hotel.data.address.country.toLowerCase().includes(country.toLowerCase())
                    
                );
            }
        }
        let searchedSortedHotels = this.sortHotels(searchedHotels, this.state.sort);

       if(searchedSortedHotels!==this.state.searchedSortedHotels){
        // set state of searchedHotels[]
        this.setState({
            searchedSortedHotels: searchedSortedHotels,
            filteredHotels: searchedSortedHotels,
        },
        ()=>{
            console.log('post-search sort: ' + this.state.sort);
        });
       }

        // call methods to re-filter and re-sort hotel cards
        // set state of filteredHotels[]
        // page gets re-rendered & displays filteredHotels[]
        
    }

    handleSort=(e, {name, value})=>{
        //sets the state of sort
        this.setState({
            sort: value
        });
        this.sortHotels(this.state.filteredHotels, value);
    }

    sortHotels=(hotels, value)=>{
        // const filteredHotels = this.state.filteredHotels;
        const filteredHotels = hotels;
        let sortedHotels = hotels;

        if(value.includes("rating")){
            if(value.includes("LH")){
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        return a.data.rating - b.data.rating
                    }
                );            }
            else{
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        return b.data.rating - a.data.rating
                    }
                );            }
        }
        else if (value.includes("price")){
            if(value.includes("LH")){
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        return a.data.price - b.data.price
                    }
                );
            }
            else{
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        return b.data.price - a.data.price
                    }
                );
            }
        }
        else if (value.includes("name")){
            if(value.includes("AZ")){
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        let x = a.data.name.toLowerCase();
                        let y = b.data.name.toLowerCase();
                        if (x < y) return -1;
                        else if (x > y) return 1;
                        else return 0;
                    }
                );
            }
            else{
                sortedHotels = filteredHotels.sort(
                    (a,b) => {
                        let x = a.data.name.toLowerCase();
                        let y = b.data.name.toLowerCase();
                        if (x < y) return 1;
                        else if (x > y) return -1;
                        else return 0;
                    }
                );
            }        }

        if(sortedHotels !== filteredHotels){
            this.setState({
                searchedSortedHotels: sortedHotels,
                filteredHotels: sortedHotels
            })

        }

        return sortedHotels;
    }

    handleSlider=(e)=>{
        this.setState({
            filter:{
                ...this.state.filter,
                price: e.x
            },

        },
        ()=>{
            this.handleFilter('price');
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
                this.handleFilter('rating');
            }
        );
    }

    handleFilter=(type)=>{
        //update state for filteredHotels
        const searchedSortedHotels = this.state.searchedSortedHotels;
        const price = this.state.filter.price;
        const rating = this.state.filter.rating;

        let filteredHotels = this.state.filteredHotels;

        if(type==='rating'){
            filteredHotels = searchedSortedHotels.filter(
                hotel => hotel.data.rating >= rating
            );
        }

        // *** CURRENTLY BROKEN UNTIL PRICE ATTRIBUTE GETS ADDED TO FIREBASE ***
        // else if(type==='price'){
        //     filteredHotels = searchedHotels.filter(
        //         hotel => hotel.data.price <= price
        //     );
        // }

        else{
            console.log('filtering both');
        }

        if(filteredHotels!==this.state.filteredHotels){
            this.setState({
                filteredHotels: filteredHotels
    
            });
        }
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
            <SearchBar
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
            defaultSort={this.state.sort}
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
