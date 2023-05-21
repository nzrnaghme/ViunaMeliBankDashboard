import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import { getItem } from "api/storage/storage";

// import Button from "components/CustomButtons/Button.js";

//hooks
import { useRouteName } from "hooks";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const User = getItem('user')
  const classes = useStyles();
  const routeName = useRouteName();
  const { scrollAction } = props;
  const appBarClasses = classNames({
    [classes.appBar2]: scrollAction,
  });

  return (
    <AppBar className={[classes.appBar, appBarClasses]}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <p className={classes.titleApp} style={{ paddingBottom: 10 }}>
            {routeName}
          </p>
          <p className={classes.titleApp}>سامانه مدیریت کاربران بانک ملی</p>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <div style={{ display: "flex", alignItems: "baseline" }}>{User} <RTLNavbarLinks /> </div> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
  scrollAction: PropTypes.bool,
};
