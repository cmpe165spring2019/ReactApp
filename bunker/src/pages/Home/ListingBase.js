import React, { Component } from 'react';
// import {
//     Button,
//     Form,
//     Grid,
//     Header,
//     Segment,
//     Message,
//     Card,
//     Divider
//   } from 'semantic-ui-react';

export default class ListingBase extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <div class='ui card'>
            <div class='image'>
              <img src='/images/avatar2/large/kristy.png' />
            </div>
            <div class='content'>
              <a class='header'>Master Bedroom SF</a>
              <div class='meta'>
                <span class='date'>$150 per night + $50 cleaning fee</span>
              </div>
              <div class='description'>
                Walking distance from cal train and union square.
              </div>
            </div>
  
            <div class='extra'>
              Rating:
              <div class='ui star rating' data-rating='2' />
            </div>
          </div>
        </div>
      );
    }
  }