import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "layouts/Main.js";
import Login from "layouts/Authentication"
import UserProfile from "views/UserProfile/UserProfile";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Main} />
            <Route path="/auth/sign-in" component={Login} />
            <Route path="/dashboard" component={Main} />
            <Route path="/user" component={UserProfile} />
            <Redirect from="/"  to="/auth/sign-in" />
        </Switch>
    )
}