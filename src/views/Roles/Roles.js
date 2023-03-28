import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { GeneralContext } from "providers/GeneralContext";
import RegularButton from "components/CustomButtons/Button";
import InsertRole from "./InsertRole";
import EditRole from "./EditRole";

import "./role.css";

import { getAllRoles, removeRole } from "api/Core/Role";
import { trackPromise } from "react-promise-tracker";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    setConfirmPopupOpen,
    onConfirmSetter,
    setOpenToast,
    onToast,
  } = useContext(GeneralContext);

  const [openEditRole, setOpenEditRole] = useState(false);
  const [dataRole, setDataRole] = useState();

  const [openInsertRole, setOpenInsertRole] = useState(false);


  useEffect(() => {
    trackPromise(getRoles());
  }, []);

  const getRoles = async () => {
    let response1 = await getAllRoles();

    if (response1.data) {
      var newData = Object.values(response1.data).map((item, index) => ({
        title: Object.keys(response1.data)[index],
        ROLE_STATUS: item.ROLE_STATUS,
        ROLE_ID: item.ROLE_ID,
        ROLE_DESCRIPTION: item.ROLE_DESCRIPTION,
      }));
    }

    setAllRoles(newData);
  };

  const removeRoles = (row) => {
    onConfirmSetter(
      "مطمئن به حذف نقش هستید؟",
      async () => {
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
          trackPromise(getRoles());
          setOpenToast(true);
          onToast("گروه با موفقیت حذف شد", "success");
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

  const handleChangePage = (event, newPage) => {
    setCurrentPage_MainbarMyRoles(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage_MainbarMyRoles(0);
  };

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
                    "ردیف",
                    "اسم نقش",
                    "توضیحات",
                    "وضعیت نقش",
                    "عملیات",
                  ]}
                  tableData={allRoles}
                  currentPage={currentPage_MainbarMyRoles}
                  rowsCount={rowsPerPage}
                  removeRole={(row) => {
                    removeRoles(row);
                  }}
                  editRole={editRole}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  roles
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

    </>
  );
}
