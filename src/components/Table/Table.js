import React from "react";
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
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import RegularButton from "../CustomButtons/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./index.css";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
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
    roleToUser
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
                    {prop}
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
                    {row.USER_DESCRIPTION}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Tooltip
                      id="tooltip-top"
                      title="ویرایش"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
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
                      classes={{ tooltip: classes.tooltip }}
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
                      classes={{ tooltip: classes.tooltip }}
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

                  <TableCell className={classes.tableCell}>
                    {row.CNF_NAME}
                  </TableCell>

                  <TableCell className={classes.tableCell}>
                    {row.CNF_STATE === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.CNF_DESCRIPTION}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Tooltip
                      id="tooltip-top"
                      title="ویرایش"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
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
                      classes={{ tooltip: classes.tooltip }}
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
                    {row.GROUP_USERNAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_DESCRIPTION ? row.GROUP_DESCRIPTION : "..."}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Tooltip
                      id="tooltip-top"
                      title="ویرایش"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
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
                      classes={{ tooltip: classes.tooltip }}
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
                      classes={{ tooltip: classes.tooltip }}
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
                <TableRow key={index} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_USERNAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_DESCRIPTION}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  {currentGroupToUser.includes(row.GROUP_USERNAME) ?
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن گروه از کاربر مورد نظر"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
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
                              classes.tableActionButtonIcon + " " + classes.Add
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
                        classes={{ tooltip: classes.tooltip }}
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
                <TableRow key={index} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {row.title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DESCRIPTION}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {currentRoleToUser.includes(row.title) ?
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن نقش از کاربر"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
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
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip> :
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن نقش به کاربر مورد نظر"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
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
                <TableRow key={index} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_USERNAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_DESCRIPTION}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.GROUP_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  {currentGroupToUser.includes(row.GROUP_USERNAME) ?
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن گروه از گروه مورد نظر"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
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
                              classes.tableActionButtonIcon + " " + classes.Add
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
                        classes={{ tooltip: classes.tooltip }}
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
                <TableRow key={index} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {row.title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DESCRIPTION}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {currentRoleToGroup.includes(row.title) ?
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن نقش از گروه"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
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
                              classes.tableActionButtonIcon + " " + classes.Add
                            }
                          />
                        </IconButton>
                      </Tooltip> :
                      <Tooltip
                        id="tooltip-top-start"
                        title="اضافه کردن نقش به گروه"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
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
                    {row.title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_DESCRIPTION}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.ROLE_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Tooltip
                      id="tooltip-top"
                      title="ویرایش"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
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
                      classes={{ tooltip: classes.tooltip }}
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
                      classes={{ tooltip: classes.tooltip }}
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
                <TableRow key={index} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {row.USER_USERNAME}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_DESCRIPTION}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.USER_STATUS === 1 ? (
                      <p style={{ color: "green" }}>فعال</p>
                    ) : (
                      <p style={{ color: "red" }}>غیر فعال</p>
                    )}
                  </TableCell>
                  {currentRoleToGroup.includes(row.USER_USERNAME) ?
                    <TableCell className={classes.tableCell}>
                      <Tooltip
                        id="tooltip-top-start"
                        title="حذف کردن گروه از کاربر مورد نظر"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
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
                              classes.tableActionButtonIcon + " " + classes.Add
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
                        classes={{ tooltip: classes.tooltip }}
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

        </TableBody>
      </Table>


      {(userToGroup || userToRole || groupToGroup || roleToUser) ?
        <TablePagination
          rowsPerPageOptions={[10, 10]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsCount}
          page={currentPage}
          onChangePage={handleChangePage}
          labelRowsPerPage=""
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        : <div className="btnEditCourse">
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
    </div>
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
  rowsCount: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,

  Users: PropTypes.bool,
  removeCourse: PropTypes.func,
  removeUser: PropTypes.func,
  EditUser: PropTypes.func,
  addUserToGroup: PropTypes.func,

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

  roleToUser: PropTypes.bool

};
