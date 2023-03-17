import React, { useEffect, useRef, useState, useContext } from "react";
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
import { GeneralContext } from "providers/GeneralContext";
import EditLEsson from "./EditLesson";
import AddLesson from "./AddLesson";
import CreateUser from "views/CourseList/CreateUser";

import { getAllLesson } from "api/Core/Lesson";
import { getAllCategory } from "api/Core/Lesson";
import { removeLesson } from "api/Core/Lesson";
import { getLessonById } from "api/Core/Lesson";
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

export default function LessonList() {
    const classes = useStyles();
    const [allLessons, setAllLessons] = useState([])
    const allCategories = useRef([])
    const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast } = useContext(GeneralContext);

    const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [dataLesson, setDataLesson] = useState()
    const [openEditLesson, setOpenEditLesson] = useState(false)
    const [courseByIdLesson, setCourseByIdLesson] = useState()

    const [openAddLesson, setOpenAddLesson] = useState(false)

    const [openAddCourseInLesson, setOpenAddCourseInLesson] = useState(false)
    const [idLesson, setIdLesson] = useState()
    const [imgLesson, setImgLesson] = useState()

    useEffect(() => {
        trackPromise(getAllCategories())
        trackPromise(getLessons());
    }, [])

    const getAllCategories = async () => {
        let response = await getAllCategory()
        allCategories.current = response.data.result
    }

    const checkCategory = (id) => {
        let category = allCategories.current.find(item => item.id === id)
        return category.name
    }

    const getLessons = async () => {
        let response = await getAllLesson();
        if (response.data.result) {
            const data = response.data.result.map((item) => (
                {
                    category: checkCategory(item.category),
                    profile: item.image,
                    name: item.lessonName,
                    description: item.description,
                    courses: item.courses.length,
                    id: item._id
                }
            ));
            setAllLessons(data)
        }
    }

    const removeLessons = async (id) => {
        let response = await removeLesson(id)
        if (response.data.result) {
            let newLessons = allLessons.filter((item) => item.id != id);
            setOpenToast(true)
            onToast(response.data.message[0].message, "success")
            setAllLessons(newLessons)
        }
    }

    const editLessons = async (id) => {
        let response = await getLessonById(id)
        if (response.data.result) {
            setDataLesson(response.data.result);
            setCourseByIdLesson(response.data.result.courses)
            setOpenEditLesson(true)
        }
    }

    const addCourseToLesson = (id, img) => {
        setOpenAddCourseInLesson(true);
        setIdLesson(id);
        setImgLesson(img)
    }


    const handleChangePage = (event, newPage) => {
        setCurrentPage_MainbarMyCourses(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage_MainbarMyCourses(0);
    };

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <div className="btnAdd">
                        <RegularButton
                            color="success"
                            onClick={() => {
                                setOpenAddLesson(true)
                            }}
                        >افزودن درس
                        </RegularButton>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>تمام دروس</h4>
                        </CardHeader>
                        <CardBody>
                            {allLessons && allLessons.length > 0 ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["", "اسم", "دسته بندی", "توضیحات", "تعداد دوره", ""]}
                                    tableData={allLessons}
                                    currentPage={currentPage_MainbarMyCourses}
                                    rowsCount={rowsPerPage}
                                    removeLessons={(id) => {
                                        onConfirmSetter('آیا برای حذف درس اطمینان دارید؟', () => {
                                            trackPromise(removeLessons(id))
                                        })
                                        setConfirmPopupOpen(true)
                                    }}
                                    editLessons={(id) => {
                                        trackPromise(editLessons(id))
                                    }}
                                    addCourseToLesson={addCourseToLesson}
                                    lessons
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                /> :
                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    backgroundColor: "#ec7254",
                                    color: "white",
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}> درسی ثبت نشده</div>}
                        </CardBody>
                        <div>

                        </div>
                    </Card>
                </GridItem>
            </GridContainer>

            {openEditLesson && dataLesson && courseByIdLesson &&
                <EditLEsson
                    openEditLessonPopUp={openEditLesson}
                    EditSuccess={() => {
                        getLessons()
                        setOpenEditLesson(false)
                    }}
                    dataLesson={dataLesson}
                    closePopUpEdit={() => {
                        setOpenEditLesson(false)
                    }}
                    courseByIdLesson={courseByIdLesson}
                />
            }

            {openAddLesson &&
                <AddLesson
                    openAddLessonPopUp={openAddLesson}
                    AddSuccess={() => {
                        setOpenToast(true)
                        onToast("درس اضافه شد", "success")
                        getLessons()
                        setOpenAddLesson(false)
                    }}
                    closePopUpAdd={() => {
                        setOpenAddLesson(false)
                    }}
                />
            }

            {openAddCourseInLesson && imgLesson && idLesson &&
                <CreateUser
                    openCreateUserPopUp={openAddCourseInLesson}
                    CreateSuccess={() => {
                        setOpenToast(true)
                        onToast("دوره اضافه شد", "success")
                        getLessons()
                        setOpenAddCourseInLesson(false)
                    }}
                    closePopUpCreate={() => {
                        setOpenAddCourseInLesson(false)
                    }}
                    imgLesson={imgLesson}
                    idLesson={idLesson}
                />
            }

        </>
    );
}
