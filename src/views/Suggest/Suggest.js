import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded';
import DescriptionIcon from '@material-ui/icons/Description';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import ShowDataComment from "./ShowSuggest";

import { getComment } from "api/Core/Comment";
import { trackPromise } from "react-promise-tracker";
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
export default function Suggest() {
    const classes = useStyles();

    const [value, setValue] = useState(1);

    const [suggestUser, setSuggestUser] = useState()
    const [suggestCourse, setSuggestCourse] = useState()
    const [suggestTeacher, setSuggestTeacher] = useState()

    const [currentPage_MainbarUser, setCurrentPage_MainbarUser] = useState(0);
    const [rowsPerPageUser, setRowsPerPageUser] = useState(5);

    const [currentPage_MainbarCourse, setCurrentPage_MainbarCourse] = useState(0);
    const [rowsPerPageCourse, setRowsPerPageCourse] = useState(5);

    const [currentPage_MainbarTeacher, setCurrentPage_MainbarTeacher] = useState(0);
    const [rowsPerPageTeacher, setRowsPerPageTeacher] = useState(5);

    const [dataComment, setDataComment] = useState()
    const [openPopUpShowDataComment, setOpenPopUpShowDataComment] = useState(false)

    useEffect(() => {
        trackPromise(getComments());
    }, [])


    const getComments = async () => {
        let response = await getComment();

        setSuggestTeacher(response.data.filter((item) => item.postId === ".teacher").reverse())
        setSuggestCourse(response.data.filter((item) => item.postId === ".course").reverse())
        setSuggestUser(response.data.filter((item) => item.postId === ".idea").reverse())
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

    const handleChangePageCourse = (event, newPage) => {
        setCurrentPage_MainbarCourse(newPage)
    }

    const handleChangeRowsPerPageCourse = (event) => {
        setRowsPerPageCourse(+event.target.value);
        setCurrentPage_MainbarCourse(0);
    };

    const handleChangePageTeacher = (event, newPage) => {
        setCurrentPage_MainbarTeacher(newPage)
    }

    const handleChangeRowsPerPageTeacher = (event) => {
        setRowsPerPageTeacher(+event.target.value);
        setCurrentPage_MainbarTeacher(0);
    };

    const changeVerified = async (id, verififed) => {
        if (verififed === false) {
            const data = {
                id
            }
            let response = await verifyComment(data);
            if (response.data) {
                getComments();
                setOpenPopUpShowDataComment(false);
                setDataComment('')
            }
        } else setOpenPopUpShowDataComment(false);
    }

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>ارتباط با ما</h4>
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
                                <Tab icon={<TextsmsRoundedIcon />} value={1} label=" نظرات" />

                                <Tab icon={<DescriptionIcon />} value={2} label="درخواست دوره" />

                                <Tab icon={<LocalLibraryRoundedIcon />} value={3} label="درخواست استادی" />

                            </Tabs>

                            {value === 1 &&
                                <>
                                    {suggestUser && suggestUser.length > 0 ?
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["تاریخ درخواست", "پیام"]}
                                            tableData={suggestUser}
                                            currentPage={currentPage_MainbarUser}
                                            rowsCount={rowsPerPageUser}
                                            handleChangePage={handleChangePageUser}
                                            handleChangeRowsPerPage={handleChangeRowsPerPageUser}
                                            showAllData={(id) => {
                                                let correntComment = suggestUser.filter((item) => item._id === id)
                                                setDataComment(correntComment)
                                                setOpenPopUpShowDataComment(true);
                                            }}
                                            contactMe
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
                                    {suggestCourse && suggestCourse.length > 0 ?
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["تاریخ درخواست", "پیام"]}
                                            tableData={suggestCourse}
                                            currentPage={currentPage_MainbarCourse}
                                            rowsCount={rowsPerPageCourse}
                                            handleChangePage={handleChangePageCourse}
                                            handleChangeRowsPerPage={handleChangeRowsPerPageCourse}
                                            showAllData={(id) => {
                                                let correntComment = suggestCourse.filter((item) => item._id === id)
                                                setDataComment(correntComment)
                                                setOpenPopUpShowDataComment(true);
                                            }}
                                            contactMe
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

                            {value === 3 &&
                                <>
                                    {suggestTeacher && suggestTeacher.length > 0 ?
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["تاریخ درخواست", "پیام"]}
                                            tableData={suggestTeacher}
                                            currentPage={currentPage_MainbarTeacher}
                                            rowsCount={rowsPerPageTeacher}
                                            handleChangePage={handleChangePageTeacher}
                                            handleChangeRowsPerPage={handleChangeRowsPerPageTeacher}
                                            showAllData={(id) => {
                                                let correntComment = suggestTeacher.filter((item) => item._id === id)
                                                setDataComment(correntComment)

                                                setOpenPopUpShowDataComment(true);
                                            }}
                                            contactMe
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

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            {openPopUpShowDataComment && dataComment &&
                <ShowDataComment
                    value={value}
                    openDataCommentPopUp={openPopUpShowDataComment}
                    dataComment={dataComment[0]}
                    closePopUpDataSuggest={(id, verififed) => {
                        changeVerified(id, verififed)
                    }}
                    support
                />
            }
        </>
    )
}