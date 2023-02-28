import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
// import TabPanel from '@material-ui/lab/TabPanel';
import Tab from '@material-ui/core/Tab';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import FiberNewRoundedIcon from '@material-ui/icons/FiberNewRounded';

import { GeneralContext } from "providers/GeneralContext";
import Table from "components/Table/Table.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "components/CustomButtons/Button";

import EditNews from "./EditNews";

import { getAllNews } from "api/Core/News";
import { getNewsById } from "api/Core/News";
import { deleteNews } from "api/Core/News";
import CreateNews from "./CreateNews";
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

export default function News() {
    const { onToast, setOpenToast, setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);
    const classes = useStyles();

    const [value, setValue] = useState(1);
    const [currentPage_MainbarArticles, setCurrentPage_MainbarArticles] = useState(0);
    const [rowsPerPageArticles, setRowsPerPageArticles] = useState(5);

    const [currentPage_MainbarNews, setCurrentPage_MainbarNews] = useState(0);
    const [rowsPerPageNews, setRowsPerPageNews] = useState(5);

    const [allNews, setAllNews] = useState();
    const [allArticles, setAllArticles] = useState();

    const [openEditNewsPopUp, setOpenEditNewsPopUp] = useState(false);
    const [dataNews, setDataNews] = useState();

    const [openCreateNewsPopUp, setOpenCreateNewsPopUp] = useState(false);

    useEffect(() => {
        trackPromise(getAllNews_Articles())

    }, [])

    const getAllNews_Articles = async () => {
        let response = await getAllNews();
        if (response.data.result) {
            setAllNews(response.data.result.filter((item) => item.category === "news"))
            setAllArticles(response.data.result.filter((item) => item.category === "article"))
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const editNews = async (id) => {

        let response = await getNewsById(id)
        if (response.data.result) {
            setDataNews(response.data.result);
            setOpenEditNewsPopUp(true)
        }
    }

    const removeNews = async (id) => {
        onConfirmSetter('آیا برای حذف اطمینان دارید؟', async () => {
            let response = await deleteNews(id);
            if (response.data) {
                let newNews = allNews.filter((item) => item._id != id)
                setAllNews(newNews);
                getAllNews_Articles()
            }
        })
        setConfirmPopupOpen(true)

    }

    const removeArticles = async (id) => {
        onConfirmSetter('آیا برای حذف اطمینان دارید؟', async () => {
            let response = await deleteNews(id);
            if (response.data) {
                let newNews = allArticles.filter((item) => item._id != id)
                setAllArticles(newNews);
                getAllNews_Articles()
            }
        })
        setConfirmPopupOpen(true)
    }

    const handleChangePageNews = (event, newPage) => {
        setCurrentPage_MainbarNews(newPage)
    }

    const handleChangeRowsPerPageNews = (event) => {
        setRowsPerPageNews(+event.target.value);
        setCurrentPage_MainbarNews(0);
    };

    const handleChangePageArticles = (event, newPage) => {
        setCurrentPage_MainbarArticles(newPage)
    }

    const handleChangeRowsPerPageArticles = (event) => {
        setRowsPerPageArticles(+event.target.value);
        setCurrentPage_MainbarArticles(0);
    };

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <div className="btnAdd">
                        <RegularButton
                            color="success"
                            onClick={() => { setOpenCreateNewsPopUp(true) }}>افزودن مقاله یا خبر
                        </RegularButton>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>اخبار و مقالات</h4>
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
                                    <Tab icon={<FiberNewRoundedIcon />} value={1} label="اخبار" />
                                    <Tab icon={<LanguageRoundedIcon />} value={2} label="مقالات" />

                                </Tabs>

                                {value === 1 &&
                                    <>
                                        {allNews && allNews.length > 0 ?
                                            <Table
                                                tableHeaderColor="info"
                                                tableHead={["", "تیتر", "توضیحات", "دسته بندی", ""]}
                                                tableData={allNews}
                                                currentPage={currentPage_MainbarNews}
                                                rowsCount={rowsPerPageNews}
                                                allNewsShow
                                                editNews={editNews}
                                                removeNews={(id) => {
                                                    trackPromise(removeNews(id))
                                                }}
                                                handleChangePage={handleChangePageNews}
                                                handleChangeRowsPerPage={handleChangeRowsPerPageNews}
                                            /> :
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: 10,
                                                backgroundColor: "#ec7254",
                                                color: "white",
                                                borderRadius: 5,
                                                paddingTop: 10,
                                                paddingBottom: 10
                                            }}> حبر ثبت نشده</div>}
                                    </>
                                }

                                {value === 2 &&
                                    <>
                                        {allArticles && allArticles.length > 0 ?
                                            <Table
                                                tableHeaderColor="info"
                                                tableHead={["", "تیتر", "توضیحات", "دسته بندی", ""]}
                                                tableData={allArticles}
                                                currentPage={currentPage_MainbarArticles}
                                                rowsCount={rowsPerPageArticles}
                                                allNewsShow
                                                editNews={editNews}
                                                removeNews={(id) => {
                                                    trackPromise(removeArticles(id))
                                                }}
                                                handleChangePage={handleChangePageArticles}
                                                handleChangeRowsPerPage={handleChangeRowsPerPageArticles}
                                            />:
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: 10,
                                                backgroundColor: "#ec7254",
                                                color: "white",
                                                borderRadius: 5,
                                                paddingTop: 10,
                                                paddingBottom: 10
                                            }}> مقاله ثبت نشده</div>
                                        }
                                    </>
                                }

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            {openEditNewsPopUp && dataNews &&
                <EditNews
                    opeEditNewsPopUp={openEditNewsPopUp}
                    dataNews={dataNews}
                    closePopUpEditNews={() => {
                        setOpenEditNewsPopUp(false)
                    }}
                    successEditNews={() => {
                        setOpenEditNewsPopUp(false)
                        onToast('خبر بروزرسانی شد', 'success')
                        setOpenToast(true)
                        getAllNews_Articles()
                    }}
                />
            }

            {openCreateNewsPopUp &&
                <CreateNews
                    opeCreateNewsPopUp={openCreateNewsPopUp}
                    closePopUpCreateNews={() => {
                        setOpenCreateNewsPopUp(false)
                    }}
                    successCreateNews={() => {
                        setOpenCreateNewsPopUp(false)
                        onToast('خبر یا مقاله جدید اضافه شد', "success");
                        setOpenToast(true);
                        getAllNews_Articles()
                    }} />
            }
        </>
    )
}