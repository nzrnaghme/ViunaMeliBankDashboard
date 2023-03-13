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
import { removeCourseById } from "api/Core/Course";
import { getCourseById } from "api/Core/Course";
import EditCourse from "./EditCourse";
import ListOfStudents from "./ListOfStudent";
import CreateCourse from "./CreateCourse";
import AddStudentToCourse from "./AddStudentToCourse";
import { GeneralContext } from "providers/GeneralContext";
import { getItem } from "api/storage/storage";
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
  const roleUser = getItem('role')
  // const userId = getItem('id')

  const classes = useStyles();
  const [allCourse, setAllCourse] = useState([])
  const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast } = useContext(GeneralContext);

  const [allCourseV, setAllCourseV] = useState({})


  const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [courseDetail, setCourseDetail] = useState()
  const [openPopUpEditCourse, setOpenPopUpEditCourse] = useState(false)

  const [idForStudents, setIdForStudents] = useState()
  const [openPopUpStudentsCourse, setOpenPopUpStudentsCourse] = useState(false)

  const [openPopUpCreateCourse, setOpenPopUpCreateCourse] = useState(false)

  const [openPopUpaddStudent, setOpenPopUpaddStudent] = useState(false)


  useEffect(() => {
    trackPromise(getCourses());
  }, [])

  const getCourses = async () => {
    // let response = await getAllCourse();
    let response1 = await getListUser();
    // console.log(response1.data, "11111111111111111111111111");
    setAllCourseV(response1.data)


    // if (response.data.result) {
    //   const data = response.data.result.map((item) => (
    //     {
    //       title: item.title,
    //       teacher: item.teacher.fullName,
    //       date: item.startDate.split("T")[0],
    //       cost: item.cost,
    //       capacity: item.students.length + item.capacity,
    //       countStudent: item.students.length,
    //       id: item._id,
    //       teacherId: item.teacher._id
    //     }
    //   ));
    //   if (roleUser === 'teacher') {
    //     var allCourseTeacher = data.filter((item) => item.teacherId === userId)
    //     setAllCourse(allCourseTeacher)
    //   } else
    //     setAllCourse(data)
    // }
  }

  const removeCourse = async (id) => {
    let response = await removeCourseById(id)
    if (response.data.result) {
      let newCourse = allCourse.filter((item) => item.id != id);
      setOpenToast(true)
      onToast(response.data.message[0].message, "success")
      setAllCourse(newCourse)
    }
  }

  const editCourse = async (id) => {
    let response = await getCourseById(id);
    if (response.data.result) {
      setCourseDetail(response.data.result)
      setOpenPopUpEditCourse(true)
    }
  }

  const showStudents = (id) => {
    setIdForStudents(id)
    setOpenPopUpStudentsCourse(true)
  }

  const createCourse = () => {
    setOpenPopUpCreateCourse(true)
  }

  const addStudentToCourse = (idCourse) => {
    setOpenPopUpaddStudent(true)
    setIdForStudents(idCourse)
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage_MainbarMyCourses(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage_MainbarMyCourses(0);
  };

  console.log(allCourseV, "allCourseV", Object.keys(allCourseV).length);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} >
          <div className="btnAdd">
            <RegularButton color="success" onClick={() => { createCourse() }}>افزودن دوره</RegularButton>
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>تمام دوره ها</h4>
            </CardHeader>
            <CardBody>

              {allCourseV && Object.keys(allCourseV).length > 0 && Object.values(allCourseV).map((item, key) => (
                <div key={key}>
                  <div >{item.USER_USERNAME}</div>
                  <div>{item.USER_DESCRIPTION}</div>
                  <div>{item.USER_STATUS}</div>
                  <div>{item.USER_ID}</div>
                  <hr></hr>
                </div>
              ))}

              <p>Hi</p>

              {allCourse && allCourse.length > 0 ?
                <Table
                  tableHeaderColor="info"
                  tableHead={["عنوان", "استاد", "شروع دوره", "قیمت", "گنجایش", "تعداد دانشجویان دوره", ""]}
                  tableData={allCourse}
                  currentPage={currentPage_MainbarMyCourses}
                  rowsCount={rowsPerPage}
                  removeCourse={(id) => {
                    onConfirmSetter('آیا برای حذف دوره مطمئن هستید؟', () => {
                      trackPromise(removeCourse(id))
                    })
                    setConfirmPopupOpen(true)
                  }}
                  editCourse={editCourse}
                  showStudents={showStudents}
                  addStudentToCourse={addStudentToCourse}
                  courses
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  teacherRole={roleUser === 'teacher'}
                /> :
                <div style={{
                  textAlign: 'center',
                  marginTop: 10,
                  backgroundColor: "#ec7254",
                  color: "white",
                  borderRadius: 5,
                  paddingTop: 10,
                  paddingBottom: 10
                }}> دوره وجود ندارد</div>
              }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {openPopUpEditCourse && courseDetail &&
        <EditCourse
          dataCourse={courseDetail}
          openEditCoursePopUp={openPopUpEditCourse}
          closePopUpEdit={() => { setOpenPopUpEditCourse(false) }}
          EditSuccess={() => {
            setOpenPopUpEditCourse(false)

            setOpenToast(true)
            onToast("دوره بروزرسانی شد", "success")
            getCourses()
          }} />}

      {openPopUpStudentsCourse && idForStudents &&
        <ListOfStudents
          userIdCourse={idForStudents}
          openListStudentPopUp={openPopUpStudentsCourse}
          closePopUpList={() => { setOpenPopUpStudentsCourse(false) }}
          RemoveSuccess={() => {
            setOpenPopUpStudentsCourse(false)

            getCourses()
          }}
        />}

      {openPopUpCreateCourse &&
        <CreateCourse
          openCreateCoursePopUp={openPopUpCreateCourse}
          CreateSuccess={() => {
            setOpenPopUpCreateCourse(false)

            setOpenToast(true)
            onToast("دوره اضافه شد", "success")
            getCourses();
          }}
          closePopUpCreate={() => {
            setOpenPopUpCreateCourse(false)
          }} />
      }
      {openPopUpaddStudent && idForStudents &&
        <AddStudentToCourse
          openAddStudentPopUp={openPopUpaddStudent}
          userIdCourse={idForStudents}
          closePopUpAdd={() => {
            setOpenPopUpaddStudent(false)
          }}
          AddSuccess={() => {
            setOpenPopUpaddStudent(false)

            setOpenToast(true)
            onToast("دانشجو به دوره اضافه شد", "success")
            getCourses();
          }}
        />
      }
    </>
  );
}
