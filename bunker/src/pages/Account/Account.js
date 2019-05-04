//This page can accessed by any registered user, but not guests
//You can change your password, email, etc here

import React, { Component } from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../../server/Session';
import { withFirebase } from '../../server/Firebase';
import PasswordChangeForm from '../PasswordChange/PasswordChange';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Icon,
  Input,
} from 'semantic-ui-react';
// import Background from "../../images/accountBackground.jpeg";
import Background from "../../images/accountBackground1.jpg";


// const SIGN_IN_METHODS = [
//   {
//     id: 'password',
//     provider: null,
//   },
//   {
//     id: 'google.com',
//     provider: 'googleProvider',
//   },
//   {
//     id: 'facebook.com',
//     provider: 'facebookProvider',
//   },
//   {
//     id: 'twitter.com',
//     provider: 'twitterProvider',
//   },
// ];
const backgroundStyle = {
    // width: "100%",
    // height: "100%",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "null",
    backgroundSize: 'cover',
    overflow: 'hidden',
};

const AccountPage = () => (

  <AuthUserContext.Consumer>
    {authUser => (
        <div style={backgroundStyle}>
      <Grid centered columns={3}>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>

      <Grid.Row></Grid.Row>
        <div>
            {/*<Icon name="user" size="big"/>*/}
            <font size="+5" color="white">{"Welcome, "}{authUser.username}</font>
        </div>
        <Grid.Row></Grid.Row>

        <Icon color="grey" name="mail" size="big"/>
          <font size="+3" color="white">{authUser.email}</font>

        <Grid.Row></Grid.Row>

          <Grid.Row></Grid.Row>
        <PasswordChangeForm />
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>

        {/*<LoginManagement authUser={authUser} />*/}
      </Grid>
        </div>
    )}
  </AuthUserContext.Consumer>
);

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ?
      (
    <Button
      fluid
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </Button>
  ) : (
    <Button
      fluid
      onClick={() => onLink(signInMethod.provider)}
    >
        <Icon name="facebook" size="big"/>
        Sign In with Facebook
    </Button>
  ) ;

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: '', passwordTwo: '' };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: '', passwordTwo: '' });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      onlyOneLeft,
      isEnabled,
      signInMethod,
      onUnlink,
    } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return isEnabled ? (

      <Button
        fluid
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </Button>
    ) : (

      <Form size="large" onSubmit={this.onSubmit}>

        {/*<Form.Input*/}
          {/*fluid*/}
          {/*name="passwordOne"*/}
          {/*value={passwordOne}*/}
          {/*onChange={this.onChange}*/}
          {/*type="password"*/}
          {/*placeholder="New Password"*/}
        {/*/>*/}
        {/*<Form.Input*/}
          {/*name="passwordTwo"*/}
          {/*value={passwordTwo}*/}
          {/*onChange={this.onChange}*/}
          {/*type="password"*/}
          {/*placeholder="Con New Password"*/}
        {/*/>*/}

        {/*<Button disabled={isInvalid} fluid>*/}
          {/*Link {signInMethod.id}*/}
        {/*</Button>*/}

      </Form>
    );
  }
}

// const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
