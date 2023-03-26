/*eslint-disable*/
import React, { useEffect, useState, useRef } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/rtlStyle.js";

import { getAllStudet } from "api/Core/Student_Manage";
import { getAllTeachers } from "api/Core/Employe_Manage";
import { getAllCourse } from "api/Core/Course";
import { trackPromise } from "react-promise-tracker";
import { getAllCategory } from "api/Core/Lesson";
import { getAllLesson } from "api/Core/Lesson";
import { getListUser } from "api/Core/User";
import { getAllGroups } from "api/Core/Group";
import { getAllRoles } from "api/Core/Role";

const useStyles = makeStyles(styles);

export default function RTLPage() {
  const classes = useStyles();

  const [countStudents, setCountStudents] = useState(0);
  const [countTeachers, setCountTeachers] = useState(0);
  const [countCourses, setCountCourses] = useState(0);

  const [nearStudents, setNearStudents] = useState();
  const [nearTeachers, setNearTeachers] = useState();
  const [nearCourses, setNearCourses] = useState();

  const [allStudent, setAllStudent] = useState();
  const [currentPage_MainbarStudents, setCurrentPage_MainbarStudents] = useState(0);
  const [rowsPerPageStudents, setRowsPerPagStudents] = useState(3);

  const [allTeacher, setAllTeacher] = useState();
  const [currentPage_MainbarTeacher, setCurrentPage_MainbarTeacher] = useState(0);
  const [rowsPerPageTeacher, setRowsPerPagTeacher] = useState(3);

  const [chartTeacher, setChartTeacher] = useState({});

  const [chartLesson, setChartLesson] = useState({});
  const labelLesson = useRef([])

  var optionsChartTeacher = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  }

  var optionsChartLesson = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  }

  var animation = {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * 80,
            dur: 500,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  }

  var animationChartLesson = {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * 80,
            dur: 500,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  }

  useEffect(() => {
    trackPromise(getAllUser());
    trackPromise(getGroups());
    trackPromise(getRoles());
    // trackPromise(getCategory());
    // trackPromise(getAllLessons());
  }, [])

  const changeDate = (date) => {
    let Endate = new Date(date)
    let PrDate = Endate.toLocaleDateString('fa-IR-u-nu-latn');
    return PrDate
  }

  const getAllUser = async () => {
    let response = await getListUser();
    if (response.data) {
      setCountStudents(Object.keys(response.data).length);
    }
  }

  const getGroups = async () => {
    let response = await getAllGroups();
    if (response.data) {
      setCountTeachers(Object.keys(response.data).length);
      // const sortedActivities = (response.data.result.reverse());
      // setNearTeachers(changeDate(sortedActivities[0].registerDate))
      // setAllTeacher(sortedActivities);
      // let chartlabel = response.data.result.map((item) =>
      //   item.fullName
      // )

      // let chartSeries = response.data.result.map((item) =>
      //   item.courses.length
      // )

      // const data = {
      //   labels: chartlabel,
      //   series: [chartSeries]
      // }
      // setChartTeacher(data)
    }
  }

  const getRoles = async () => {
    let response = await getAllRoles();
    if (response.data) {
      setCountCourses(Object.keys(response.data).length);
      // const sortedActivities = (response.data.result.sort((a, b) => b.endDate - a.endDate));
      // setNearCourses(sortedActivities[0].endDate.split("T")[0])
    }
  }

  // const getCategory = async () => {
  //   let response = await getAllCategory();
  //   if (response.data.result) {
  //     let category = response.data.result.map((item) => item.name);
  //     labelLesson.current = category
  //   }
  // }

  // const getAllLessons = async () => {
  //   let response = await getAllLesson();
  //   if (response.data.result) {
  //     let category1 = response.data.result.filter((item) => item.category === 1)
  //     let lengthCourse1 = category1.map((item) => item.courses.length)
  //     let countCourses1 = sumCourse(lengthCourse1);

  //     let category2 = response.data.result.filter((item) => item.category === 2)
  //     let lengthCourse2 = category2.map((item) => item.courses.length);
  //     let countCourses2 = sumCourse(lengthCourse2);

  //     let category3 = response.data.result.filter((item) => item.category === 3)
  //     let lengthCourse3 = category3.map((item) => item.courses.length);
  //     let countCourses3 = sumCourse(lengthCourse3);

  //     let category4 = response.data.result.filter((item) => item.category === 4)
  //     let lengthCourse4 = category4.map((item) => item.courses.length);
  //     let countCourses4 = sumCourse(lengthCourse4);

  //     let category5 = response.data.result.filter((item) => item.category === 5)
  //     let lengthCourse5 = category5.map((item) => item.courses.length);
  //     let countCourses5 = sumCourse(lengthCourse5);

  //     let category6 = response.data.result.filter((item) => item.category === 6)
  //     let lengthCourse6 = category6.map((item) => item.courses.length);
  //     let countCourses6 = sumCourse(lengthCourse6);

  //     let category7 = response.data.result.filter((item) => item.category === 7)
  //     let lengthCourse7 = category7.map((item) => item.courses.length);
  //     let countCourses7 = sumCourse(lengthCourse7);

  //     let category8 = response.data.result.filter((item) => item.category === 8)
  //     let lengthCourse8 = category8.map((item) => item.courses.length);
  //     let countCourses8 = sumCourse(lengthCourse8);

  //     const data = {
  //       labels: labelLesson.current,
  //       series: [[countCourses1, countCourses2, countCourses3, countCourses4, countCourses5, countCourses6, countCourses7, countCourses8]]
  //     }

  //     setChartLesson(data)
  //   }
  // }

  const sumCourse = (allCourse) => {
    const initialValue = 0;
    const sumWithInitial = allCourse.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    return sumWithInitial
  }

  const handleChangePageStudents = (event, newPage) => {
    setCurrentPage_MainbarStudents(newPage)
  }

  const handleChangeRowsPerPageStudents = (event) => {
    setRowsPerPagStudents(+event.target.value);
    setCurrentPage_MainbarStudents(0);
  };

  const handleChangePageTeacher = (event, newPage) => {
    setCurrentPage_MainbarTeacher(newPage)
  }

  const handleChangeRowsPerPageTeacher = (event) => {
    setRowsPerPagTeacher(+event.target.value);
    setCurrentPage_MainbarTeacher(0);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PeopleOutlineRoundedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>تعداد کاربران</p>
              <h3 className={classes.cardTitle}>
                {digitsEnToFa(countStudents ? countStudents : 0)} <small>نفر</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <Update />
                آخرین فرد
                <small style={{ paddingRight: 5 }}>{digitsEnToFa(nearStudents ? nearStudents : 0)}</small>
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <LocalLibraryRoundedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>تعداد گروه ها</p>
              <h3 className={classes.cardTitle}>
                {digitsEnToFa(countTeachers ? countTeachers : 0)} <small>نفر</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <DateRange />
                آخرین استاد
                <small style={{ paddingRight: 5 }}>{digitsEnToFa(nearTeachers ? nearTeachers : 0)}</small>
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="info">
                <AssignmentRoundedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>تعداد نقش ها</p>
              <h3 className={classes.cardTitle}>
                {digitsEnToFa(countCourses ? countCourses : 0)} <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <Update />
                آخرین دوره
                <small style={{ paddingRight: 5 }}>{digitsEnToFa(nearCourses ? nearCourses : 0)}</small>
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              {chartTeacher &&
                <ChartistGraph
                  className="ct-chart"
                  data={chartTeacher}
                  type="Line"
                  options={optionsChartTeacher}
                  listener={animation}
                />}
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>دروس اساتید</h4>

            </CardBody>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="danger">
              {chartLesson &&
                <ChartistGraph
                  className="ct-chart"
                  data={chartLesson}
                  type="Line"
                  options={optionsChartLesson}
                  listener={animationChartLesson}
                />}
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>دوره های هر درس</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          {allStudent && allStudent.length > 0 &&
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>آمار دانشجویان</h4>
                <p className={classes.cardCategoryWhite}>
                  دانشجویان جدید از ۱۵ آبان ۱۳۹۶
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["", "نام", "تعداد دروس", ""]}
                  tableData={allStudent}
                  currentPage={currentPage_MainbarStudents}
                  rowsCount={rowsPerPageStudents}
                  handleChangePage={handleChangePageStudents}
                  handleChangeRowsPerPage={handleChangeRowsPerPageStudents}
                  studentPannel
                />
              </CardBody>
            </Card>}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {allTeacher && allTeacher.length > 0 &&
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>آمار اساتید</h4>
                <p className={classes.cardCategoryWhite}>
                  کارکنان جدید از ۱۵ آبان ۱۳۹۶
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["", "نام", "تعداد دروس", ""]}
                  tableData={allTeacher}
                  currentPage={currentPage_MainbarTeacher}
                  rowsCount={rowsPerPageTeacher}
                  handleChangePage={handleChangePageTeacher}
                  handleChangeRowsPerPage={handleChangeRowsPerPageTeacher}
                  studentPannel
                />
              </CardBody>
            </Card>}
        </GridItem>
      </GridContainer> */}
    </div>
  );
}
