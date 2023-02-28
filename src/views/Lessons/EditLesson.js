import React, { useEffect, useState, useContext, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";

import Table from "components/Table/Table.js";
import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
import CustomeAutoComplete from "components/CustomInput/CustomeAutoComplete";
import { GeneralContext } from "providers/GeneralContext";
import imagePicker from "components/UploadPhoto/imagePicker"
import UploadPhoto from "components/UploadPhoto/UploadPhoto";

import "./lesson.css"

import { getAllCategory } from "api/Core/Lesson";
import { removeCourseById } from "api/Core/Course";
import { updateLesson } from "api/Core/Lesson";
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

export default function EditLEsson(props) {
    const classes = useStyles();
    const {
        openEditLessonPopUp,
        EditSuccess,
        closePopUpEdit,
        dataLesson,
        courseByIdLesson } = props
    const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);
    const [photoLesson, setPhotoLesson] = useState()
    const [nameLesson, setNameLesson] = useState();
    const [categoryLesson, setCategoryLesson] = useState();
    const [descriptionLesson, setDescriptionLesson] = useState();
    const [allCategories, setaAllCategories] = useState([])
    const [topicValue, setTopicValue] = useState("");
    const [allTopics, setAllTopics] = useState([])

    const [filesImg, setFileImg] = useState()
    const fileName = useRef('')
    const upsertImgRef = useRef(null);

    const [allCoursesLesson, setAllCoursesLessons] = useState([])
    const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        trackPromise(getAllCategories())
    }, [])

    useEffect(() => {
        if (dataLesson && courseByIdLesson) {
            setNameLesson(dataLesson.lessonName);
            setCategoryLesson(dataLesson.category);
            setDescriptionLesson(dataLesson.description);
            setAllTopics(dataLesson.topics);
            setPhotoLesson(dataLesson.image);
            setAllCoursesLessons(courseByIdLesson);
        }
    }, [dataLesson, courseByIdLesson])


    const getAllCategories = async () => {
        let response = await getAllCategory();
        let rightData = response.data.result.map((item) => ({
            _id: item.id,
            fullName: item.name
        }));
        setaAllCategories(rightData)
    }

    const updateDataLesson = async (img) => {
        const data = {
            lessonName: nameLesson,
            topics: allTopics,
            description: descriptionLesson,
            image: img,
            category: categoryLesson,
            id: dataLesson._id
        }
        let response = await updateLesson(data);
        if (response.data.result) {
            EditSuccess()
        }

    }

    const removeCourse = async (id) => {
        let response = await removeCourseById(id)
        if (response.data.result) {
            let newCourse = allCoursesLesson.filter((item) => item._id != id)
            setAllCoursesLessons(newCourse)
        }
    }

    const onUploadingImg = async (e) => {
        const files = e.target.files[0];
        fileName.current = files.name;
        let blob = await imagePicker(files);
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            (imgUpdateHandler(reader.result));
        };
    }

    const imgUpdateHandler = (img) => {
        setPhotoLesson(img);
        var fileImg = dataURLtoFile(img, fileName.current);
        setFileImg(fileImg)
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    const onUpsertClicked = () => {
        upsertImgRef.current.click();
    }

    const uploadImgToDatabase = async () => {
        if (!filesImg) {
            trackPromise(updateDataLesson(photoLesson))
        }
        else {

            let formData = new FormData();
            formData.append('image', filesImg);
            axios({
                method: "post",
                url: "https://api.noorgon.sepehracademy.ir/api/upload/image",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    if (response.data.result)
                        trackPromise(updateDataLesson(response.data.result))

                })
                .catch(function (response) {
                    console.log(response);
                });
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
            open={openEditLessonPopUp}
            handleClose={() => { closePopUpEdit() }}
            className="popUpEditCourse">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse">
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>آپدیت درس</h4>
                        </CardHeader>
                        <CardBody className="bodyEditCourse">
                            <div className="avatarPhotoLesson">
                                <UploadPhoto
                                    src={photoLesson}
                                    onUploadingImg={onUploadingImg}
                                    onUpsertClicked={onUpsertClicked}
                                    upsertRef={upsertImgRef} />
                            </div>
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="نام درس"
                                            value={nameLesson}
                                            onChange={(e) => { setNameLesson(e) }}

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>

                                        {allCategories && allCategories.length > 0 && <CustomSelectInput
                                            labelText="دسته بندی"
                                            value={categoryLesson}
                                            options={allCategories}
                                            handleChange={(e) => {
                                                setCategoryLesson(e.target.value)
                                            }}

                                        />}

                                    </GridItem>

                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>

                                        <CustomeAutoComplete
                                            labelText="موضوعات"
                                            values={allTopics}
                                            currValue={topicValue}
                                            handleChange={(e) => {
                                                setTopicValue(e.target.value)
                                            }}
                                            handleKeyUp={(e) => {
                                                if (e.keyCode == 32) {
                                                    setAllTopics((oldState) => [...oldState, e.target.value]);
                                                    setTopicValue("");
                                                }
                                            }}
                                            handleDelete={(item, index) => {
                                                console.log(allTopics, "allTopics");
                                                let deleteTopic = allTopics.find((item) => item.name === item)
                                                console.log(item, "item", deleteTopic);
                                                let arr = [...allTopics]
                                                arr.splice(index, 1)
                                                setAllTopics(arr)
                                            }}
                                        />

                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            multiline
                                            rows={5}
                                            rtlActive
                                            labelText="توضیحات"
                                            value={descriptionLesson}
                                            onChange={(e) => { setDescriptionLesson(e) }}

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </div>
                            {allCoursesLesson && allCoursesLesson.length > 0 ?
                                <>
                                    <CardHeader color="info" className="headerCourse">
                                        <h4 className={classes.cardTitleWhite}>تمام دوره های درس</h4>
                                    </CardHeader>
                                    <Table
                                        tableHeaderColor="info"
                                        tableHead={["عنوان", "شروع دوره", "پابان دوره", "قیمت", ""]}
                                        tableData={allCoursesLesson}
                                        currentPage={currentPage_MainbarMyCourses}
                                        rowsCount={rowsPerPage}
                                        removeCourse={(id) => {
                                            onConfirmSetter("آیا برای حذف دوره اطمینان دارید؟", () => {
                                                trackPromise(removeCourse(id))
                                            })
                                            setConfirmPopupOpen(true)
                                        }}
                                        coursesFromLesson
                                        handleChangePage={handleChangePage}
                                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </> :
                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    backgroundColor: "#ec7254",
                                    color: "white",
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>برای درس انتخابی دوره ثبت نشده</div>
                            }
                            <div className="btnEditCourse">
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    bottom: 20,
                                    cursor: "pointer",

                                }}>
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { trackPromise(uploadImgToDatabase()) }}>ثبت تغییرات</RegularButton>
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

EditLEsson.propTypes = {
    openEditLessonPopUp: PropTypes.bool,
    EditSuccess: PropTypes.func,
    closePopUpEdit: PropTypes.func,
    dataLesson: PropTypes.object,
    courseByIdLesson: PropTypes.array
};