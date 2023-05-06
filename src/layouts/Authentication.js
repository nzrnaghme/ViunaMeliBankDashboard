import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styles from "assets/jss/material-dashboard-react/layouts/rtlStyle.js";
import login from "assets/img/login01.png";
import { makeStyles } from "@material-ui/core/styles";
import LoginPage from "views/Pages/LoginPage";


const useStyles = makeStyles(styles);
export default function Authentication() {
    const classes = useStyles();

    const getBgImage = () => {
        if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
            return login;
        }
    };

    return (
        <div>
            <div className={classes.wrapper} style={{
                max_height: "100vh"
            }}>
                <div
                    style={{
                        backgroundImage: "url(" + getBgImage() + ")",
                        backgroundSize: "contain",
                        height: "100vh"
                    }}
                >
                    <Switch>
                        <Route path={"/auth/login-page"} component={LoginPage} />
                        <Redirect to="/auth/login-page" />
                    </Switch>
                </div>
            </div>
        </div>
    )
}