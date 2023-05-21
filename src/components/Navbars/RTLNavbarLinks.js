import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

  return (
    <div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "transparent"}
        justIcon={window.innerWidth > 959}
        aria-label="Dashboard"
        className={classes.buttonLink}
        onClick={() => {
          onConfirmSetter('از حساب خود خارج میشوید؟', () => {
            removeItem('user')
          })
          setConfirmPopupOpen(true)
        }}
      >
        <Tooltip title="خروج از حساب کاربری" placement="top">
          <ExitToAppRoundedIcon className={classes.icons}/>
        </Tooltip>
      </Button>
    </div >
  );
}
