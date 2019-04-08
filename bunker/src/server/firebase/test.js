import React, { Component } from 'react';

import {withFirebase} from './index';

class testPage extends Component {

    render() {
        //Your test code go here
        /* to use firebase, you can call the function
        example: this.props.firebase.googleSignIn
        */

        console.log(this.props.firebase);


        //Your test code end here
      return(
      <div>
      <h1>
      TestPage
      </h1>
      </div>
    )
    }
}

export default withFirebase(testPage);
