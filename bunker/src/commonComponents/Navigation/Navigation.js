import React, { Component } from "react";

// Backend functionality
import { AuthUserContext } from '../../server/Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../../server/Firebase/index';

// Components
import { Link } from 'react-router-dom';
import { Menu, Button, Dropdown, Image, Icon } from 'semantic-ui-react';
import BunkerImage from '../../images/bunker.png';

const user = JSON.parse(localStorage.getItem("authUser"));

class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            firebase: null,
            location: "",
            activeItem: '',
            reward_points: 0,
        }
    }

    componentDidMount(){
        this.setState(
            {
                firebase: this.props.firebase
            }
        )
        if(user)
       { this.props.firebase.subscribeUserReward(user.uid,
            reward_points => {
              this.setState({
                reward_points: reward_points
              })
            }
        )}  
    }

    handleItemClick = (e, {name}) => {
        this.setState ({ activeItem: name });
        if ( name === "signout") {
            this.signOut();
        }
    }

    signOut = () => {
        const { firebase } = this.state;
        firebase.doSignOut();
    }

    render() {
        const { activeItem } = this.state.activeItem;

        const NavigationAuth = ({ authUser }) => (

            <div>
                <Menu pointing secondary size="medium">
                <Link to={ROUTES.LANDING}>
                <Menu.Item
                    name='landing'
                    active={activeItem === 'landing'}
                    onClick={this.handleItemClick}
                >
                {/* <Image src = {BunkerImage} size='tiny'/> */}
                <Icon name='home' />
                </Menu.Item>
                </Link>
                <Link to={ROUTES.HOME}>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                            <Icon name='hotel' />
            Book Hotels
            </Menu.Item>
                </Link>
                <Link to={ROUTES.ACCOUNT}>
                <Menu.Item
                    name='account'
                    active={activeItem === 'account'}
                    onClick={this.handleItemClick}
                >
                 <Icon name='user' />
                Account
              </Menu.Item>
                </Link>
                { authUser.roles.includes(ROLES.ADMIN) && (
                    <Link to={ROUTES.ADMIN}>
                    <Menu.Item
                        name='admin'
                        active={activeItem === 'admin'}
                        onClick={this.handleItemClick}
                    />
                    </Link>
                )}

                <Menu.Menu position='right'>
                <Menu.Item>
                  <Icon name="gift" color="red"/>Reward Points: {this.state.reward_points}
                </Menu.Item>
                <Link to={ROUTES.HOTEL_RESERVATION}>
                <Menu.Item
                name='myReservations'
                active={this.state.activeItem === 'myReservations'}
                onClick={this.handleItemClick}
                >
                            <Icon name='address card' />
            My Reservations
            </Menu.Item>
                </Link>

                    <Menu.Item
                    name='signout'
                    active={this.state.activeItem === 'signout'}
                    onClick={this.handleItemClick}
                    >
                                                <Icon name='logout' />
Sign Out
                </Menu.Item>
                </Menu.Menu>
                </Menu>

            </div>
        );

        const NavigationNonAuth = () => (
            <div>
            <Menu pointing secondary size="medium">
            <Link to={ROUTES.LANDING}>
            <Menu.Item
                name='landing'
                active={this.state.activeItem === 'landing'}
                onClick={this.handleItemClick}
            >
            {/* <Image src = {BunkerImage} size='tiny'/> */}
            <Icon name='home' />
            </Menu.Item>
            </Link>
            <Link to={ROUTES.HOME}>
            <Menu.Item
                name='home'
                active={this.state.activeItem === 'home'}
                onClick={this.handleItemClick}
            >
            <Icon name='hotel' />
            Book Hotels
            </Menu.Item>
            </Link>


            <Menu.Menu position='right'>
            <Link to={ROUTES.SIGN_IN}>
                <Menu.Item
                name='Sign In'
                active={this.state.activeItem === 'signin'}
                onClick={this.handleItemClick}
                >
                            <Icon name='sign-in' />
                            Sign In/Sign Up

                </Menu.Item>
            </Link>
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
        )
    }
}

export default withFirebase(Navigation);
