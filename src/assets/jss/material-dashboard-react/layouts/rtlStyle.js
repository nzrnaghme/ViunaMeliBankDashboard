import {
  drawerWidth,
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";

import myBg from './../../../img/bg.png';

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    direction: "rtl",
    background: myBg,
    opaccity: ".7",
    overflowY: "hidden",
    overflowX: "hidden"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "left",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    marginTop: "-30px"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)",
  },
  container,
  map: {
    marginTop: "70px",
  },
});

export default appStyle;
