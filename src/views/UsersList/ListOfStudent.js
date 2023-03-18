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
import { getCourseById } from "api/Core/Course";
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

export default function ListOfStudents(props) {
    const classes = useStyles();
    const [currentPage_MainbarCurrentStudent, setCurrentPage_MainbarCurrentStudent] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [currentStudents, setCurrentStudents] = useState()

    const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast } = useContext(GeneralContext);

    const {
        openListStudentPopUp,
        RemoveSuccess,
        closePopUpList,
        userIdCourse } = props

    useEffect(() => {
        trackPromise(getCurrentStudents(userIdCourse))
    }, [userIdCourse])

    const getCurrentStudents = async (id) => {
        let response = await getCourseById(id);
        if (response.data.result) {
            setCurrentStudents(response.data.result.students)
        }
    }

    const removeStudentInCourse = async (id) => {
        const data = {
            userId: id,
            courseId: userIdCourse
        }
        let response = await removeStudentToCourse(data);
        if (response.data.result) {
            setOpenToast(true)
            onToast(response.data.message[0].message, "success")
            getCurrentStudents(userIdCourse)
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
            open={openListStudentPopUp}
            handleClose={() => { closePopUpList() }}
            className="popUpAllCurrentStudent">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning" className="CardTitle">
                            <h4 className={classes.cardTitleWhite}>تمام دانشجویان</h4>
                        </CardHeader>
                        <CardBody className="bodyStyleCard">
                            {currentStudents != undefined && currentStudents.length > 0 ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["", "اسم", "ایمیل", ""]}
                                    tableData={currentStudents}
                                    currentPage={currentPage_MainbarCurrentStudent}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    rowsCount={rowsPerPage}
                                    removeStudent={(id) => {
                                        onConfirmSetter('آیا برای حذف دانشجو مطمئن هستید؟', () => {
                                            trackPromise(removeStudentInCourse(id))
                                        })
                                        setConfirmPopupOpen(true)

                                    }}
                                    currentStudent
                                /> :
                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    backgroundColor: "#ec7254",
                                    color: "white",
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>دانشجویی ثبت نام نکرده</div>}
                        </CardBody>
                        {currentStudents != undefined && currentStudents.length > 0 &&
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <RegularButton
                                    color="success"
                                    size="sm"
                                    onClick={() => { RemoveSuccess() }}>ثبت تغییرات</RegularButton>
                            </div>}
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

ListOfStudents.propTypes = {
    openListStudentPopUp: PropTypes.bool,
    RemoveSuccess: PropTypes.func,
    closePopUpList: PropTypes.func,
    userIdCourse: PropTypes.string
};