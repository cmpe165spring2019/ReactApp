import React, {Component} from "react";

// Backend functionality
import {AuthUserContext} from "../../server/Session";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import {withFirebase} from "../../server/Firebase/index";

// Components
import {Link} from "react-router-dom";
import {Menu} from "semantic-ui-react";

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: "",
			activeItem: ""
		};
	}

	handleItemClick = (e, {name}) => {
		this.setState({activeItem: name});
		if (name === "signout") {
			this.signOut();
		}
	};

	signOut = () => this.props.firebase.doSignOut();

	render() {
		const {activeItem} = this.state;

		const NavigationAuth = ({authUser}) => (
			<div>
				<Menu pointing secondary>
					<Menu.Item
						as={Link}
						to={ROUTES.LANDING}
						name="landing"
						active={activeItem === "landing"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						as={Link}
						to={ROUTES.HOME}
						name="home"
						active={activeItem === "home"}
						onClick={this.handleItemClick}
					/>

					<Menu.Item
						as={Link}
						to={ROUTES.ACCOUNT}
						name="account"
						active={activeItem === "account"}
						onClick={this.handleItemClick}
					/>
					{authUser.roles.includes(ROLES.ADMIN) && (
						<Menu.Item
							as={Link}
							to={ROUTES.ADMIN}
							name="admin"
							active={activeItem === "admin"}
							onClick={this.handleItemClick}
						/>
					)}

					<Menu.Menu position="right">
						<Menu.Item
							as={Link}
							to={ROUTES.HOTEL_RESERVATION}
							name="myReservations"
							active={activeItem === "myReservations"}
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							as={Link}
							to={ROUTES.LANDING}
							name="signout"
							active={activeItem === "signout"}
							onClick={this.handleItemClick}
						/>
					</Menu.Menu>
				</Menu>
			</div>
		);

		const NavigationNonAuth = () => (
			<div>
				<Menu pointing secondary>
					<Menu.Item
						as={Link}
						to={ROUTES.LANDING}
						name="landing"
						active={activeItem === "landing"}
						onClick={this.handleItemClick}
					/>

					<Menu.Item
						as={Link}
						to={ROUTES.HOME}
						name="home"
						active={activeItem === "home"}
						onClick={this.handleItemClick}
					/>

					<Menu.Menu position="right">
						<Menu.Item
							as={Link}
							to={ROUTES.SIGN_IN}
							name="Sign In"
							active={activeItem === "signin"}
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							as={Link}
							to={ROUTES.SIGN_UP}
							name="Sign Up"
							active={activeItem === "signup"}
							onClick={this.handleItemClick}
						/>
					</Menu.Menu>
				</Menu>
			</div>
		);

		return (
			<AuthUserContext.Consumer>
				{authUser =>
					authUser ? (
						<NavigationAuth authUser={authUser} />
					) : (
						<NavigationNonAuth />
					)
				}
			</AuthUserContext.Consumer>
		);
	}
}

export default withFirebase(Navigation);
