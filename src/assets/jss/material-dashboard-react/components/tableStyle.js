import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
} from "assets/jss/material-dashboard-react.js";

const tableStyle = (theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  ActiveTeacher: {
    width: 60,
    height: 25,
    backgroundColor: successColor[3],
    textAlign: "center",
    ...defaultFont,
    borderRadius: 20,
    cursor: "pointer"
  },
  deActiveTeacher: {
    width: 60,
    height: 25,
    backgroundColor: dangerColor[3],
    textAlign: "center",
    ...defaultFont,
    borderRadius: 20,
    cursor: "pointer"
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle",
  },
  warningTableHeader: {
    color: warningColor[0],
  },
  primaryTableHeader: {
    color: primaryColor[0],
  },
  dangerTableHeader: {
    color: dangerColor[0],
  },
  successTableHeader: {
    color: successColor[0],
  },
  infoTableHeader: {
    color: infoColor[0],
  },
  roseTableHeader: {
    color: roseColor[0],
  },
  grayTableHeader: {
    color: grayColor[0],
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    "&, &$tableCell": {
      fontSize: "1em",
    },
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontSize: "0.8125rem",
    textAlign: "center"
  },
  tableResponsive: {
    width: "100%",
    overflowX: "auto",
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  showMessage: {
    borderRightColor: 'blue',
    borderRightWidth: 3,
    borderRightStyle: 'solid',
    backgroundColor: 'aliceblue',
  },
  hideMessage:{
    backgroundColor: 'none',
    borderRightStyle:'none',
    borderRightColor:'none'
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0",
  },
  tableActionButtonIcon: {
    width: "18px",
    height: "18px",
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor[0],
    boxShadow: "none",
  },
  Add: {
    backgroundColor: "transparent",
    color: successColor[0],
    boxShadow: "none",
  },
  courseShow: {
    backgroundColor: "transparent",
    color: roseColor[0],
    boxShadow: "none",
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor[0],
    boxShadow: "none",
  },
  PersonIcon: {
    backgroundColor: "transparent",
    color: infoColor[0],
    boxShadow: "none",
  },
  Insert: {
    backgroundColor: "transparent",
    color: infoColor[1],
    boxShadow: "none",
  }

});

export default tableStyle;
