import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {TestPage} from './server/firebase';


class App extends Component {
  render() {
    return (
      <Router>
    <div>

      <Route exact path={'/test'} component={TestPage} />
    </div>
  </Router>
    );
  }
}

export default App;
