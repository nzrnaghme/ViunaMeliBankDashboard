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

import { getListUser } from "api/Core/Course";
import EditCourse from "./EditCourse";
import CreateCourse from "./CreateCourse";
import { GeneralContext } from "providers/GeneralContext";
// import { getItem } from "api/storage/storage";
import { trackPromise } from "react-promise-tracker";

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

export default function CourseList() {
  // const roleUser = getItem("role");
  // const userId = getItem('id')

  const classes = useStyles();
  const {
    setConfirmPopupOpen,
    onConfirmSetter,
    setOpenToast,
    onToast,
  } = useContext(GeneralContext);

  const [allCourseV, setAllCourseV] = useState({});

  const [
    currentPage_MainbarMyCourses,
    setCurrentPage_MainbarMyCourses,
  ] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [courseDetail, setCourseDetail] = useState();
  const [openPopUpEditCourse, setOpenPopUpEditCourse] = useState(false);

  const [openPopUpCreateCourse, setOpenPopUpCreateCourse] = useState(false);

  useEffect(() => {
    trackPromise(getCourses());
  }, []);

  const getCourses = async () => {
    // let response = await getAllCourse();
    let response1 = await getListUser();
    const keys = Object.keys(response1.data);
    const value = response1.data;

    console.log("01", keys, "02", value);

    if (response1.data) {
      var newData = Object.keys(response1.data).map((item, index) => ({
        title: Object.keys(response1.data)[index],
        USER_USERNAME: item.USER_USERNAME,
        USER_STATUS: item.USER_STATUS,
        USER_ID: item.USER_ID,
        USER_DESCRIPTION: item.USER_DESCRIPTION,
      }));
      console.log("amir", newData);
    }

    setAllCourseV(response1.data);
  };

  const removeCourse = async (row) => {
    console.log(row);

    // const id.USER_USERNAME = {
    //   USER_STATUS: id.USER_STATUS,
    //   USER_DESCRIPTION: id.USER_DESCRIPTION,
    // };

    // console.log(name);

    //---------------------
    // let response = await removeCourseById(id);
    // if (response.data.result) {
    //   let newCourse = allCourse.filter((item) => item.id != id);
    //   setOpenToast(true);
    //   onToast(response.data.message[0].message, "success");
    //   setAllCourse(newCourse);
    // }
  };

  const editCourse = async (data) => {
    setCourseDetail(data);
    setOpenPopUpEditCourse(true);
  };


  const createCourse = () => {
    setOpenPopUpCreateCourse(true);
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
                createCourse();
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
        
              {allCourseV && Object.keys(allCourseV).length > 0 ? (
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "ردیف",
                    "نام کاربری",
                    "توضیحات",
                    "وضعیت کاربر",
                    "کد کاربر",
                    "عملیات",
                  ]}
                  tableData={Object.values(allCourseV)}
                  currentPage={currentPage_MainbarMyCourses}
                  rowsCount={rowsPerPage}
                  removeCourse={(id) => {
                    onConfirmSetter("آیا برای حذف کاربر مطمئن هستید؟", () => {
                      trackPromise(removeCourse(id));
                    });
                    setConfirmPopupOpen(true);
                  }}
                  editCourse={editCourse}
                  courses
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
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
                  دوره وجود ندارد
                </div>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {openPopUpEditCourse && courseDetail && (
        <EditCourse
          dataCourse={courseDetail}
          openEditCoursePopUp={openPopUpEditCourse}
          closePopUpEdit={() => {
            setOpenPopUpEditCourse(false);
          }}
          EditSuccess={() => {
            setOpenPopUpEditCourse(false);

            setOpenToast(true);
            onToast("کاربر بروزرسانی شد", "success");
            getCourses();
          }}
        />
      )}

      {openPopUpCreateCourse && (
        <CreateCourse
          openCreateCoursePopUp={openPopUpCreateCourse}
          CreateSuccess={() => {
            setOpenPopUpCreateCourse(false);

            setOpenToast(true);
            onToast("دوره اضافه شد", "success");
            getCourses();
          }}
          closePopUpCreate={() => {
            setOpenPopUpCreateCourse(false);
          }}
        />
      )}
      
    </>
  );
}
