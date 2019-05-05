import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";

import {SignUpLink} from "../SignUp/SignUp";
import {PasswordForgetLink} from "../PasswordForget/PasswordForget";
import {withFirebase} from "../../server/Firebase";
import * as ROUTES from "../../constants/routes";
import Alert from "react-bootstrap/Alert";

import {Button, Form, Grid, Header, Segment, Message} from "semantic-ui-react";

const SignInPage = () => {
	const [error, setError] = React.useState(null);
  console.log(error && error);
	return (
		<Grid column={1}>
			<Grid.Row>
				<SignInForm setErrorMessage={setError} />
			</Grid.Row>
			<Grid.Row centered>
				<SignInGoogle setErrorMessage={setError} />
				<SignInFacebook setErrorMessage={setError} />
				<SignInTwitter setErrorMessage={setError} />
			</Grid.Row>
      <Grid.Row centered>
      {error && (
        <Message negative>
          <Message.Header>Oh snap! You got an error!</Message.Header>
          <Message.Content>{error.message}</Message.Content>
        </Message>
      )}
      </Grid.Row>
		</Grid>
	);
};

const INITIAL_STATE = {
	email: "",
	password: "",
	error: null
};

const ERROR_CODE_ACCOUNT_EXISTS =
	"auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = {...INITIAL_STATE};
	}

	onSubmit = event => {
		const {email, password} = this.state;

		this.props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({...INITIAL_STATE});
				this.props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				this.props.setErrorMessage(error);
			});

		event.preventDefault();
	};

	onChange = event => {
		this.setState({[event.target.name]: event.target.value});
	};

	render() {
		const {email, password, error} = this.state;

		const isInvalid = password === "" || email === "";

		return (
			<Grid centered columns={2}>
				<Grid.Column>
					<Header as="h2" textAlign="center">
						<h1>Sign In</h1>
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
							<Button
								color="blue"
								fluid
								size="large"
								disabled={isInvalid}
								type="submit"
							>
								Sign In
							</Button>
						</Form>
					</Segment>
					<Message>
						<p>
							{" "}
							Don't have an Account?
							<a href="/signup"> Sign Up </a> <PasswordForgetLink />
						</p>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

class SignInGoogleBase extends Component {
	constructor(props) {
		super(props);

		this.state = {error: null};
	}

	onSubmit = event => {
		this.props.firebase
			.doSignInWithGoogle()
			.then(socialAuthUser => {
				// Create a user in your Firebase Realtime Database too
				return this.props.firebase.addGoogleUserToDB(socialAuthUser);
			})
			.then(() => {
				this.setState({error: null});
				this.props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
					error.message = ERROR_MSG_ACCOUNT_EXISTS;
				}

				this.props.setErrorMessage(error);
			});

		event.preventDefault();
	};

	render() {
		const {error} = this.state;

		return (
			<Button color="pink" size="large" onClick={this.onSubmit}>
				Sign In with Google
			</Button>
		);
	}
}

class SignInFacebookBase extends Component {
	constructor(props) {
		super(props);

		this.state = {error: null};
	}

	onSubmit = event => {
		this.props.firebase
			.doSignInWithFacebook()
			.then(socialAuthUser => {
				// Create a user in your Firebase Realtime Database too
				return this.props.firebase.user(socialAuthUser.user.uid).set(
					{
						username: socialAuthUser.additionalUserInfo.profile.name,
						email: socialAuthUser.additionalUserInfo.profile.email
					},
					{merge: true}
				);
			})
			.then(() => {
				this.setState({error: null});
				this.props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
					error.message = ERROR_MSG_ACCOUNT_EXISTS;
				}

				this.props.setErrorMessage(error);
			});

		event.preventDefault();
	};

	render() {
		const {error} = this.state;

		return (
			<Button color="olive" size="large" type="submit">
				Sign In with Facebook
			</Button>
		);
	}
}

class SignInTwitterBase extends Component {
	constructor(props) {
		super(props);

		this.state = {error: null};
	}

	onSubmit = event => {
		this.props.firebase
			.doSignInWithTwitter()
			.then(socialAuthUser => {
				// Create a user in your Firebase Realtime Database too
				return this.props.firebase.user(socialAuthUser.user.uid).set(
					{
						username: socialAuthUser.additionalUserInfo.profile.name,
						email: socialAuthUser.additionalUserInfo.profile.email
					},
					{merge: true}
				);
			})
			.then(() => {
				this.setState({error: null});
				this.props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
					error.message = ERROR_MSG_ACCOUNT_EXISTS;
				}

				this.props.setErrorMessage(error);
			});

		event.preventDefault();
	};

	render() {
		const {error} = this.state;

		return (
			<Button color="teal" size="large" type="submit">
				Sign In with Twitter
			</Button>
		);
	}
}

const SignInForm = compose(
	withRouter,
	withFirebase
)(SignInFormBase);

const SignInGoogle = compose(
	withRouter,
	withFirebase
)(SignInGoogleBase);

const SignInFacebook = compose(
	withRouter,
	withFirebase
)(SignInFacebookBase);

const SignInTwitter = compose(
	withRouter,
	withFirebase
)(SignInTwitterBase);

export default SignInPage;

export {SignInForm, SignInGoogle, SignInFacebook, SignInTwitter};
