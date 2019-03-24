import React from 'react';

// Backend functionality
import { AuthUserContext } from '../server/Session';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

// Components
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'
import SignOutButton from '../pages/SignOut/SignOut';

const Navigation = () => (
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

const NavigationAuth = ({ authUser }) => (

    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {authUser.roles.includes(ROLES.ADMIN) && (
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
        )}
        <li>
            <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>HOME</Link>
        </li>
    </ul>
);

export default Navigation;