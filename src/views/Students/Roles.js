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
import InsertStudent from "./InsertStudent";
import EditRole from "./EditRole";

import "./students.css";

import { getAllStudetV } from "api/Core/Student_Manage";
import { deleteStudentById } from "api/Core/Student_Manage";
import { deActiveStudentManage } from "api/Core/Student_Manage";
import { activeStudentManage } from "api/Core/Student_Manage";
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
  const [allStudents, setAllStudents] = useState([]);
  const [allStudentsV, setAllStudentsV] = useState([]);
  const [
    currentPage_MainbarMyCourses,
    setCurrentPage_MainbarMyCourses,
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

  const [openInsertStudent, setOpenInsertStudent] = useState(false);


  useEffect(() => {
    trackPromise(getStudents());
  }, []);

  const getStudents = async () => {
    let response1 = await getAllStudetV();

    if (response1.data) {
      var newData = Object.values(response1.data).map((item, index) => ({
        title: Object.keys(response1.data)[index],
        ROLE_STATUS: item.ROLE_STATUS,
        ROLE_ID: item.ROLE_ID,
        ROLE_DESCRIPTION: item.ROLE_DESCRIPTION,
      }));
    }

    setAllStudentsV(newData);
  };

  const removeStudent = (id) => {
    onConfirmSetter(
      "مطمئن به حذف نقش هستید؟",
      async () => {
        let response = await deleteStudentById(id);
        if (response.data.success) {
          let newStudent = allStudents.filter((item) => item.id != id);
          setAllStudents(newStudent);
          setOpenToast(true);
          onToast(response.data.message[0].message, "success");
        }
      },
      () => {}
    );
    setConfirmPopupOpen(true);
  };

  const editRole = (item) => {
    setOpenEditRole(true);
    getAllDataRole(item);
  };

  const changeActivate = async (id, active) => {
    if (active) {
      deActiveStudent(id);
    } else activeStudent(id);
  };

  const deActiveStudent = async (id) => {
    let response = await deActiveStudentManage(id);
    if (response.data.result) {
      onToast("وضعیت نقش آپدیت شد", "success");
      setOpenToast(true);
      getStudents();
    }
  };

  const activeStudent = async (id) => {
    let response = await activeStudentManage(id);
    if (response.data.result) {
      onToast("وضعیت نقش آپدیت شد", "success");
      setOpenToast(true);
      getStudents();
    }
  };


  const getAllDataRole = (item) => {
    if (item) {
      setDataRole(item);
      setOpenEditRole(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage_MainbarMyCourses(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage_MainbarMyCourses(0);
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="btnAdd">
            <RegularButton
              color="success"
              onClick={() => {
                setOpenInsertStudent(true);
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
              {allStudentsV && Object.keys(allStudentsV).length > 0 ? (
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "ردیف",
                    "عنوان",
                    "توضیحات",
                    "وضعیت",
                    "آیدی",
                    "عملیات",
                  ]}
                  tableData={allStudentsV}
                  currentPage={currentPage_MainbarMyCourses}
                  rowsCount={rowsPerPage}
                  removeStudent={(id) => {
                    removeStudent(id);
                  }}
                  editRole={editRole}
                  changeActivate={changeActivate}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  student
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
            // getStudents();
            setOpenEditRole(false);
          }}
        />
      )}

      {openInsertStudent && (
        <InsertStudent
          openPopUpInsertStudent={openInsertStudent}
          InsertSuccess={() => {
            setOpenInsertStudent(false);
          }}
          closePopUp={() => {
            setOpenInsertStudent(false);
          }}
        />
      )}

    </>
  );
}
