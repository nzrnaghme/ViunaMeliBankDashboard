import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "components/CustomButtons/Button";

import { getListUser } from "api/Core/User";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
import ListOfUsers from "./ListOfUsers";
import { GeneralContext } from "providers/GeneralContext";
// import { getItem } from "api/storage/storage";
import { trackPromise } from "react-promise-tracker";
import { removeUser } from "api/Core/User";

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
  // const roleUser = getItem("role");
  // const userId = getItem('id')

  const classes = useStyles();
  const {
    setConfirmPopupOpen,
    onConfirmSetter,
    setOpenToast,
    onToast,
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
  const [dataGroupToGroup, setDataGroupToGroup] = useState()


  useEffect(() => {
    trackPromise(getUsers());
  }, []);

  const getUsers = async (currentPage) => {
    const data = {
      first: (currentPage || currentPage === 0) ? currentPage.toString() : currentPage_MainbarMyUsers.toString(),
      max: "10"
    }
    let response1 = await getListUser(data);
    setAllUsers(response1.data);
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
      trackPromise(getUsers());
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
    getUsers(currentPage + 10)
  };

  const handleChangeRowsPerPage = (currentPage) => {
    let currPage = currentPage - 10;
    setCurrentPage_MainbarMyUsers(currPage);
    getUsers(currPage)
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="btnAdd">
            <RegularButton
              color="success"
              onClick={() => {
                createUser();
              }}
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
            <CardBody>

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
                      trackPromise(removeSelectUser(row));
                    });
                    setConfirmPopupOpen(true);
                  }}
                  EditUser={EditUsers}
                  Users
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  addUserToGroup={(row) => {
                    setDataGroupToGroup(row)
                    setOpenGroupToGroup(true);
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

    </>
  );
}
