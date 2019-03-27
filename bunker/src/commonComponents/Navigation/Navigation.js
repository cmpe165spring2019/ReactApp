import React, { Component } from "react";

// Backend functionality
import { AuthUserContext } from '../../server/Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../../server/Firebase/index';

// Components
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'

class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            firebase: null,
            location: "",
            activeItem: '',
        }
    }

    componentDidMount(){
        this.setState(
            {
                firebase: this.props.firebase
            }
        )
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
                <Menu pointing secondary>
                <Link to={ROUTES.LANDING}>
                <Menu.Item
                    name='landing'
                    active={activeItem === 'landing'}
                    onClick={this.handleItemClick}
                />
                </Link>
                <Link to={ROUTES.HOME}>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                </Link>
                <Link to={ROUTES.ACCOUNT}>
                <Menu.Item
                    name='account'
                    active={activeItem === 'account'}
                    onClick={this.handleItemClick}
                />
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
                <Link to={ROUTES.HOTEL_RESERVATION}>
                <Menu.Item
                name='myReservations'
                active={this.state.activeItem === 'myReservations'}
                onClick={this.handleItemClick}
                />
                </Link>

                    <Menu.Item
                    name='signout'
                    active={this.state.activeItem === 'signout'}
                    onClick={this.handleItemClick}
                    />
                </Menu.Menu>
                </Menu>

            </div>
        );

        const NavigationNonAuth = () => (
            <div>
            <Menu pointing secondary>
            <Link to={ROUTES.LANDING}>
            <Menu.Item
                name='landing'
                active={this.state.activeItem === 'landing'}
                onClick={this.handleItemClick}
            />
            </Link>
            <Link to={ROUTES.HOME}>
            <Menu.Item
                name='home'
                active={this.state.activeItem === 'home'}
                onClick={this.handleItemClick}
            />
            </Link>


            <Menu.Menu position='right'>
            <Link to={ROUTES.SIGN_IN}>
                <Menu.Item
                name='signin'
                active={this.state.activeItem === 'signin'}
                onClick={this.handleItemClick}
                />
            </Link>
            <Link to={ROUTES.SIGN_UP}>
                <Menu.Item
                name='signup'
                active={this.state.activeItem === 'signup'}
                onClick={this.handleItemClick}
                />
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
