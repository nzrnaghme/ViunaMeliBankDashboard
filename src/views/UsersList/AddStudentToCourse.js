import React, { useEffect, useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { GeneralContext } from "providers/GeneralContext";

import { getCourseById } from "api/Core/Course";
import { getAllStudet } from "api/Core/Student_Manage";
import { addStudentToCourse } from "api/Core/Course";
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
        width: theme.spacing(22),
        height: theme.spacing(22),
    },
});

const useStyles = makeStyles(styles);

export default function AddStudentToCourse(props) {
    const classes = useStyles();
    const {
        openAddStudentPopUp,
        AddSuccess,
        closePopUpAdd,
        userIdCourse } = props;

    const [currentPage_MainbarCurrentStudent, setCurrentPage_MainbarCurrentStudent] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [currentStudents, setCurrentStudents] = useState()
    const [allStudent, setAllStudent] = useState()
    const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);

    useEffect(() => {
        trackPromise(getAllStudent());
    }, [userIdCourse])

    useEffect(() => {
        if (allStudent && allStudent.length > 0)
            trackPromise(getCurrentStudents(userIdCourse));
    }, [allStudent])


    const getAllStudent = async () => {
        let response = await getAllStudet()
        if (response.data.result) {
            setAllStudent(response.data.result);
        }
    }

    const getCurrentStudents = async (id) => {
        let response = await getCourseById(id);
        if (response.data.result) {
            var studentGetCourse = response.data.result.students.map((item) => item._id);
        }
        if (allStudent && response) {

            if (studentGetCourse.length > 0) {
                const otherStudent = allStudent.filter((item) => {
                    return (!(studentGetCourse.includes(item._id)))
                })
                setCurrentStudents(otherStudent)
            }
            else
                setCurrentStudents(allStudent)
        }
    }

    const addStudentToCourses = async (id) => {
        const data = {
            userId: id,
            courseId: userIdCourse
        }
        let response = await addStudentToCourse(data);
        if (response.data.result) {
            let newStudent = currentStudents.filter((item) => item._id != id)
            setCurrentStudents(newStudent)
        }
    }

    const handleChangePage = (event, newPage) => {
        setCurrentPage_MainbarCurrentStudent(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage_MainbarCurrentStudent(0);
    };



    return (
        <PopUpCustome
            open={openAddStudentPopUp}
            handleClose={() => { closePopUpAdd() }}
            className="popUpAllCurrentStudent">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning" className="CardTitle">
                            <h4 className={classes.cardTitleWhite}>اضافه کردن دانشجو</h4>
                        </CardHeader>
                        <CardBody className="bodyStyleCard">
                            {currentStudents != undefined && currentStudents.length > 0 ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["", "اسم", "ایمیل", "تعداد کل دروس", "", ""]}
                                    tableData={currentStudents}
                                    currentPage={currentPage_MainbarCurrentStudent}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    rowsCount={rowsPerPage}
                                    addStudentToCourse={(id) => {
                                        onConfirmSetter('آیا برای اضافه کردن دانشجو اطمینان دارید؟', () => {
                                            trackPromise(addStudentToCourses(id))
                                        })
                                        setConfirmPopupOpen(true)
                                    }}
                                    AllStudentInsertCourse
                                /> :
                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    backgroundColor: "#ec7254",
                                    color: "white",
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}> دانشجویی وجود ندارد</div>
                            }
                            {currentStudents && currentStudents.length === 0 &&
                                <div style={{ textAlign: "center" }}>دانشجویی وجود ندارد</div>
                            }
                        </CardBody>
                        {currentStudents != undefined && currentStudents.length > 0 &&
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <RegularButton
                                    color="success"
                                    size="sm"
                                    onClick={AddSuccess}>
                                    ثبت تغییرات
                                </RegularButton>
                            </div>}
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

AddStudentToCourse.propTypes = {
    openAddStudentPopUp: PropTypes.bool,
    AddSuccess: PropTypes.func,
    closePopUpAdd: PropTypes.func,
    userIdCourse: PropTypes.string
};