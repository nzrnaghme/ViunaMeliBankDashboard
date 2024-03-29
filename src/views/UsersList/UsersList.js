import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import EditUser from "./EditUser";
import EditPass from "./EditPass";
import CreateUser from "./CreateUser";
import ListOfUsers from "./ListOfUsers";
import { GeneralContext } from "providers/GeneralContext";
import { removeUser, getListUser, findUser } from "api/Core/User";
import { filterByStatus } from "api/Core/User";
import { filterByDescription } from "api/Core/User";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "bakh",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function UsersList() {

  const classes = useStyles();
  const {
    setConfirmPopupOpen,
    onConfirmSetter,
    setOpenToast,
    onToast
  } = useContext(GeneralContext);

  const [allUsers, setAllUsers] = useState({});

  const [
    currentPage_MainbarMyUsers,
    setCurrentPage_MainbarMyUsers,
  ] = useState(0);

  const [userDetail, setUserDetail] = useState();
  const [openPopUpEditUser, setOpenPopUpEditUser] = useState(false);

  const [openPopUpCreateUser, setOpenPopUpCreateUser] = useState(false);

  const [openGroupToGroup, setOpenGroupToGroup] = useState(false)
  const [dataGroupToGroup, setDataGroupToGroup] = useState();

  const [openChangePass, setOpenChangePass] = useState(false)
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    trackPromise(getUsers());
  }, []);

  const getUsers = async (currentPage) => {

    const data = {
      first: (currentPage || currentPage === 0) ? currentPage.toString() : currentPage_MainbarMyUsers.toString(),
      max: "10"
    }
    let response1 = await getListUser(data);
    if (Object.values(response1.data).length > 0) {
      setAllUsers(response1.data);
    } else {
      setCurrentPage_MainbarMyUsers(currentPage_MainbarMyUsers - 10);
      onToast("کاربری دیگر وجود ندارد", "warning")
      setOpenToast(true)
    }

  };

  const removeSelectUser = async (row) => {

    const userName = row.USER_USERNAME
    const data = Object.create(
      {
        userName: {
          GROUP_STATUS: row.USER_STATUS.toString(),
          GROUP_DESCRIPTION: row.USER_DESCRIPTION,
        },
      },
    );
    data[userName] = data["userName"];
    let response = await removeUser(data);

    if (response.data === "SUCCESSFUL") {
      setOpenToast(true);
      onToast("کاربر با موفقیت حذف شد", "success");
      getUsers()
    } else {
      setOpenToast(true);
      onToast("کاربر حذف نشد", "error");
    }
  };

  const EditUsers = (data) => {
    setUserDetail(data);
    setOpenPopUpEditUser(true);
  };


  const createUser = () => {
    setOpenPopUpCreateUser(true);
  };


  const handleChangePage = (currentPage) => {
    setCurrentPage_MainbarMyUsers(currentPage + 10);
    getUsers(currentPage + 10);
  };

  const handleChangeRowsPerPage = (currentPage) => {
    let currPage = currentPage - 10;
    setCurrentPage_MainbarMyUsers(currPage);
    getUsers(currPage);
  };

  const editPass = (row) => {
    setOpenChangePass(true);
    setDataUser(row)
  }

  const searchWithNameUser = async (nameSearch) => {
    let data = {
      USER_USERNAME: nameSearch
    };
    const response = await findUser(data);
    if (Object.values(response.data).length > 0) {
      setAllUsers(Object.values(response.data))
    } else {
      onToast("کاربری با این مشخصات وجود ندارد", "warning")
      setOpenToast(true)
    }
  }

  const searchWithStatus = async (nameSearch) => {
    let data = {
      USER_STATUS: nameSearch.toString()
    };
    const response = await filterByStatus(data);
    if (Object.values(response.data).length > 0) {
      setAllUsers(Object.values(response.data))
    } else {
      onToast("کاربری با این مشخصات وجود ندارد", "warning")
      setOpenToast(true)
    }
  }

  const searchWithDescription = async (nameSearch) => {
    let data = {
      USER_DESCRIPTION: nameSearch
    };
    const response = await filterByDescription(data);
    if (Object.values(response.data).length > 0) {
      setAllUsers(Object.values(response.data))
    } else {
      onToast("کاربری با این مشخصات وجود ندارد", "warning")
      setOpenToast(true)
    }
  }

  return (
    <>
      <GridContainer>
        <div className="btnAdd2">
          <Tooltip
            id="tooltip-top-start"
            title="افزودن کاربر"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
            color={"#00adef"}
          >
            <IconButton
              aria-label="Key"
              className={classes.tableActionButton}
              onClick={() => {
                createUser();
              }}
            >
              <AddIcon
                className={
                  classes.tableActionButtonIcon}
                style={{ color: "white", fontSize: "2rem" }}
              />
            </IconButton>
          </Tooltip>

        </div>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              {allUsers && Object.keys(allUsers).length > 0 ? (
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "اسم کاربری",
                    "عنوان",
                    "توضیحات",
                    "وضعیت کاربر",
                    "عملیات",
                  ]}
                  tableData={Object.values(allUsers)}
                  currentPage={currentPage_MainbarMyUsers}
                  removeUser={(row) => {
                    onConfirmSetter("آیا برای حذف کاربر مطمئن هستید؟", () => {
                      trackPromise(removeSelectUser(row));
                    });
                    setConfirmPopupOpen(true);
                  }}
                  EditUser={EditUsers}
                  Users
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  addUserToGroup={(row) => {
                    setDataGroupToGroup(row);
                    setOpenGroupToGroup(true);
                  }}
                  editPass={editPass}

                  AllDatas={() => {
                    getUsers();
                  }}

                  SelectDatas={(nameSearch, key) => {

                    switch (key) {
                      case 0:
                        trackPromise(searchWithNameUser(nameSearch))
                        break;
                      case 2:
                        trackPromise(searchWithDescription(nameSearch))
                        break;
                      case 3:
                        trackPromise(searchWithStatus(nameSearch))
                        break;
                      default:
                        trackPromise(searchWithNameUser(nameSearch))
                        break;
                    }

                  }}
                />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    backgroundColor: "#ec7254",
                    color: "white",
                    borderRadius: 5,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  {" "}
                  کاربری وجود ندارد
                </div>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {openPopUpEditUser && userDetail && (
        <EditUser
          dataUser={userDetail}
          openEditUserPopUp={openPopUpEditUser}
          closePopUpEdit={() => {
            setOpenPopUpEditUser(false);
          }}
          EditSuccess={() => {
            setOpenPopUpEditUser(false);

            setOpenToast(true);
            onToast("کاربر بروزرسانی شد", "success");
            getUsers();
          }}
        />
      )}

      {openPopUpCreateUser && (
        <CreateUser
          openCreateUserPopUp={openPopUpCreateUser}
          CreateSuccess={() => {
            setOpenPopUpCreateUser(false);

            setOpenToast(true);
            onToast("کاربر اضافه شد", "success");
            getUsers();
          }}
          closePopUpCreate={() => {
            setOpenPopUpCreateUser(false);
          }}
        />
      )}
      {openGroupToGroup && dataGroupToGroup &&
        <ListOfUsers
          dataUserToGroup={dataGroupToGroup}
          closePopUpList={() => { setOpenGroupToGroup(false) }}
          InsertSuccess={getUsers}
          openListGrouptPopUp={openGroupToGroup} />
      }

      {openChangePass && dataUser && (
        <EditPass
          dataUser={dataUser}
          openEditUserPopUp={openChangePass}
          closePopUpEdit={() => {
            setOpenChangePass(false);
          }}
          EditSuccess={() => {
            setOpenChangePass(false);
            setOpenToast(true);
            onToast("کاربر بروزرسانی شد", "success");
            getUsers();
          }}
        />
      )}

    </>
  );
}
