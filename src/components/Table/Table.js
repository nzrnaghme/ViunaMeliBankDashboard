import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import stylesTool from "assets/jss/material-dashboard-react/tooltipStyle.js";
//icon
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import SearchIcon from '@material-ui/icons/Search';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RegularButton from "../CustomButtons/Button";

import "./index.css";
import CustomInput from "components/CustomInput/CustomInput";
// import CustomSelectInput from "components/CustomInput/CustomeSelectInput";

const useStyles = makeStyles(styles);
const useStylesTool = makeStyles(stylesTool);

export const User_Status = [
  {
    _id: 0,
    fullName: "غیر فعال"
  },
  {
    _id: 1,
    fullName: "فعال"
  }
];

export default function CustomTable(props) {
  const classes = useStyles();
  const classesTools = useStylesTool();

  const [showText0, setShowText0] = useState(false);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);

  const [nameSearch0, setNameSearch0] = useState(null);
  const [nameSearch1, setNameSearch1] = useState(null);
  const [nameSearch2, setNameSearch2] = useState(null);
  const [nameSearch3, setNameSearch3] = useState(null);

  // const [status, setStatus] = useState();

  const {
    tableHead,
    tableData,
    tableHeaderColor,
    currentPage,
    handleChangePage,
    handleChangeRowsPerPage,
    removeUser,
    EditUser,
    Users,
    editPass,
    rowsCount,
    currentGroupToUser,
    userToGroup,
    addUserToGroup,
    addToUser,
    removeGroupToUser,
    group,
    editGroup,
    removeGroup,
    groupToGroup,
    addToGroup,
    addGroupToGroup,
    removeGroupToGroup,
    groupToRole,
    addRoleToGroup,
    removeRoleToGroup,
    currentRoleToGroup,
    roles,
    addRole,
    userToRole,
    currentRoleToUser,
    removeRoleToUser,
    removeRole,
    editRole,
    config,
    EditConfig,
    removeConfig,
    roleToUser,
    AllDatas,
    SelectDatas,
    RoleToGroup,
    RoleToRole,
    totalCoun,
    NoNext,
    listFileUser,
    removeRowFromList
  } = props;


  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    <div style={(showText0 && key === 0) ? {
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                    } : (showText1 && key === 1) ? {
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                    } : (showText2 && key === 2) ? {
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                    } : (showText3 && key === 3) ? {
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                    } : {
                      display: "block"
                    }}>
                      {(showText0 && prop != "عملیات" && key === 0) ?
                        <CustomInput
                          rtlActive
                          labelText={prop}
                          value={nameSearch0}
                          onChange={(e) => {
                            setNameSearch0(e);
                          }}
                          formControlProps={{
                            fullWidth: false,
                          }}
                          className={"showLabel"}
                          EnterAction={() => {
                            if (nameSearch0)
                              SelectDatas(nameSearch0, key)
                            else {
                              AllDatas()
                              setShowText0(false)
                            }
                          }}
                        />
                        :
                        (showText1 && prop != "عملیات" && key === 1) ?
                          <CustomInput
                            rtlActive
                            labelText={prop}
                            value={nameSearch1}
                            onChange={(e) => {
                              setNameSearch1(e);
                            }}
                            formControlProps={{
                              fullWidth: false,
                            }}
                            className={"showLabel"}
                            style={{ width: 50 }}
                            EnterAction={() => {
                              if (nameSearch1)
                                SelectDatas(nameSearch1, key)
                              else {
                                AllDatas()
                                setShowText1(false)
                              }
                            }}
                          />
                          :
                          (showText2 && prop != "عملیات" && key === 2) ?
                            <CustomInput
                              rtlActive
                              labelText={prop}
                              value={nameSearch2}
                              onChange={(e) => {
                                setNameSearch2(e);
                              }}
                              formControlProps={{
                                fullWidth: false,
                              }}
                              className={"showLabel"}
                              EnterAction={() => {
                                if (nameSearch2)
                                  SelectDatas(nameSearch2, key)
                                else {
                                  AllDatas();
                                  setShowText2(false)
                                }
                              }}
                            />
                            :
                            (showText3 && prop != "عملیات" && key === 3) ?

                              // <CustomSelectInput
                              //   labelText={prop}
                              //   value={status}
                              //   options={User_Status}
                              //   handleChange={(e) => {
                              //     setStatus(e.target.value);
                              //     SelectDatas(e.target.value, 3)
                              //   }}

                              // />
                              <CustomInput
                                rtlActive
                                labelText={prop}
                                value={nameSearch3}
                                onChange={(e) => {
                                  setNameSearch3(e);
                                }}
                                formControlProps={{
                                  fullWidth: false,
                                }}
                                className={"showLabel"}
                                EnterAction={() => {
                                  if (nameSearch3)
                                    SelectDatas(nameSearch3, key)
                                  else {
                                    AllDatas();
                                    setShowText3(false)
                                  }
                                }}
                              />
                              :
                              prop
                      }
                      {(prop != "عملیات" && !config && !listFileUser) &&
                        <Tooltip
                          id="tooltip-top-start"
                          title={`جستجو با ${prop}`}
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Key"
                            className={classes.tableActionButton}
                            onClick={() => {

                              switch (key) {
                                case 0:
                                  if (!nameSearch0 && showText0) {
                                    setShowText0(!showText0)
                                    AllDatas()
                                  } else if (nameSearch0 && showText0) {
                                    SelectDatas(nameSearch0, key);
                                    setShowText1(false)
                                    setShowText2(false)
                                    setShowText3(false)

                                  } else {
                                    setShowText0(!showText0)
                                    setShowText1(false)
                                    setShowText2(false)
                                    setShowText3(false)
                                    AllDatas()
                                    setNameSearch0(null)

                                  }
                                  break;
                                case 1:
                                  if (!nameSearch1 && showText1) {
                                    setShowText1(!showText1)
                                    AllDatas()
                                  } else if (nameSearch1 && showText1) {
                                    SelectDatas(nameSearch1, key)
                                    setShowText0(false)
                                    setShowText2(false)
                                    setShowText3(false)
                                  } else {
                                    setShowText1(!showText1)
                                    setShowText0(false)
                                    setShowText2(false)
                                    setShowText3(false)
                                    // AllDatas()
                                    setNameSearch1(null)
                                  }
                                  break;
                                case 2:
                                  if (!nameSearch2 && showText2) {
                                    setShowText2(!showText2)
                                    AllDatas()
                                  } else if (nameSearch2 && showText2) {
                                    SelectDatas(nameSearch2, key)
                                    setShowText1(false)
                                    setShowText0(false)
                                    setShowText3(false)
                                  } else {
                                    setShowText2(!showText2)
                                    setShowText1(false)
                                    setShowText0(false)
                                    setShowText3(false)
                                    AllDatas()
                                    setNameSearch2(null)
                                  }
                                  break;
                                case 3:
                                  if (!nameSearch3 && showText3) {
                                    setShowText3(!showText3)
                                    AllDatas()
                                  } else if (nameSearch3 && showText3) {
                                    SelectDatas(nameSearch3, key)
                                    setShowText1(false)
                                    setShowText0(false)
                                    setShowText2(false)
                                  } else {
                                    setShowText3(!showText3)
                                    setShowText1(false)
                                    setShowText0(false)
                                    setShowText2(false)
                                    AllDatas()
                                    setNameSearch3(null)
                                  }
                                  break;

                                default:
                                  if (!nameSearch0 && showText0) {
                                    setShowText0(!showText0)
                                    AllDatas()
                                  } else if (nameSearch0 && showText0) {
                                    SelectDatas(nameSearch0, key)
                                    setShowText1(false)
                                    setShowText2(false)
                                    setShowText3(false)
                                    AllDatas()
                                    setNameSearch0(null)

                                  } else setShowText0(!showText0)
                                  break;
                              }

                            }}
                          >
                            <SearchIcon
                              className={
                                classes.tableActionButtonIcon}
                            />
                          </IconButton>
                        </Tooltip>}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {Users && tableData
            ? tableData
              .map((row, index) => (
                <TableRow key={index} className={classes.tableBodyRow}>

                  <TableCell className={classes.tableCell}>
                    {row.USER_USERNAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_DISPLAYNAME ? row.USER_DISPLAYNAME : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_DESCRIPTION ? row.USER_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.USER_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {row.USER_BRANCH_CODE ? row.USER_BRANCH_CODE : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Tooltip
                      id="tooltip-top-start"
                      title="تغییر رمز"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Key"
                        className={classes.tableActionButton}
                        onClick={() => {
                          editPass(row);
                        }}
                      >
                        <VpnKeyIcon
                          className={
                            classes.tableActionButtonIcon
                          }
                        />
                      </IconButton>
                    </Tooltip>


                    <Tooltip
                      id="tooltip-top"
                      title="ویرایش"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => {
                          EditUser(row);
                        }}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="حذف"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => {
                          removeUser(row);
                        }}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon +
                            " " +
                            classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="اضافه کردن به کاربر"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => {
                          addUserToGroup(row);
                        }}
                      >
                        <AddCircleOutlineIcon
                          className={
                            classes.tableActionButtonIcon + " " + classes.Add
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            : ""}
          {config && tableData
            ? tableData
              .map((row, index) => (
                <TableRow key={index} className={classes.tableBodyRow}>
                  {/* <TableCell className={classes.tableCell}>
                    {row.CNF_STATE === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {row.CNF_NAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.CNF_TYPE}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.CNF_DESCRIPTION ? row.CNF_DESCRIPTION : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Tooltip
                      id="tooltip-top"
                      title="ویرایش"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => {
                          EditConfig(row);
                        }}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="حذف"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => {
                          removeConfig(row);
                        }}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon +
                            " " +
                            classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>

                  </TableCell>
                </TableRow>
              ))
            : ""}
          {group && tableData
            ? tableData
              .map((row, index) => (
                <TableRow key={index} className={classes.tableBodyRow}>

                  <TableCell className={classes.tableCell}>
                    {row.GROUP_NAME}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.GROUP_DISPLAYNAME ? row.GROUP_DISPLAYNAME : "..."}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_DESCRIPTION ? row.GROUP_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.GROUP_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    <Tooltip
                      id="tooltip-top"
                      title="ویرایش"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                      style={{ fontFamily: "IRANSANSX" }}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => {
                          editGroup(row);
                        }}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="حذف"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => {
                          removeGroup(row);
                        }}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon +
                            " " +
                            classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="اضافه کردن گروه به گروه"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => {
                          addGroupToGroup(row);
                        }}
                      >
                        <AddCircleOutlineIcon
                          className={
                            classes.tableActionButtonIcon + " " + classes.Add
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            : ""}
          {userToGroup && tableData
            ? tableData
              .slice(
                currentPage * rowsCount,
                currentPage * rowsCount + rowsCount
              )
              .map((row, index) => (
                <TableRow key={index} className={[classes.tableBodyRow, currentGroupToUser.includes(row.GROUP_NAME) && classes.getTable]}
                // style={currentGroupToUser.includes(row.GROUP_NAME) && { backgroundColor: "green" }}
                >
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_NAME}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.GROUP_DISPLAYNAME ? row.GROUP_DISPLAYNAME : "..."}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_DESCRIPTION ? row.GROUP_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.GROUP_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  {currentGroupToUser.includes(row.GROUP_NAME) ?
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن گروه از کاربر مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            removeGroupToUser(row);
                          }}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon + " " + classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    :
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن گروه به کاربر مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            addToUser(row);
                          }}
                        >
                          <AddCircleOutlineIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  }

                </TableRow>
              ))
            : ""}
          {userToRole && tableData
            ? tableData
              .slice(
                currentPage * rowsCount,
                currentPage * rowsCount + rowsCount
              )
              .map((row, index) => (
                <TableRow key={index} className={[classes.tableBodyRow, currentRoleToUser.includes(row.ROLE_NAME) && classes.getTable]}>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_NAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DISPLAYNAME ? row.ROLE_DISPLAYNAME : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DESCRIPTION ? row.ROLE_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.ROLE_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {currentRoleToUser.includes(row.ROLE_NAME) ?
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن نقش از کاربر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            removeRoleToUser(row);
                          }}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon + " " + classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip> :
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن نقش به کاربر مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            addToUser(row);
                          }}
                        >
                          <AddCircleOutlineIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    }

                  </TableCell>
                </TableRow>
              ))
            : ""}

          {groupToGroup && tableData
            ? tableData
              .slice(
                currentPage * rowsCount,
                currentPage * rowsCount + rowsCount
              )
              .map((row, index) => (
                <TableRow key={index} className={[classes.tableBodyRow, currentGroupToUser.includes(row.GROUP_NAME) && classes.getTable]}>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_NAME}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.GROUP_DISPLAYNAME ? row.GROUP_DISPLAYNAME : "..."}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_DESCRIPTION ? row.GROUP_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.GROUP_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  {currentGroupToUser.includes(row.GROUP_NAME) ?
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن گروه از گروه مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            removeGroupToGroup(row);
                          }}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon + " " + classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    :
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن گروه به گروه مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            addToGroup(row);
                          }}
                        >
                          <AddCircleOutlineIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  }

                </TableRow>
              ))
            : ""}


          {RoleToGroup && tableData
            ? tableData
              .slice(
                currentPage * rowsCount,
                currentPage * rowsCount + rowsCount
              )
              .map((row, index) => (
                <TableRow key={index} className={[classes.tableBodyRow, currentGroupToUser.includes(row.GROUP_NAME) && classes.getTable]}>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_NAME}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.GROUP_DISPLAYNAME ? row.GROUP_DISPLAYNAME : "..."}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_DESCRIPTION ? row.GROUP_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.GROUP_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  {currentGroupToUser.includes(row.GROUP_NAME) ?
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن گروه از نقش مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            removeGroupToGroup(row);
                          }}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon + " " + classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    :
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن گروه به نقش مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            addToGroup(row);
                          }}
                        >
                          <AddCircleOutlineIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  }

                </TableRow>
              ))
            : ""}


          {groupToRole && tableData
            ? tableData
              .slice(
                currentPage * rowsCount,
                currentPage * rowsCount + rowsCount
              )
              .map((row, index) => (
                <TableRow key={index} className={[classes.tableBodyRow, currentRoleToGroup.includes(row.ROLE_NAME) && classes.getTable]}>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_NAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DISPLAYNAME ? row.ROLE_DISPLAYNAME : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DESCRIPTION ? row.ROLE_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.ROLE_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {currentRoleToGroup.includes(row.ROLE_NAME) ?
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن نقش از گروه"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            removeRoleToGroup(row);
                          }}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon + " " + classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip> :
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن نقش به گروه"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            addRoleToGroup(row);
                          }}
                        >
                          <AddCircleOutlineIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    }

                  </TableCell>
                </TableRow>
              ))
            : ""}

          {RoleToRole && tableData
            ? tableData
              .slice(
                currentPage * rowsCount,
                currentPage * rowsCount + rowsCount
              )
              .map((row, index) => (
                <TableRow key={index} className={[classes.tableBodyRow, currentRoleToGroup.includes(row.ROLE_NAME) && classes.getTable]}>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_NAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DISPLAYNAME ? row.ROLE_DISPLAYNAME : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DESCRIPTION ? row.ROLE_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.ROLE_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {currentRoleToGroup.includes(row.ROLE_NAME) ?
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن نقش از نقش"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            removeRoleToGroup(row);
                          }}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon + " " + classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip> :
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن نقش به نقش"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            addRoleToGroup(row);
                          }}
                        >
                          <AddCircleOutlineIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    }

                  </TableCell>
                </TableRow>
              ))
            : ""}


          {roles && tableData
            ? tableData
              .map((row, index) => (
                <TableRow key={index} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_NAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DISPLAYNAME ? row.ROLE_DISPLAYNAME : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DESCRIPTION ? row.ROLE_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.ROLE_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    <Tooltip
                      id="tooltip-top"
                      title="ویرایش"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => {
                          editRole(row);
                        }}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="حذف"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => {
                          removeRole(row);
                        }}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon +
                            " " +
                            classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="افزودن"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => {
                          addRole(row);
                        }}
                      >
                        <AddCircleOutlineIcon
                          className={
                            classes.tableActionButtonIcon + " " + classes.Add
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            : ""}

          {roleToUser && tableData
            ? tableData
              .slice(
                currentPage * rowsCount,
                currentPage * rowsCount + rowsCount
              )
              .map((row, index) => (
                <TableRow key={index} className={[classes.tableBodyRow, currentRoleToGroup.includes(row.USER_USERNAME) && classes.getTable]}>
                  <TableCell className={classes.tableCell}>
                    {row.USER_USERNAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_DISPLAYNAME ? row.USER_DISPLAYNAME : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_DESCRIPTION ? row.USER_DESCRIPTION : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.USER_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  {currentRoleToGroup.includes(row.USER_USERNAME) ?
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن کاربر از نقش مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            removeRoleToGroup(row);
                          }}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon + " " + classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    :
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن کاربر به نقش مورد نظر"
                        placement="top"
                        classes={{ tooltip: classesTools.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {
                            addRoleToGroup(row);
                          }}
                        >
                          <AddCircleOutlineIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  }

                </TableRow>
              ))
            : ""}


          {listFileUser && tableData
            ? tableData
              .slice(
                currentPage * rowsCount,
                currentPage * rowsCount + rowsCount
              )
              .map((row, index) => (
                <TableRow key={index} className={[classes.tableBodyRow]}>
                  <TableCell className={classes.tableCell}>
                    {row.USER_USERNAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_PASSWORD}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_DESCRIPTION ? row.USER_DESCRIPTION : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_DISPLAYNAME ? row.USER_DISPLAYNAME : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_BRANCH_CODE ? row.USER_BRANCH_CODE : "..."}
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {row.USER_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                  <Tooltip
                      id="tooltip-top-start"
                      title="حذف کاربر از لیست"
                      placement="top"
                      classes={{ tooltip: classesTools.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => {
                          removeRowFromList(row);
                        }}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon +
                            " " +
                            classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>


                </TableRow>
              ))
            : ""}

        </TableBody>
      </Table>


      {
        (userToGroup || userToRole || groupToGroup || roleToUser || groupToRole || RoleToGroup || RoleToRole || listFileUser) ?
          <TablePagination
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsCount}
            page={currentPage}
            onChangePage={handleChangePage}
            labelRowsPerPage=""
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          : <div className="btnEditCourse">
            <p>{`${currentPage + 10} - ${currentPage}`} از {totalCoun}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                bottom: 20,
                cursor: "pointer",
                marginTop: 20,
                justifyContent: "center"
              }}
            >
              <RegularButton
                color="info"
                size="sm"
                onClick={() => {
                  handleChangePage(currentPage)
                }}
                style={NoNext ? { opacity: 0.3, cursor: "default" } : { opacity: 1, cursor: "pointer" }}
              >
                بعد
              </RegularButton>
              <RegularButton
                // className={currentPage === 0 ? classes.backNo : classes.backOk}
                style={currentPage === 0 ? { opacity: 0.3, cursor: 'default' } : { opscity: 1, cursor: 'pointer' }}
                color="danger"
                size="sm"
                onClick={() => {
                  if (currentPage != 0)
                    handleChangeRowsPerPage(currentPage)
                }}
              >
                قبل
              </RegularButton>
            </div>
          </div>
      }
    </div >
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.any,
  currentPage: PropTypes.number,
  NoNext: PropTypes.bool,
  rowsCount: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,

  totalCoun: PropTypes.number,

  Users: PropTypes.bool,
  removeCourse: PropTypes.func,
  removeUser: PropTypes.func,
  EditUser: PropTypes.func,
  addUserToGroup: PropTypes.func,
  editPass: PropTypes.func,

  group: PropTypes.bool,
  editGroup: PropTypes.func,
  removeGroup: PropTypes.func,

  groupToGroup: PropTypes.bool,
  addGroupToGroup: PropTypes.func,
  removeGroupToGroup: PropTypes.func,

  groupToRole: PropTypes.bool,
  addRoleToGroup: PropTypes.func,
  removeRoleToGroup: PropTypes.func,
  currentRoleToGroup: PropTypes.array,

  userToGroup: PropTypes.bool,
  addToGroup: PropTypes.func,
  addToUser: PropTypes.func,
  currentGroupToUser: PropTypes.array,
  removeGroupToUser: PropTypes.func,

  roles: PropTypes.bool,
  editRole: PropTypes.func,
  removeRole: PropTypes.func,
  editCourseStudent: PropTypes.func,
  addRole: PropTypes.func,

  userToRole: PropTypes.bool,
  currentRoleToUser: PropTypes.func,
  removeRoleToUser: PropTypes.func,

  removeStudent: PropTypes.func,

  config: PropTypes.bool,
  removeConfig: PropTypes.func,
  EditConfig: PropTypes.func,

  roleToUser: PropTypes.bool,

  AllDatas: PropTypes.func,
  SelectDatas: PropTypes.func,

  RoleToGroup: PropTypes.bool,
  RoleToRole: PropTypes.bool,

  listFileUser: PropTypes.bool,
  removeRowFromList:PropTypes.func
};
