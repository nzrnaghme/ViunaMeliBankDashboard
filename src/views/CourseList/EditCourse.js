import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
import { getAllTeachers } from "api/Core/Employe_Manage";
import { updateCourse } from "api/Core/Course";
import { getAllLesson } from "api/Core/Lesson"
import { Avatar } from "@mui/material";
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker"

import "./Course.css"
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
export default function EditCourse(props) {
    var jalaali = require('jalaali-js')
    const classes = useStyles();
    const {
        openEditCoursePopUp,
        EditSuccess,
        closePopUpEdit,
        dataCourse } = props

    const [title, setTitle] = useState()
    const [startDate, setStartDate] = useState()
    const [teacherName, setTeacherName] = useState()
    const [endDate, setEndDate] = useState()
    const [cost, setCost] = useState()
    const [lessonName, setLessonName] = useState("")
    const [capacity, setCapacity] = useState()

    const [allTeacher, setAllTeacher] = useState()
    const [allLessons, setAllLessons] = useState()
    const [photoLesson, setPhotoLesson] = useState()

    const [dateStart, setDateStart] = useState()
    const [dateEnd, setDateEnd] = useState()

    useEffect(() => {
        getAllTeacher()
        getAllLessons()
    }, [])

    const getAllTeacher = async () => {
        let response = await getAllTeachers()
        if (response.data.result) {
            setAllTeacher(response.data.result)
        }
    }

    const getAllLessons = async () => {
        let response = await getAllLesson()
        if (response.data.result) {
            let rightData = response.data.result.map((item) => ({
                fullName: item.lessonName,
                _id: item._id,
                image: item.image
            }));
            setAllLessons(rightData)
        }
    }


    useEffect(() => {
        setTitle(dataCourse.title)
        setTeacherName(dataCourse.teacher._id)
        setCost(dataCourse.cost)
        setCapacity(dataCourse.capacity + dataCourse.students.length)
        setLessonName(dataCourse.lesson._id)


        var datePirsianStart = dataCourse.startDate.split("T")[0].split("-")
        setStartDate(datePirsianStart[0] + "/" + datePirsianStart[1] + "/" + datePirsianStart[2])
        var dateEnglishStart = jalaali.toGregorian(Number(datePirsianStart[0]), Number(datePirsianStart[1]), Number(datePirsianStart[2]))
        setDateStart(new Date(`${dateEnglishStart.gy}/${dateEnglishStart.gm}/${dateEnglishStart.gd}`))

        var datePirsianEnd = dataCourse.endDate.split("T")[0].split("-")
        setEndDate(datePirsianEnd[0] + "/" + datePirsianEnd[1] + "/" + datePirsianEnd[2])
        var dateEnglishEnd = jalaali.toGregorian(Number(datePirsianEnd[0]), Number(datePirsianEnd[1]), Number(datePirsianEnd[2]))
        setDateEnd(new Date(`${dateEnglishEnd.gy}/${dateEnglishEnd.gm}/${dateEnglishEnd.gd}`))
    }, [dataCourse])



    useEffect(() => {
        if (allLessons && allLessons.length > 0) {
            let lessonCourse = allLessons.find((item) => item._id === dataCourse.lesson._id)
            if (lessonCourse)
                setPhotoLesson(lessonCourse.image)
        }
    }, [allLessons])


    const updateDataCourse = async () => {

        const data = {
            id: dataCourse._id,
            title,
            cost,
            endDate,
            startDate,
            capacity,
            teacher: teacherName,
            lesson: lessonName
        }

        let response = await updateCourse(data);
        if (response.data.result) {
            EditSuccess()
        }
    }


    return (
        <PopUpCustome
            open={openEditCoursePopUp}
            handleClose={() => { closePopUpEdit() }}
            className="popUpEditCourse">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse" style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning" className="CardTitle">
                            <h4 className={classes.cardTitleWhite}>آپدیت دوره</h4>
                        </CardHeader>
                        <CardBody className="bodyEditCourse bodyStyleCard">
                            <div className="avatarPhotoLesson">
                                <Avatar src={photoLesson} className={classes.large} />
                            </div>
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="نام دوره"
                                            value={title}
                                            onChange={(e) => { setTitle(e) }}

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>

                                        {allTeacher && allTeacher.length > 0 && <CustomSelectInput
                                            labelText="استاد"
                                            value={teacherName}
                                            options={allTeacher}
                                            handleChange={(e) => {
                                                setTeacherName(e.target.value)
                                            }} />}

                                    </GridItem>

                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomeDatePicker
                                            className="enterInputPanel"
                                            label="شروع دوره"
                                            onChange={(e) => {
                                                setDateStart(e);
                                                setStartDate(`${e.year}/${e.month.number}/${e.day}`)
                                            }}
                                            value={dateStart} />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomeDatePicker
                                            className="enterInputPanel"
                                            label="پایان دوره"
                                            onChange={(e) => {
                                                setDateEnd(e);
                                                setEndDate(`${e.year}/${e.month.number}/${e.day}`)
                                            }}
                                            value={dateEnd} />

                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="قیمت"

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={cost}
                                            onChange={(e) => { setCost(e) }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="گنجایش"

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={capacity}
                                            onChange={(e) => { setCapacity(e) }}
                                            rtlActive
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>

                                        {allLessons && allLessons.length > 0 &&
                                            <CustomSelectInput
                                                labelText="درس"
                                                value={lessonName}
                                                options={allLessons}
                                                disabled
                                                handleChange={(e) => {
                                                    setLessonName(e.target.value);
                                                    let lesson = allLessons.find((item) => item._id === e.target.value)
                                                    setPhotoLesson(lesson.image)
                                                }} />

                                        }

                                    </GridItem>
                                </GridContainer>
                            </div>
                            <div className="btnEditCourse">
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    // position: "absolute",
                                    bottom: 20,
                                    cursor: "pointer",

                                }}>
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { trackPromise(updateDataCourse(dataCourse._id)) }}>ثبت تغییرات</RegularButton>
                                    <RegularButton
                                        color="danger"
                                        size="sm"
                                        onClick={() => { closePopUpEdit() }}>انصراف</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

EditCourse.propTypes = {
    openEditCoursePopUp: PropTypes.bool,
    EditSuccess: PropTypes.func,
    closePopUpEdit: PropTypes.func,
    dataCourse: PropTypes.object
};