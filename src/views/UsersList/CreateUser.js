import React, { useState, useEffect } from "react";

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
import { getAllLesson } from "api/Core/Lesson";
import { createCourse } from "api/Core/Course";
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker"
import { getItem } from "api/storage/storage";

import "./Course.css"
import { Avatar } from "@mui/material";
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
export default function CreateUser(props) {
    const roleUser = getItem('role')
    const userId = getItem('id')

    const classes = useStyles();
    const {
        openCreateCoursePopUp,
        CreateSuccess,
        closePopUpCreate,
        imgLesson,
        idLesson } = props

    const [title, setTitle] = useState()
    const [startDate, setStartDate] = useState()
    const [teacherName, setTeacherName] = useState("")
    const [lessonName, setLessonName] = useState("")
    const [endDate, setEndDate] = useState()
    const [cost, setCost] = useState()
    const [capacity, setCapacity] = useState()

    const [allTeacher, setAllTeacher] = useState()
    const [allLessons, setAllLessons] = useState()
    const [photoLesson, setPhotoLesson] = useState()

    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)

    useEffect(() => {
        trackPromise(getAllTeacher())
        trackPromise(getAllLessons())
        if (userId) setTeacherName(userId)
    }, [])

    useEffect(() => {
        if (allLessons && allLessons.length > 0) {
            if (imgLesson && idLesson) {
                setLessonName(idLesson);
                setPhotoLesson(imgLesson)
            }
            else {
                setLessonName(allLessons[0]._id);
                setPhotoLesson(allLessons[0].image)
            }
        }
    }, [allLessons])


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


    const createNewCourse = async () => {
        const data = {
            title,
            cost,
            endDate,
            startDate,
            capacity,
            teacher: teacherName,
            lesson: lessonName
        }
        let response = await createCourse(data)
        if (response.data.result) {
            setTeacherName('')
            setTitle('')
            setCapacity('');
            setCost('')
            setEndDate('')
            setStartDate('')
            setLessonName('')
            CreateSuccess();
        }
    }

    return (
        <PopUpCustome
            open={openCreateCoursePopUp}
            handleClose={() => { closePopUpCreate() }}
            className="popUpCreateCourse">
            <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse" style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning" className="CardTitle">
                            <h4 className={classes.cardTitleWhite}>افزودن دوره</h4>
                        </CardHeader>
                        <CardBody className="bodyCreateCourse">
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
                                            }}
                                            disabled={roleUser === 'teacher'} />}

                                    </GridItem>

                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomeDatePicker
                                            label="شروع دوره"
                                            minDate={new Date()}
                                            onChange={(e) => {
                                                setDateStart(e);
                                                setStartDate(`${e.year}/${e.month.number}/${e.day}`)
                                            }}
                                            value={dateStart}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>

                                        <CustomeDatePicker
                                            minDate={new Date()}
                                            label="پایان دوره"
                                            onChange={(e) => {
                                                setDateEnd(e);
                                                setEndDate(`${e.year}/${e.month.number}/${e.day}`)
                                            }}
                                            value={dateEnd}
                                        />
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
                                            onChange={(e) => {
                                                if (/^[0-9]+$/i.test(e)) {
                                                    setCost(e)
                                                } else setCost('')
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="گنجایش"

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={capacity}
                                            onChange={(e) => {
                                                if (/^[0-9]+$/i.test(e)) {
                                                    setCapacity(e)
                                                } else setCapacity('')
                                            }}
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
                                                handleChange={(e) => {
                                                    setLessonName(e.target.value)
                                                    let lesson = allLessons.find((item) => item._id === e.target.value)
                                                    setPhotoLesson(lesson.image)
                                                }}
                                                disabled={idLesson ? true : false}
                                            />}

                                    </GridItem>
                                </GridContainer>
                            </div>
                            <div className="btnEditCourse">
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    bottom: 20,
                                    cursor: "pointer",
                                    marginTop: 20
                                }}>
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { trackPromise(createNewCourse()) }}>ثبت تغییرات</RegularButton>
                                    <RegularButton
                                        color="danger"
                                        size="sm"
                                        onClick={() => { closePopUpCreate() }}>انصراف</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

CreateCourse.propTypes = {
    openCreateCoursePopUp: PropTypes.bool,
    CreateSuccess: PropTypes.func,
    closePopUpCreate: PropTypes.func,
    imgLesson: PropTypes.string,
    idLesson: PropTypes.string
};