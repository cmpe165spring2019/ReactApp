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
            locationOptions: [],
            datesRange: '',
            search: {  
                location: '',
                checkInDate: null,
                checkOutDate: null,
                roomType: '',
            },
            filter: {
                price: null,
                rating: null,
            },
            sort: ''
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        this._asyncRequest = this.props.firebase.getCities()
            .then(externalData => {
            this._asyncRequest = null;
            this.setState({locationOptions: externalData});
        });


    }

    componentWillUnmount() {
        // if (this._asyncRequest) {
        //     this._asyncRequest.cancel();
        // }
    }

    componentDidUpdate() {
        console.log("current State: " + util.inspect(this.state));
    }

    handleCheckInOut=(event,{name,value})=>{
      console.log("name: " + name + " value: " + value);
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
        console.log(name + value);
        this.setState({
            search: { 
                ...this.state.search,
                [name]: value 
            }
        });
        //Make pop up modal for guests
    }

    handleSearch=(e)=>{
        //push search data to fire base
        console.log("searching hotels!")
    }

    handleSort=(e, {name, value})=>{
        this.setState({
            [name]: value
        });
    }

    handleFilter=(e, {name, value})=>{
        this.setState(
            {
                [name]: value
            }
        )
    }

    render() {

        const locationOptions = this.state.locationOptions.map(
            (location) =>
            ({
            key: location.data.city,
            text: `${location.data.city} , ${location.data.state}, ${location.data.country}`,
            value: location.data.city + ", " + location.data.state
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
            handleSortType={this.handleSort.bind(this)}
            />
                <Segment>
                    <Grid columns={2}>
                        <Grid.Column width={10}>
                            <ListingBase />
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
