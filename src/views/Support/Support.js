import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import HowToRegRoundedIcon from '@material-ui/icons/HowToRegRounded';

import { GeneralContext } from "providers/GeneralContext";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import ShowDataComment from "views/Comments/ShowDataComment";
import AnswerComment from "./AnswerSuggort";

import { getComment } from "api/Core/Comment";
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
    root: {
        flexGrow: 1,
        maxWidth: "100%",
    },
};

const useStyles = makeStyles(styles);
export default function Support() {
    const classes = useStyles();
    const { onToast, setOpenToast } = useContext(GeneralContext);

    const [value, setValue] = useState(1);

    const [supportUser, setSupportUser] = useState()
    const [supportGuess, setSupportGuess] = useState()

    const [currentPage_MainbarUser, setCurrentPage_MainbarUser] = useState(0);
    const [rowsPerPageUser, setRowsPerPageUser] = useState(5);

    const [currentPage_MainbarGuess, setCurrentPage_MainbarGuess] = useState(0);
    const [rowsPerPageGuess, setRowsPerPageGuess] = useState(5);

    const [dataComment, setDataComment] = useState()

    const [openPopUpShowDataComment, setOpenPopUpShowDataComment] = useState(false)
    const [openAnswerPopUp, setOpenAnswerPopUp] = useState(false)


    useEffect(() => {
        getComments()
    }, [])


    const getComments = async () => {
        let response = await getComment();

        setSupportUser(response.data.filter((item) => item.postId.split('.')[1] === "userr" && item.postId.split('.')[2] === "chatt").reverse())
        setSupportGuess(response.data.filter((item) => item.postId.split('.')[1] === "guess" && item.postId.split('.')[2] === "chatt").reverse())
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangePageUser = (event, newPage) => {
        setCurrentPage_MainbarUser(newPage)
    }

    const handleChangeRowsPerPageUser = (event) => {
        setRowsPerPageUser(+event.target.value);
        setCurrentPage_MainbarUser(0);
    };

    const handleChangePageGuess = (event, newPage) => {
        setCurrentPage_MainbarGuess(newPage)
    }

    const handleChangeRowsPerPageGuess = (event) => {
        setRowsPerPageGuess(+event.target.value);
        setCurrentPage_MainbarGuess(0);
    };

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>پشتیبانی</h4>
                        </CardHeader>
                        <CardBody>

                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="icon label tabs example"
                            >
                                <Tab icon={<HowToRegRoundedIcon />} value={1} label="کاربر" />

                                <Tab icon={<PersonRoundedIcon />} value={2} label="مهمان" />

                            </Tabs>

                            {value === 1 &&
                                <>
                                    {supportUser && supportUser.length > 0 ?
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["تاریخ ایجاد پیام", "پیام", ""]}
                                            tableData={supportUser}
                                            currentPage={currentPage_MainbarUser}
                                            rowsCount={rowsPerPageUser}
                                            handleChangePage={handleChangePageUser}
                                            handleChangeRowsPerPage={handleChangeRowsPerPageUser}
                                            showAllData={(id) => {
                                                let correntComment = supportUser.filter((item) => item._id === id)
                                                setDataComment(correntComment)
                                                setOpenPopUpShowDataComment(true);
                                            }}
                                            answerToSupport={(id) => {
                                                let correntComment = supportUser.filter((item) => item._id === id)
                                                setDataComment(correntComment)
                                                setOpenAnswerPopUp(true)
                                            }}
                                            support
                                        />
                                        : <div style={{
                                            textAlign: 'center',
                                            marginTop: 10,
                                            backgroundColor: "#ec7254",
                                            color: "white",
                                            borderRadius: 5,
                                            paddingTop: 10,
                                            paddingBottom: 10
                                        }}> پیامی ثبت نشده</div>
                                    }
                                </>}

                            {value === 2 &&
                                <>
                                    {supportGuess && supportGuess.length > 0 ?
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["تاریخ ایجاد پیام", "پیام", ""]}
                                            tableData={supportGuess}
                                            currentPage={currentPage_MainbarGuess}
                                            rowsCount={rowsPerPageGuess}
                                            handleChangePage={handleChangePageGuess}
                                            handleChangeRowsPerPage={handleChangeRowsPerPageGuess}
                                            showAllData={(id) => {
                                                let correntComment = supportGuess.filter((item) => item._id === id)
                                                setDataComment(correntComment)
                                                setOpenPopUpShowDataComment(true);
                                            }}
                                            answerToSupport={(id) => {
                                                let correntComment = supportGuess.filter((item) => item._id === id)
                                                setDataComment(correntComment)
                                                setOpenAnswerPopUp(true)
                                            }}
                                            support
                                        /> :
                                        <div style={{
                                            textAlign: 'center',
                                            marginTop: 10,
                                            backgroundColor: "#ec7254",
                                            color: "white",
                                            borderRadius: 5,
                                            paddingTop: 10,
                                            paddingBottom: 10
                                        }}> پیامی ثبت نشده</div>
                                    }
                                </>}

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

            {openPopUpShowDataComment && dataComment &&
                <ShowDataComment
                    openDataCommentPopUp={openPopUpShowDataComment}
                    dataComment={dataComment[0]}
                    closePopUpDataComment={() => {
                        setOpenPopUpShowDataComment(false);
                        setDataComment('')
                    }}
                    support
                />
            }

            {openAnswerPopUp && dataComment &&
                <AnswerComment
                    openAnswerCommentPopUp={openAnswerPopUp}
                    closePopUpAnswerComment={() => {
                        setOpenAnswerPopUp(false)
                    }}
                    dataComment={dataComment[0]}
                    setAnswerComment={() => {
                        onToast('جواب به کامنت ثبت شد.', "success")
                        setOpenToast(true)
                        trackPromise(getComments());
                        setOpenAnswerPopUp(false)
                    }}
                />
            }
        </>
    )
}