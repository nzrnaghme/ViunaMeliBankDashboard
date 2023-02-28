import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
// import TabPanel from '@material-ui/lab/TabPanel';
import Tab from '@material-ui/core/Tab';
import ForumIcon from '@material-ui/icons/Forum';
import MessageIcon from '@material-ui/icons/Message';
import FeedbackIcon from '@material-ui/icons/Feedback';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';

import { GeneralContext } from "providers/GeneralContext";
import Table from "components/Table/Table.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import ShowDataComment from "./ShowDataComment";
import AnswerComment from "./AnswerComment";

import { getComment } from "api/Core/Comment"
import { verifyComment } from "api/Core/Comment";
import { trackPromise } from "react-promise-tracker";

import {
    infoCardHeader,
    whiteColor,
} from "assets/jss/material-dashboard-react.js";
import { getCourseById } from "api/Core/Course";


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
    color: whiteColor,
    "&:not($cardHeaderIcon)": {
        ...infoCardHeader,
    },
};

const useStyles = makeStyles(styles);

export default function Comments() {
    const { onToast, setOpenToast } = useContext(GeneralContext);

    const classes = useStyles();
    const [value, setValue] = useState(1);

    const [currentPage_MainbarAll, setCurrentPage_MainbarAll] = useState(0);
    const [rowsPerPageAll, setRowsPerPageAll] = useState(5);

    const [currentPage_MainbarAccept, setCurrentPage_MainbarAccept] = useState(0);
    const [rowsPerPageAccept, setRowsPerPageAccept] = useState(5);

    const [currentPage_MainbarAnswer, setCurrentPage_MainbarAnswer] = useState(0);
    const [rowsPerPageAnswer, setRowsPerPageAnswer] = useState(5);

    const [currentPage_MainbarWaiting, setCurrentPage_MainbarWaiting] = useState(0);
    const [rowsPerPageWaiting, setRowsPerPageWaiting] = useState(5);


    const [allComments, setAllComments] = useState();
    const [notVerifiedComment, setNotVerifiedComment] = useState();
    const [VerifiedComment, setVerifiedComment] = useState();
    const [answerComment, setAnswerComment] = useState();

    const [openPopUpShowDataComment, setOpenPopUpShowDataComment] = useState(false)
    const [dataComment, setDataComment] = useState()

    const [openAnswerPopUp, setOpenAnswerPopUp] = useState(false)

    const [detailCourse, setDetailCourse] = useState();


    useEffect(() => {
        trackPromise(getAllComments())
    }, [])

    const getAllComments = async () => {
        let response = await getComment();
        if (response.data) {
            setAllComments(response.data.reverse())

            setNotVerifiedComment(response.data.filter((item) => item.verified === false && item.postId.length === 24).reverse())
            setVerifiedComment(response.data.filter((item) => item.verified === true && item.postId.length === 24 && !item.answer))
            setAnswerComment(response.data.filter((item) => item.answer && item.postId.length === 24).reverse())
        }
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                getAllComments()
            }
        }
    }

    const handleChangePageAll = (event, newPage) => {
        setCurrentPage_MainbarAll(newPage)
    }

    const handleChangeRowsPerPageAll = (event) => {
        setRowsPerPageAll(+event.target.value);
        setCurrentPage_MainbarAll(0);
    };



    const handleChangePageAccept = (event, newPage) => {
        setCurrentPage_MainbarAccept(newPage)
    }

    const handleChangeRowsPerPageAccept = (event) => {
        setRowsPerPageAccept(+event.target.value);
        setCurrentPage_MainbarAccept(0);
    };




    const handleChangePageAnswer = (event, newPage) => {
        setCurrentPage_MainbarAnswer(newPage)
    }

    const handleChangeRowsPerPageAnswer = (event) => {
        setRowsPerPageAnswer(+event.target.value);
        setCurrentPage_MainbarAnswer(0);
    };




    const handleChangePageWaiting = (event, newPage) => {
        setCurrentPage_MainbarWaiting(newPage)
    }

    const handleChangeRowsPerPageWaiting = (event) => {
        setRowsPerPageWaiting(+event.target.value);
        setCurrentPage_MainbarWaiting(0);
    };

    const getDetailCourse = async (id) => {
        let response = await getCourseById(id);
        if (response.data.result) {
            setDetailCourse(response.data.result);
        
        }
    }


    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>کامنت ها</h4>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.root}>

                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="icon label tabs example"
                                >
                                    <Tab icon={<MessageIcon />} value={1} label="تمام کامنت‌ها" />
                                    <Tab icon={<DoneRoundedIcon />} value={2} label="تایید شده" />
                                    <Tab icon={<ForumIcon />} value={3} label="پاسخ داده‌شده" />
                                    <Tab icon={<FeedbackIcon />} value={4} label="در انتظار تایید" />
                                </Tabs>

                                {value === 1 &&
                                    <>
                                        {allComments && allComments.length > 0 ?
                                            <Table
                                                tableHeaderColor="info"
                                                tableHead={["اسم کاربر", "ایمیل کاربر", "تاریخ کامنت", "متن کامنت", "", ""]}
                                                tableData={allComments}
                                                currentPage={currentPage_MainbarAll}
                                                rowsCount={rowsPerPageAll}
                                                answerToComment={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    getDetailCourse(correntComment[0].postId)
                                                    setOpenAnswerPopUp(true)
                                                }}
                                                changeVerified={changeVerified}
                                                showAllData={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)

                                                    getDetailCourse(correntComment[0].postId)
                                                    setOpenPopUpShowDataComment(true);
                                                }}
                                                allComment
                                                verified
                                                handleChangePage={handleChangePageAll}
                                                handleChangeRowsPerPage={handleChangeRowsPerPageAll}
                                            /> :
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: 10,
                                                backgroundColor: "#ec7254",
                                                color: "white",
                                                borderRadius: 5,
                                                paddingTop: 10,
                                                paddingBottom: 10
                                            }}> کامنتی ثبت نشده</div>}
                                    </>
                                }

                                {value === 2 &&
                                    <>
                                        {VerifiedComment && VerifiedComment.length > 0 ?
                                            <Table
                                                tableHeaderColor="info"
                                                tableHead={["اسم کاربر", "ایمیل کاربر", "تاریخ کامنت", "متن کامنت", "", ""]}
                                                tableData={VerifiedComment}
                                                currentPage={currentPage_MainbarAccept}
                                                answerToComment={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    getDetailCourse(correntComment[0].postId)
                                                    setOpenAnswerPopUp(true)
                                                }}
                                                showAllData={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    getDetailCourse(correntComment[0].postId)
                                                    setOpenPopUpShowDataComment(true);
                                                }}
                                                changeVerified={changeVerified}
                                                allComment
                                                verified
                                                handleChangePage={handleChangePageAccept}
                                                handleChangeRowsPerPage={handleChangeRowsPerPageAccept}
                                                rowsCount={rowsPerPageAccept}
                                            /> :
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: 10,
                                                backgroundColor: "#ec7254",
                                                color: "white",
                                                borderRadius: 5,
                                                paddingTop: 10,
                                                paddingBottom: 10
                                            }}> کامنتی ثبت نشده</div>}
                                    </>
                                }

                                {value === 4 &&
                                    <>
                                        {notVerifiedComment && notVerifiedComment.length > 0 ?
                                            <Table
                                                tableHeaderColor="info"
                                                tableHead={["اسم کاربر", "ایمیل کاربر", "تاریخ کامنت", "متن کامنت", "",""]}
                                                tableData={notVerifiedComment}
                                                currentPage={currentPage_MainbarWaiting}
                                                handleChangePage={handleChangePageWaiting}
                                                handleChangeRowsPerPage={handleChangeRowsPerPageWaiting}
                                                rowsCount={rowsPerPageWaiting}
                                                changeVerified={changeVerified}
                                                showAllData={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)

                                                    getDetailCourse(correntComment[0].postId)
                                                    setOpenPopUpShowDataComment(true);
                                                }}
                                                allComment
                                                verified
                                            /> :
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: 10,
                                                backgroundColor: "#ec7254",
                                                color: "white",
                                                borderRadius: 5,
                                                paddingTop: 10,
                                                paddingBottom: 10
                                            }}> کامنتی ثبت نشده</div>
                                        }
                                    </>
                                }

                                {value === 3 &&
                                    <>
                                        {answerComment && answerComment.length > 0 ?
                                            <Table
                                                tableHeaderColor="info"
                                                tableHead={["اسم کاربر", "ایمیل کاربر", "تاریخ کامنت", "متن کامنت", "پاسخ کامنت", "", ""]}
                                                tableData={answerComment}
                                                currentPage={currentPage_MainbarAnswer}
                                                handleChangePage={handleChangePageAnswer}
                                                handleChangeRowsPerPage={handleChangeRowsPerPageAnswer}
                                                rowsCount={rowsPerPageAnswer}
                                                changeVerified={changeVerified}
                                                showAllData={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    getDetailCourse(correntComment[0].postId)
                                                    setOpenPopUpShowDataComment(true);
                                                }}
                                                allComment
                                            /> :
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: 10,
                                                backgroundColor: "#ec7254",
                                                color: "white",
                                                borderRadius: 5,
                                                paddingTop: 10,
                                                paddingBottom: 10
                                            }}> کامنتی ثبت نشده</div>
                                        }
                                    </>
                                }
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

            {openPopUpShowDataComment && dataComment && detailCourse &&
                <ShowDataComment
                    dataCourse={detailCourse}
                    openDataCommentPopUp={openPopUpShowDataComment}
                    dataComment={dataComment[0]}
                    closePopUpDataComment={() => {
                        setOpenPopUpShowDataComment(false);
                        setDataComment('')
                    }} />
            }

            {openAnswerPopUp && dataComment && detailCourse &&
                <AnswerComment
                    dataCourse={detailCourse}
                    openAnswerCommentPopUp={openAnswerPopUp}
                    closePopUpAnswerComment={() => {
                        setOpenAnswerPopUp(false)
                    }}
                    dataComment={dataComment[0]}
                    setAnswerComment={() => {
                        onToast('جواب به کامنت ثبت شد.', "success")
                        setOpenToast(true)
                        getAllComments();
                        setOpenAnswerPopUp(false)
                    }}
                />
            }
        </>
    )
}