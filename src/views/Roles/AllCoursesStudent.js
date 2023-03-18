import React, { useContext, useEffect, useState } from "react";
// import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import PopUpCustome from "components/PopUp/PopUp";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getStudentById } from "api/Core/Student_Manage";
import "./students.css"
import { removeStudentToCourse } from "api/Core/Course";
import { GeneralContext } from "providers/GeneralContext";
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

export default function AllCoursesStudent(props) {
    const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);
    const classes = useStyles();
    const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [coursesStudent, setCoursesStudent] = useState()

    const {
        openAllCoursesStudentPopUp,
        closePopUpAllcOurses,
        userId,
        successRemoveData } = props

    useEffect(() => {
        trackPromise(getCoursesForStudent(userId))
    }, [userId])

    const getCoursesForStudent = async (id) => {
        let response = await getStudentById(id)
        setCoursesStudent(response.data.result.courses)
    }


    const removeCourseFromStudent = async (id) => {
        const data = {
            userId,
            courseId: id
        }
        let response = await removeStudentToCourse(data);
        if (response.data.result) {
            let newCourse = coursesStudent.filter((item) => item._id != id)
            setCoursesStudent(newCourse);
            successRemoveData()
        }
    }

    const handleChangePage = (event, newPage) => {
        setCurrentPage_MainbarMyCourses(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage_MainbarMyCourses(0);
    };

    return (
        <PopUpCustome
            open={openAllCoursesStudentPopUp}
            handleClose={() => { closePopUpAllcOurses() }}
            className="popUpAllCoursesStudent">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>تمام دوره های دانشجو</h4>
                        </CardHeader>
                        <CardBody>
                            {coursesStudent != undefined && coursesStudent.length > 0 ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["عنوان", "استاد", "شروع دوره", "قیمت", "پایان دوره", ""]}
                                    tableData={coursesStudent}
                                    currentPage={currentPage_MainbarMyCourses}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    rowsCount={rowsPerPage}
                                    removeCourseFromStudent={(id) => {
                                        onConfirmSetter('آیا برای حذف دوره مطمئن هستید؟', () => {
                                            trackPromise(removeCourseFromStudent(id))
                                        })
                                        setConfirmPopupOpen(true)
                                    }}
                                    myCourses
                                />:
                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    backgroundColor: "#ec7254",
                                    color: "white",
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}> دوره ثبت نشده</div>}
                            {coursesStudent && coursesStudent.length === 0 &&
                                <div style={{ textAlign: "center" }}>دوره ثبت نام نشده</div>}
                        </CardBody>
                        <div>

                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

AllCoursesStudent.propTypes = {
    openAllCoursesStudentPopUp: PropTypes.bool,
    closePopUpAllcOurses: PropTypes.func,
    dataCoursesStudent: PropTypes.array,
    userId: PropTypes.string,
    successRemoveData: PropTypes.func
};