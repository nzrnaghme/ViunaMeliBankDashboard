import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styles from "assets/jss/material-dashboard-react/layouts/rtlStyle.js";
import register from "assets/img/login01.png";
import login from "assets/img/login01.png";
import { makeStyles } from "@material-ui/core/styles";
import RegisterPage from "views/Pages/RegisterPage";
import LoginPage from "views/Pages/LoginPage";


const useStyles = makeStyles(styles);
export default function Authentication() {
    const classes = useStyles();

    const getBgImage = () => {
        if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
            return register;
        } else if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
            return login;
        }
    };

    return (
        <div>
            <div className={classes.wrapper}>
                <div

                    style={{
                        backgroundImage: "url(" + getBgImage() + ")",
                        backgroundSize: "cover"
                    }}
                >
                    <Switch>
                        <Route path={"/auth/login-page"} component={LoginPage} />
                        <Route path={"/auth/register-page"} component={RegisterPage} />
                        <Redirect to="/auth/register-page" />
                    </Switch>
                </div>
            </div>
        </div>
    )
}