import React, { useEffect, useState, useContext, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import MessageIcon from '@material-ui/icons/Message';

import { GeneralContext } from "providers/GeneralContext";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import ShowDataComment from "./showAnswerQuestion";
import AnswerComment from "./AnswerQuestion";

import { getItem } from "api/storage/storage";
import { trackPromise } from "react-promise-tracker";
import { getComment } from "api/Core/Comment";
import { getEmployeeById } from "api/Core/Employe_Manage";
import { getCourseById } from "api/Core/Course";
import { verifyComment } from "api/Core/Comment";


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
    root: {
        flexGrow: 1,
        maxWidth: "100%",
    },
};

const useStyles = makeStyles(styles);
export default function QuestionAnswer() {
    const classes = useStyles();
    const role = getItem('role');
    const userId = getItem('id');

    const { onToast, setOpenToast } = useContext(GeneralContext);

    const [value, setValue] = useState(1);

    const [detailCourse, setDetailCourse] = useState();

    const [questionWithOutAnswer, setQuestionWithOutAnswer] = useState()
    const [questionWithAnswer, setQuestionWithAnswer] = useState()

    const [currentPage_MainbarArticles, setCurrentPage_MainbarArticles] = useState(0);
    const [rowsPerPageArticles, setRowsPerPageArticles] = useState(5);

    const [openPopUpShowDataComment, setOpenPopUpShowDataComment] = useState(false)
    const [dataComment, setDataComment] = useState()

    const [openAnswerPopUp, setOpenAnswerPopUp] = useState(false)

    //teacherPanel
    const courseTeacher = useRef()

    useEffect(() => {
        if (role === 'admin') {
            trackPromise(getComments())
        }
        else
            trackPromise(getCourseTeacher(userId))
    }, [role])

    const getComments = async () => {
        let response = await getComment();
        courseTeacher.current = (response.data);

        setQuestionWithOutAnswer(response.data.filter((item) => item.postId.split('.')[1] === "question" && !item.answer).reverse())
        setQuestionWithAnswer(response.data.filter((item) => item.postId.split('.')[1] === "question" && item.answer).reverse())
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getCourseTeacher = async (userId) => {
        let response = await getEmployeeById(userId);
        if (response.data.result) {
            let rightData = response.data.result.courses.map((item) => item._id)
            console.log(rightData, "rightData");
            courseTeacher.current = (rightData);

            if (rightData && rightData.length > 0) {
                trackPromise(getCommentTeacher())
            }
        }
    }

    const getCommentTeacher = async () => {
        let response = await getComment();
        if (response.data && courseTeacher.current && courseTeacher.current.length > 0) {
            console.log(response.data.filter((item) => item.postId.split('.')[1] === "question" && !item.answer), "response.data");
            courseTeacher.current.map((idCourse) => {
                console.log(idCourse, "id");

                setQuestionWithOutAnswer(response.data.filter((item) => item.postId.split('.')[1] === "question" && item.postId.split('.')[0] === idCourse && !item.answer))
                setQuestionWithAnswer(response.data.filter((item) => item.postId.split('.')[1] === "question" && item.postId.split('.')[0] === idCourse && item.answer))
            })
        }
    }

    const getDetailCourse = async (id) => {
        console.log(id, "id");
        let response = await getCourseById(id);
        console.log(response.data.result, "response.data.result");
        if (response.data.result) {
            setDetailCourse(response.data.result);
            setOpenPopUpShowDataComment(true);
        }
    }

    const getDetailCourseForAnswer = async (id) => {
        console.log(id, "id");
        let response = await getCourseById(id);
        console.log(response.data.result, "response.data.result");
        if (response.data.result) {
            setDetailCourse(response.data.result);
            setOpenAnswerPopUp(true)
        }
    }

    const handleChangePageNews = (event, newPage) => {
        setCurrentPage_MainbarArticles(newPage)
    }

    const handleChangeRowsPerPageNews = (event) => {
        setRowsPerPageArticles(+event.target.value);
        setCurrentPage_MainbarArticles(0);
    };

    const changeVerified = async (id, verififed) => {

        if (verififed === false) {
            const data = {
                id
            }
            let response = await verifyComment(data);
            if (response.data) {
                onToast('کامنت تایید شد', 'success');
                setOpenToast(true)
                if (role === 'admin')
                    getComments()
                else getCommentTeacher()
            }
        }
    }


    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>پرسش و پاسخ</h4>
                        </CardHeader>
                        <CardBody>
                            {courseTeacher.current && courseTeacher.current.length > 0 ?
                                <div>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="fullWidth"
                                        indicatorColor="primary"
                                        textColor="primary"
                                        aria-label="icon label tabs example"
                                    >
                                        <Tab icon={<DoneRoundedIcon />} value={1} label="سوال جواب داده نشده" />
                                        <Tab icon={<MessageIcon />} value={2} label="سوالات جواب داده شده" />

                                    </Tabs>


                                    {value === 1 &&
                                        <>
                                            {questionWithOutAnswer && questionWithOutAnswer.length > 0 ?
                                                <Table
                                                    tableHeaderColor="info"
                                                    tableHead={["اسم کاربر", "ایمیل", "تاریخ ایجاد سوال", "سوال", "", ""]}
                                                    tableData={questionWithOutAnswer}
                                                    currentPage={currentPage_MainbarArticles}
                                                    rowsCount={rowsPerPageArticles}
                                                    handleChangePage={handleChangePageNews}
                                                    handleChangeRowsPerPage={handleChangeRowsPerPageNews}
                                                    showAllData={(id, postId) => {
                                                        let correntComment = questionWithOutAnswer.filter((item) => item._id === id)
                                                        setDataComment(correntComment)
                                                        console.log(correntComment, "correntComment");

                                                        getDetailCourse(postId)
                                                    }}
                                                    answerToComment={(id, postId, verified) => {
                                                        console.log(verified, "verified");
                                                        if (verified === true) {
                                                            let correntComment = questionWithOutAnswer.filter((item) => item._id === id)
                                                            setDataComment(correntComment)
                                                            getDetailCourseForAnswer(postId)
                                                        } else {
                                                            onToast('ابتدا سوال را تایید کنید سپس جواب بدین!!', 'warning');
                                                            setOpenToast(true)
                                                        }
                                                    }}
                                                    changeVerified={changeVerified}
                                                    questionAnswer
                                                /> :
                                                <div style={{
                                                    textAlign: 'center',
                                                    marginTop: 10,
                                                    backgroundColor: "#ec7254",
                                                    color: "white",
                                                    borderRadius: 5,
                                                    paddingTop: 10,
                                                    paddingBottom: 10
                                                }}> سوالی ثبت نشده</div>
                                            }
                                        </>
                                    }

                                    {value === 2 &&
                                        <>
                                            {questionWithAnswer && questionWithAnswer.length > 0 ?
                                                <Table
                                                    tableHeaderColor="info"
                                                    tableHead={["اسم کاربر", "ایمیل", "تاریخ ایجاد سوال", "سوال", "جواب", "", ""]}
                                                    tableData={questionWithAnswer}
                                                    currentPage={currentPage_MainbarArticles}
                                                    rowsCount={rowsPerPageArticles}
                                                    handleChangePage={handleChangePageNews}
                                                    handleChangeRowsPerPage={handleChangeRowsPerPageNews}
                                                    showAllData={(id, postId) => {
                                                        let correntComment = questionWithAnswer.filter((item) => item._id === id)
                                                        setDataComment(correntComment)
                                                        getDetailCourse(postId)
                                                    }}
                                                    changeVerified={changeVerified}
                                                    questionAnswer
                                                /> :
                                                <div style={{
                                                    textAlign: 'center',
                                                    marginTop: 10,
                                                    backgroundColor: "#ec7254",
                                                    color: "white",
                                                    borderRadius: 5,
                                                    paddingTop: 10,
                                                    paddingBottom: 10
                                                }}> سوالی ثبت نشده</div>
                                            }
                                        </>
                                    }
                                </div> :

                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    backgroundColor: "#ec7254",
                                    color: "white",
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>  دوره ثبت نشده برا استاد که پیام نشان داده شود!!
                                </div>
                            }
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

            {openPopUpShowDataComment && dataComment && detailCourse &&
                <ShowDataComment
                    detailCourse={detailCourse}
                    openDataCommentPopUp={openPopUpShowDataComment}
                    dataComment={dataComment[0]}
                    closePopUpDataComment={() => {
                        setOpenPopUpShowDataComment(false);
                        setDataComment('')
                    }}
                />
            }

            {openAnswerPopUp && dataComment && detailCourse &&
                <AnswerComment
                    detailCourse={detailCourse}
                    openAnswerCommentPopUp={openAnswerPopUp}
                    closePopUpAnswerComment={() => {
                        setOpenAnswerPopUp(false)
                    }}
                    dataComment={dataComment[0]}
                    setAnswerComment={() => {
                        onToast('جواب به کامنت ثبت شد.', "success")
                        setOpenToast(true)
                        if (role === 'admin')
                            trackPromise(getComments())
                        else trackPromise(getCommentTeacher())
                        setOpenAnswerPopUp(false)
                    }}
                />
            }
        </>
    )
}