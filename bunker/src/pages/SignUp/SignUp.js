import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../server/Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from 'semantic-ui-react';

const SignUpPage = () => (
    <Grid centered columns={5}>
  <div>
  <p>       </p>
        <h1><i>Sign Up to Join Us</i></h1>
    <SignUpForm />
  </div>
  </Grid>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log("add to DB");
        this.props.firebase.addUserToDB(authUser, email, username, isAdmin);
        console.log("send email verification");
        this.props.firebase.doSendEmailVerification(authUser);
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Grid centered columns={5}>
      <form class="ui form" onSubmit={this.onSubmit}>
        <div class="field"><label><p></p><h3>Full Name</h3></label>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Donald_Duck"
        /></div>

        <div class="field"><label><h3>Email</h3></label>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="lady@gaga.com"
        /></div>

        <div class="field"><label><h3>Password</h3></label>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="123abc"
        /></div>

        <div class="field"><label><h3>Confirm Password</h3></label>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="password again please"
        /></div>

        <div class="field">
      <h4>  <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label></h4></div>

        <Button color="green" fluid size="large" type="submit" disabled={isInvalid} >
          <h2><i>Welcome Bunkerer!</i></h2>
        </Button>
      </form>
      {error && <font size="+1"><i><p>********{error.message} Please use a registered email(a new one if already taken) such as Gmail, Yahoo Email or School Email if you want to continue to sign up********</p></i></font>}
      </Grid>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
