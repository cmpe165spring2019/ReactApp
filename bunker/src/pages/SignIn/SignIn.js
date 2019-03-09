import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp/SignUp';
import { PasswordForgetLink } from '../PasswordForget/PasswordForget';
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

const SignInPage = () => (
  <div>
    <h1></h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />


  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Grid centered columns={2}>
       <Grid.Column>
          <Header as="h2" textAlign="center">
            <h1>SignIn</h1>
            </Header>
            <Segment>

      <Form size="large" onSubmit={this.onSubmit}>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Button color="blue" fluid size="large" disabled={isInvalid} type="submit">
          Sign In
        </Button>
        </Form>
      </Segment>
         <Message>

      <p>  Don't have an Account?
        <a href="/signup"> Sign Up </a>   <PasswordForgetLink /></p>

      </Message>

          {error && <p>{error.message}</p>}
      </Grid.Column>
      </Grid>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      <Grid centered columns={4.5}>
      <form onSubmit={this.onSubmit}>

          <b>OR</b>
<p></p>
        <Button color="pink" fluid size="large" type="submit">
          Sign In with Google
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      </Grid>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (


      <Grid centered columns={5}>
      <form onSubmit={this.onSubmit}>
            <p> </p>
        <Button color="olive" fluid size="large" type="submit">
          Sign In with Facebook
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      </Grid>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      <Grid centered columns={5}>
      <form onSubmit={this.onSubmit}>

                 <p> </p>
        <Button color="teal" fluid size="large" type="submit">
          Sign In with Twitter
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      </Grid>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
