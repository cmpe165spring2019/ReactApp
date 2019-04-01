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
            searchLocations: [],
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
            }
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        this._asyncRequest = this.props.firebase.getCities()
            .then(externalData => {
            this._asyncRequest = null;
            this.setState({searchLocations: externalData});
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
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate
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

    render() {

        const searchLocations = this.state.searchLocations.map(
            (location) =>
            ({
            key: location.data.city,
            text: `${location.data.city} , ${location.data.country}`,
            value: location.data.city,
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
            searchLocations={searchLocations} 
            roomOptions={roomOptions} 
            handleCheckInOut={this.handleCheckInOut.bind(this)}
            handleRoomType={this.handleRoomType.bind(this)}/>
            <FilterSort/>
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
