//will push to Github 03/24/19
import React, { Component } from 'react';

import { withFirebase } from '../../server/Firebase';

import {
    Container,
  Button,
  Form,
  Grid,
  Header,
  Segment,
    Divider,
  Message,
  Icon,
  Input,
}from 'semantic-ui-react';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Grid.Row columns={3}>
      <Grid.Column></Grid.Column>
      {/*<Grid.Column></Grid.Column>*/}
      <Grid.Column>
          <Segment  >
      <Form onSubmit={this.onSubmit}>
        <Header as={'h2'}>
            <Icon name='settings' color='grey'/>

            Account Settings
        </Header>
        <Divider/>
          <h3>Reset Password</h3>
        <Form.Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
          width='200'
        />
        <Form.Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <Button disabled={isInvalid} type="submit"  color='black' >
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
          </Segment>
      </Grid.Column>
      {/*<Grid.Column></Grid.Column>*/}
      <Grid.Column></Grid.Column>
      </Grid.Row>
    );
  }
}

export default withFirebase(PasswordChangeForm);
