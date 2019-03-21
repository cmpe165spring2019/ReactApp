import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../server/Firebase';
import * as ROUTES from '../../constants/routes';

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from 'semantic-ui-react';

const PasswordForgetPage = () => (
    <Grid centered columns={2}>
    <Grid.Row>
  <div>
  <p></p>
    <h1>PasswordForget</h1>
    <h3><i>Forgot password? No worry, please enter your registered email</i></h3>
    <PasswordForgetForm />
    </div>
    </Grid.Row>
</Grid>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
         <Grid centered columns={2}>
      <Form onSubmit={this.onSubmit}>
      <p></p>

        <Form.Input
          fluid
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button color="orange" fluid size="large" disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        {error && <font size="+1"><i><p>****{error.message}****</p></i></font>}
      </Form>
</Grid>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
