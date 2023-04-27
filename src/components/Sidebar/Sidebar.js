/*eslint-disable*/
import React, { useState, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { getItem } from "api/storage/storage";

import PerfectScrollbar from "perfect-scrollbar";
let ps;
import { GeneralContext } from "providers/GeneralContext";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const token = getItem("token");
  const usersName = getItem("user");
  const id = getItem("id");
  const classes = useStyles();
  const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);

  const [drawerlogo, setDrawerLogo] = useState(true);
  const [scroll, setScroll] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sidebarScrol = React.createRef();

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarScrol.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [sidebarScrol]);

  const handleScroll = (event) => {
    console.log(event.currentTarget.scrollTop, "event");
    if (event.currentTarget.scrollTop > 0) setScroll(true);
    else setScroll(false);
  };

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }

  const { color, logo, image, logoText, routes } = props;
  var links = (
    <div
      ref={sidebarScrol}
      className={classes.scroller}
      onScroll={handleScroll}
    >
      <List className={classes.list}>
        {routes.map((prop, key) => {
          var activePro = " ";
          var listItemClasses;

          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path),
          });

          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.path),
          });
          return (
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  />
                )}
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    </div>
  );

  var brand = (
    <div className={classes.logo}>
      <a
        href={`http://localhost:3000/adminSite/${id}/${token}/${usersName}`}
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
        target="_blank"
      >
        <div className={drawerlogo ? classes.logoImage : classes.logoImageText}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>

        <p
          style={{
            color: "#E30612",
            transitionDelay: "5s",
            transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
            lineHeight: "0px",
            marginTop: "25px",
          }}
        >
          {drawerlogo ? "" : logoText}
        </p>

      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
              [classes.showLogo]: drawerlogo,
              [classes.showLogoTitle]: !drawerlogo,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          onMouseOver={() => {
            setDrawerLogo(false);
          }}
          onMouseLeave={() => {
            setDrawerLogo(true);
          }}
        >
          {brand}


          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
              [classes.showLogo]: drawerlogo,
              [classes.showLogoTitle]: !drawerlogo,
            }),
          }}
          onMouseOver={() => {
            setDrawerLogo(false);
          }}
          onMouseLeave={() => {
            setDrawerLogo(true);
          }}
        // style={{ width: drawerWidth }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <a
            href="https://www.viuna-ict.com"
            target="_blank"
            style={
              !drawerlogo
                ? {
                  textAlign: "center",
                  padding: "17px 20px",
                  color: "#4D4D4D",
                  fontSize: "14px",
                  zIndex: "999",
                  position: "absolute",
                  bottom: "0px",
                  width: 200,
                }
                : {
                  display: "none",
                }
            }
          >
            توسعه توسط تیم نرم‌افزاری ویونا
          </a>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
