import React, { useContext } from "react";
// import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Hidden from "@material-ui/core/Hidden";
// import Poppers from "@material-ui/core/Popper";
// // @material-ui/icons
// import Person from "@material-ui/icons/Person";
// import Notifications from "@material-ui/icons/Notifications";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/rtlHeaderLinksStyle.js";
import { Tooltip } from "@material-ui/core";
import { removeItem } from "api/storage/storage";
import { GeneralContext } from "providers/GeneralContext";


const useStyles = makeStyles(styles);

export default function RTLNavbarLinks() {
  const classes = useStyles();
  const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);

  // const [open, setOpen] = React.useState(null);
  // const handleToggle = (event) => {
  //   if (open && open.contains(event.target)) {
  //     setOpen(null);
  //   } else {
  //     setOpen(event.currentTarget);
  //   }
  // };

  // const handleClose = () => {
  //   setOpen(null);
  // };

  return (
    <div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
        onClick={() => {
          onConfirmSetter('از حساب خود خارج میشوید؟', () => {
            removeItem('id')
            removeItem('role')
            removeItem('token')
          })
          setConfirmPopupOpen(true)
        }}
      >
        <Tooltip title="خروج از حساب کاربری" placement="top">
          <ExitToAppRoundedIcon className={classes.icons} />
        </Tooltip>
      </Button>
    </div >
  );
}
