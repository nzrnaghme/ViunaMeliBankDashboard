/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";
// @material-ui/icons
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import PeopleIcon from '@material-ui/icons/People';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/rtlStyle.js";

import { countOfUser } from "api/Core/User";
import { countOfGroup } from "api/Core/Group";
import { countOfRole } from "api/Core/Role";

const useStyles = makeStyles(styles);

export default function RTLPage() {
  const classes = useStyles();

  const [countStudents, setCountStudents] = useState(0);
  const [countTeachers, setCountTeachers] = useState(0);
  const [countCourses, setCountCourses] = useState(0);


  useEffect(() => {
    trackPromise(getAllUser());
    trackPromise(getGroups());
    trackPromise(getRoles());
  }, [])

  const getAllUser = async () => {
    let response = await countOfUser();
    if (response.data) {
      setCountStudents(Object.values(response.data)[0]);
    }
  }

  const getGroups = async () => {
    let response = await countOfGroup();
    if (response.data) {
      setCountTeachers(Object.values(response.data)[0]);
    }
  }

  const getRoles = async () => {
    let response = await countOfRole();
    if (response.data) {
      setCountCourses(Object.values(response.data)[0]);
    }
  }

  return (
    <div style={{ marginTop: 26 }}>
      <GridContainer >
        <GridItem xs={12} sm={6} md={4} >
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PeopleIcon />
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
                {digitsEnToFa(countTeachers ? countTeachers : 0)} <small>گروه</small>
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
                {digitsEnToFa(countCourses ? countCourses : 0)} <small>نقش</small>
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
