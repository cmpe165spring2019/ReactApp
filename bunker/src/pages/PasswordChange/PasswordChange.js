import React, { Component } from 'react';

import { withFirebase } from '../../server/Firebase';

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
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
      <Grid.Row columns={5}>
      <Grid.Column></Grid.Column>
      <Grid.Column></Grid.Column>
      <Grid.Column>
      <Form onSubmit={this.onSubmit}>
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
        <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
      </Grid.Column>
      <Grid.Column></Grid.Column>
      <Grid.Column></Grid.Column>
      </Grid.Row>
    );
  }
}

export default withFirebase(PasswordChangeForm);
