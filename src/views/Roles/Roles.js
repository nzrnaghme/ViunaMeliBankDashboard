import React, { useContext, useEffect, useState } from "react";
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

import InsertRole from "./InsertRole";
import EditRole from "./EditRole";
import ListOfRole from "./listOfRole";

import "./role.css";
import { GeneralContext } from "providers/GeneralContext";
import { getAllRoles, removeRole, findRole } from "api/Core/Role";

const styles = (theme) => ({
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
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
});

const useStyles = makeStyles(styles);

export default function Roles() {
  const classes = useStyles();
  const [allRoles, setAllRoles] = useState([]);
  const [
    currentPage_MainbarMyRoles,
    setCurrentPage_MainbarMyRoles,
  ] = useState(0);

  const {
    setConfirmPopupOpen,
    onConfirmSetter,
    setOpenToast,
    onToast,
    setLosdingShow
  } = useContext(GeneralContext);

  const [openEditRole, setOpenEditRole] = useState(false);
  const [dataRole, setDataRole] = useState();

  const [openInsertRole, setOpenInsertRole] = useState(false);

  const [openRole, setOpenRole] = useState(false)
  const [dataRoleTo, setDataRoleTo] = useState()

  const [showSearch, setShowSearch] = useState(false)
  const [nameSearch, setNameSearch] = useState(null)

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async (currentPage) => {
    setLosdingShow(true)

    const data = {
      first: (currentPage || currentPage === 0) ? currentPage.toString() : currentPage_MainbarMyRoles.toString(),
      max: "10"
    }
    let response1 = await getAllRoles(data);

    if (Object.values(response1.data).length > 0) {
      var newData = Object.values(response1.data).map((item, index) => ({
        title: Object.keys(response1.data)[index],
        ROLE_STATUS: item.ROLE_STATUS,
        ROLE_ID: item.ROLE_ID,
        ROLE_DESCRIPTION: item.ROLE_DESCRIPTION,
      }));
      setAllRoles(newData);

    } else {
      setCurrentPage_MainbarMyRoles(currentPage_MainbarMyRoles - 10);
      onToast("نقشی دیگر وجود ندارد", "warning")
      setOpenToast(true)
    }


    setLosdingShow(false)

  };

  const removeRoles = (row) => {

    onConfirmSetter(
      "مطمئن به حذف نقش هستید؟",
      async () => {
        setLosdingShow(true)

        const roleName = row.title
        const data = Object.create(
          {
            roleName: {
              ROLE_STATUS: row.ROLE_STATUS,
              ROLE_DESCRIPTION: row.ROLE_DESCRIPTION,
            },
          },
        );
        data[roleName] = data["roleName"];
        let response = await removeRole(data);
        if (response.data === "SUCCESSFUL") {
          setLosdingShow(false)

          getRoles()
          setOpenToast(true);
          onToast("گروه با موفقیت حذف شد", "success");
        } else {
          setLosdingShow(false)

          getRoles()
          setOpenToast(true);
          onToast("گروه حذف نشد", "error");
        }
      },
      () => { }
    );
    setConfirmPopupOpen(true);
  };

  const editRole = (item) => {
    setOpenEditRole(true);
    getAllDataRole(item);
  };

  const getAllDataRole = (item) => {

    if (item) {
      setDataRole(item);
      setOpenEditRole(true);
    }
  };

  const handleChangePage = (currentPage) => {
    setCurrentPage_MainbarMyRoles(currentPage + 10);
    getRoles(currentPage + 10)
  };

  const handleChangeRowsPerPage = (currentPage) => {
    let currPage = currentPage - 10;
    setCurrentPage_MainbarMyRoles(currPage);
    getRoles(currPage)
  };

  const searchWithNameRole = async () => {
    setLosdingShow(true);
    let data = {
      ROLE_NAME: nameSearch
    };
    const response = await findRole(data);
    if (Object.values(response.data).length > 0) {
      setAllRoles(Object.values(response.data))
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
            <RegularButton
              color="success"
              onClick={() => {
                setOpenInsertRole(true);
              }}
            >
              افزودن نقش
            </RegularButton>

            <div className="searchInput">

              <Tooltip
                id="tooltip-top-start"
                title="جستجو با اسم نقش"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Key"
                  className={classes.tableActionButton}
                  onClick={() => {
                    if (!nameSearch && showSearch) {
                      setShowSearch(!showSearch);
                      getRoles()
                    }
                    else if (nameSearch && showSearch) {
                      searchWithNameRole()
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
                  labelText="اسم نقش"
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
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>تمام نقش‌ها</h4>
            </CardHeader>
            <CardBody>
              {allRoles && Object.keys(allRoles).length > 0 ? (
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "اسم نقش",
                    "توضیحات",
                    "وضعیت نقش",
                    "عملیات",
                  ]}
                  tableData={allRoles}
                  currentPage={currentPage_MainbarMyRoles}
                  removeRole={(row) => {
                    removeRoles(row);
                  }}
                  editRole={editRole}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  roles
                  addRole={(row) => {
                    setDataRoleTo(row)
                    setOpenRole(true);
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
                  نقشی ثبت نشده
                </div>
              )}
            </CardBody>
            <div></div>
          </Card>
        </GridItem>
      </GridContainer>
      {dataRole && openEditRole && (
        <EditRole
          dataRole={dataRole}
          openEditRolePopUp={openEditRole}
          closePopUpEdit={() => {
            setOpenEditRole(false);
          }}
          EditSuccess={() => {
            setOpenToast(true);
            onToast("گروه بروزرسانی شد", "success");
            getRoles();
            setOpenEditRole(false);
          }}
        />
      )}

      {openInsertRole && (
        <InsertRole
          openPopUpInsertRole={openInsertRole}
          InsertSuccess={() => {
            setOpenToast(true);
            onToast("گروه اضافه شد", "success");
            getRoles();
            setOpenInsertRole(false);
          }}
          closePopUp={() => {
            setOpenInsertRole(false);
          }}
        />
      )}

      {openRole && dataRoleTo &&
        <ListOfRole
          openListRolePopUp={openRole}
          closePopUpList={() => { setOpenRole(false) }}
          dataRoleTo={dataRoleTo}
          InsertSuccess={() => {
            setOpenToast(true);
            onToast("گروه بروزرسانی شد", "success");
            getRoles()
            setOpenRole(false)
          }}
        />
      }

    </>
  );
}
