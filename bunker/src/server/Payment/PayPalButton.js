import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import {paypalConfig} from "../Firebase/config";
const CLIENT = paypalConfig;

class PayPalButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showButton: false
		};

		window.React = React;
		window.ReactDOM = ReactDOM;
	}

	componentDidMount() {
		const {isScriptLoaded, isScriptLoadSucceed} = this.props;

		if (isScriptLoaded && isScriptLoadSucceed) {
			this.setState({showButton: true});
		}
	}

	componentWillReceiveProps(nextProps) {
		const {isScriptLoaded, isScriptLoadSucceed} = nextProps;

		const isLoadedButWasntLoadedBefore =
			!this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;

		if (isLoadedButWasntLoadedBefore) {
			if (isScriptLoadSucceed) {
				this.setState({showButton: true});
			}
		}
	}

	render() {
		const {total, currency, commit, onSuccess, onError, onCancel} = this.props;
		const env = "sandbox";
		const client = CLIENT;
		const {showButton} = this.state;

		const paypal = window.PAYPAL;

		const payment = () =>
			paypal.rest.payment.create(env, client, {
				transactions: [
					{
						amount: {
							total,
							currency
						}
					}
				]
			});

		const onAuthorize = (data, actions) =>
			actions.payment.execute().then(() => {
				const payment = {
					paid: true,
					cancelled: false,
					payerID: data.payerID,
					paymentID: data.paymentID,
					paymentToken: data.paymentToken,
					returnUrl: data.returnUrl
				};

				onSuccess(payment);
			});

		return (
			<div>
				{showButton && (
					<paypal.Button.react
						env={env}
						client={client}
						commit={commit}
						payment={payment}
						onAuthorize={onAuthorize}
						onCancel={onCancel}
						onError={onError}
					/>
				)}
			</div>
		);
	}
}

export default scriptLoader("https://www.paypalobjects.com/api/checkout.js")(
	PayPalButton
);
