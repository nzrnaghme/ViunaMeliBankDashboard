import { getItem } from 'api/storage/storage';
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const userInfo = getItem('id')

    const isAuthenticated = (path) => {
        return userInfo != null && userInfo != "";
    };

    const routeComponent = (props) => {
        return isAuthenticated(props.match.path) ? (React.createElement(component, props)) : (
            <Redirect to={{ pathname: "/Login" }} />
        );
    }

    return <Route {...rest} render={routeComponent} />
};

export default PrivateRoute;