import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  // grayColor,
} from "assets/jss/material-dashboard-react.js";

const headerStyle = (theme) => ({
  appBar: {
    backgroundImage: "linear-gradient(#474747, #e1dfdf)",
    backgroundColor: "transparent",
    // boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    // position: "absolute",
    width: "91.5%",
    // paddingTop: "10px",
    zIndex: 200,
    // color: grayColor[5],
    color: 'rgb(52, 71, 103)',
    paddingTop: '8px',
    paddingBottom: '8px',
    border: "0",
    borderRadius: "7px",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block",
    position: "fixed",
    // position: 'absolute',
    opacity: 1,
    // background: "rgba(255, 255, 255, 0.8)",
    right: "4.2%",
    margin: "10px 25px",
    boxShadow: 'none',
    [theme.breakpoints.down("md")]: {
      right: "-0.82%"
    },
    // boxShadow: 'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem'
  },
  appBar2: {
    backgroundImage: "linear-gradient(#474747, #e1dfdf)",
    boxShadow: 'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem'

  },
  container: {
    ...container,
    minHeight: "50px",

  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    letterSpacing: "unset",
    // lineHeight: "30px",
    fontSize: "18px",
    // borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    lineHeight: "1px",
    // margin: "0",
    // "&:hover,&:focus": {
    //   background: "transparent",
    // },
  },
  titleApp: {
    ...defaultFont,
    lineHeight: "1px",
    color: "white"
  },
  appResponsive: {
    top: "8px",
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
});

export default headerStyle;
