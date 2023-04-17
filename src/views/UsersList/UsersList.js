import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";

import EditUser from "./EditUser";
import EditPass from "./EditPass";
import CreateUser from "./CreateUser";
import ListOfUsers from "./ListOfUsers";
import { GeneralContext } from "providers/GeneralContext";
import { removeUser, findUser, getListUser } from "api/Core/User";

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
    onToast,
    setLosdingShow
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

  const [showSearch, setShowSearch] = useState(false)
  const [nameSearch, setNameSearch] = useState(null)


  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = async (currentPage) => {
    setLosdingShow(true)

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
    setLosdingShow(false);

  };

  const removeSelectUser = async (row) => {
    setLosdingShow(true)

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
    setLosdingShow(false);
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

  const searchWithNameUser = async () => {
    setLosdingShow(true);
    let data = {
      USER_USERNAME: nameSearch
    };
    const response = await findUser(data);
    if (Object.values(response.data).length > 0) {
      setAllUsers(Object.values(response.data))
    } else {
      onToast("کاربری با این اسم وجود ندارد", "warning")
      setOpenToast(true)
    }

    setLosdingShow(false)
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="btnAdd">
            <div className="searchInput">

              <Tooltip
                id="tooltip-top-start"
                title="جستجو با اسم کاربر"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Key"
                  className={classes.tableActionButton}
                  onClick={() => {
                    if (!nameSearch && showSearch) {
                      setShowSearch(!showSearch);
                      getUsers()
                    }
                    else if (nameSearch && showSearch) {
                      searchWithNameUser()
                    } else setShowSearch(!showSearch);
                  }}
                >
                  <SearchIcon
                    className={
                      classes.tableActionButtonIcon}
                  />
                </IconButton>
              </Tooltip>

              {showSearch &&
                <CustomInput
                  rtlActive
                  labelText="اسم کاربری"
                  value={nameSearch}
                  onChange={(e) => {
                    setNameSearch(e);
                  }}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              }
            </div>
            <RegularButton
              color="success"
              onClick={() => {
                createUser();
              }}

              style={{ marginRight: 15 }}
            >
              افزودن کاربر
            </RegularButton>



          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>تمام کاربران</h4>
            </CardHeader>
            <CardBody className="bodyStyleCard">

              {allUsers && Object.keys(allUsers).length > 0 ? (
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "اسم کاربری",
                    "توضیحات",
                    "وضعیت کاربر",
                    "عملیات",
                  ]}
                  tableData={Object.values(allUsers)}
                  currentPage={currentPage_MainbarMyUsers}
                  removeUser={(row) => {
                    onConfirmSetter("آیا برای حذف کاربر مطمئن هستید؟", () => {
                      (removeSelectUser(row));
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
