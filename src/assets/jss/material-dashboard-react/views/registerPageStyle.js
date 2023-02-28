import {
  cardTitle,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

const registerPageStyle = theme => ({
  ...customCheckboxRadioSwitch,
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    "@media (min-width: 768px)": {
      width: "750px"
    },
    "@media (min-width: 992px)": {
      width: "970px"
    },
    "@media (min-width: 1200px)": {
      width: "1170px"
    },
    "&:before,&:after": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      clear: "both"
    },
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor
    },
    marginLeft: "5px",
    marginRight: "5px",
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  cardDescription: {
    textAlign: "center",
    color: grayColor[0],
    marginTop: 0,
    marginBottom: "1rem"
  },
  socialLine: {
    padding: "0.9375rem 0"
  },
  formControlClassName: {
    margin: "0",
    paddingBottom: "0",
    "& + $formControlClassName": {
      marginTop: "5px"
    }
  },
  checkboxLabelControlClassName: {
    marginTop: "16px",
    marginRight: "0px",
  },
  checkboxLabel: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.4)"
  },
  login: {
    marginTop: 100,
    
  }
});

export default registerPageStyle;
