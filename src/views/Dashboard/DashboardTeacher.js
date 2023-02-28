/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
// core components
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/rtlStyle.js";

import avatar from "assets/img/faces/admin.jpg";
import { getItem } from "api/storage/storage";
import { getEmployeeById } from "api/Core/Employe_Manage";
import { getAllCourse } from "api/Core/Course";
import { getAllLesson } from "api/Core/Lesson";
import { trackPromise } from "react-promise-tracker";


const useStyles = makeStyles(styles);

export default function DashboardTeacher() {
    const classes = useStyles();
    const userId = getItem('id')
    const [countStudents, setCountStudents] = useState(0);
    const [countCoursesTeacher, setCountCoursesTeacher] = useState(0);
    const [countAllCourses, setCountAllCourses] = useState(0);
    const [nearCoursesTeacher, setNearCoursesTeacher] = useState()
    const [nearLessons, setNearLessons] = useState()


    const [allLesson, setAllLesson] = useState();
    const [currentPage_MainbarStudents, setCurrentPage_MainbarStudents] = useState(0);
    const [rowsPerPageStudents, setRowsPerPagStudents] = useState(3);

    const [allCourseTeacher, setAllCourseTeacher] = useState();
    const [currentPage_MainbarTeacher, setCurrentPage_MainbarTeacher] = useState(0);
    const [rowsPerPageTeacher, setRowsPerPagTeacher] = useState(3);

    useEffect(() => {
        trackPromise(getAllCourses())
        setCountStudents(10);
        trackPromise(getAllLessons())
        if (userId)
            trackPromise(getStudentsTeacher(userId));
    }, [])


    const getStudentsTeacher = async (id) => {
        let response = await getEmployeeById(id);
        if (response.data.result) {
            setCountCoursesTeacher(response.data.result.courses.length);
            if (response.data.result.length > 0) {
                const sortedActivities = (response.data.result.sort((a, b) => b.endDate - a.endDate));
                setNearCoursesTeacher(sortedActivities[0].endDate.split("T")[0])
            }
            setAllCourseTeacher(response.data.result.courses)
        }
    }

    const getAllCourses = async () => {
        let response = await getAllCourse();
        if (response.data.result) {
            setCountAllCourses(response.data.result.length)
        }
    }

    const getAllLessons = async () => {
        let response = await getAllLesson();
        if (response.data.result) {
            setAllLesson(response.data.result);
            const sortedActivities = (response.data.result.sort((a, b) => b.createDate - a.createDate));
            setNearLessons(changeDate(sortedActivities[0].createDate))
        }
    }

    const changeDate = (date) => {
        let Endate = new Date(date)
        let PrDate = Endate.toLocaleDateString('fa-IR-u-nu-latn');
        return PrDate
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
                            <p className={classes.cardCategory}>تعداد دانشجویان</p>
                            <h3 className={classes.cardTitle}>
                                {countStudents} <small>نفر</small>
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                هم‌اکنون
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <LocalLibraryRoundedIcon />
                            </CardIcon>
                            <p className={classes.cardCategory}>تعداد دوره های استاد</p>
                            <h3 className={classes.cardTitle}>
                                {countCoursesTeacher} <small>کلاس</small>
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <DateRange />
                                آخرین دوره
                                <small style={{ paddingRight: 5 }}>{nearCoursesTeacher ? nearCoursesTeacher : "دوره ندارید"}</small>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <AssignmentRoundedIcon />
                            </CardIcon>
                            <p className={classes.cardCategory}>تعداد کل دوره ها</p>
                            <h3 className={classes.cardTitle}>
                                {countAllCourses} <small>کلاس</small>
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                آخرین درس
                                <small style={{ paddingRight: 5 }}>{nearLessons}</small>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>

            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={allCourseTeacher && allCourseTeacher.length > 0 ? 6 : 12}>
                    {allLesson && allLesson.length > 0 &&
                        <Card>
                            <CardHeader color="warning">
                                <h4 className={classes.cardTitleWhite}>آمار کلاس ها</h4>
                                <p className={classes.cardCategoryWhite}>
                                    دانشجویان جدید از ۱۵ آبان ۱۳۹۶
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    tableHeaderColor="warning"
                                    tableHead={["", "نام", "توضیحات", ""]}
                                    tableData={allLesson}
                                    currentPage={currentPage_MainbarStudents}
                                    rowsCount={rowsPerPageStudents}
                                    handleChangePage={handleChangePageStudents}
                                    handleChangeRowsPerPage={handleChangeRowsPerPageStudents}
                                    teacherPannelLesson
                                />
                            </CardBody>
                        </Card>}
                </GridItem>
                {allCourseTeacher && allCourseTeacher.length > 0 && <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>آمار دوره‌های استاد</h4>
                            <p className={classes.cardCategoryWhite}>
                                دانشجویان جدید از ۱۵ آبان ۱۳۹۶
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["", "نام کلاس", "ظرفیت", ""]}
                                tableData={allCourseTeacher}
                                currentPage={currentPage_MainbarTeacher}
                                rowsCount={rowsPerPageTeacher}
                                handleChangePage={handleChangePageTeacher}
                                handleChangeRowsPerPage={handleChangeRowsPerPageTeacher}
                                teacherPannelCourses
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                }

            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                <img src={avatar} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile>
                            <h6 className={classes.cardCategory}>مدیرعامل / مدیرفنی</h6>
                            <h4 className={classes.cardTitle}>امیرحسین بهبودی جویباری</h4>
                            <p className={classes.description}>
                                دانش‌آموخته‌ی مهندسی کامپیوتر از دانشگاه علم و فناوری مازندران هستم.
                                شوق و علاقه‌ی بسیار زیاد به برنامه نویسی از میل بسیار زیادم به حل مسئله نشئت میگیرد.
                                در کنار برنامه نویسی در بخش طراحی نیز علاقه به یادگیری و انجام فعالیت دارم.
                                زمینه‌های فعالیتم به طراحی ui/ux و توسعه بخش front سایت معطوف می‌شود.
                                علاوه بر این‌ها علاقه‌ی زیادی به کار در زمینه‌ی هوش مصنوعی دارم.
                            </p>
                            <Button color="info" round>
                                دنبال‌کردن
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
