import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
// import RegularButton from "components/CustomButtons/Button";
import EditGroup from "./EditConfig"
import InsertConfig from "./InsertConfig"
// api
import { GeneralContext } from "providers/GeneralContext";
import { getAllConfigs, removeConfig } from "api/Core/Config";

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

export default function Setting() {

    const classes = useStyles();
    const [allConfig, setAllConfig] = useState()
    const [
        currentPage_MainbarMyConfig,
        setCurrentPage_MainbarMyConfig,
    ] = useState(0);
    //add
    const [openInsertConfig, setOpenInsertConfig] = useState(false)


    //edit
    const [dataConfig, setDataConfig] = useState()
    const [openUpdateConfig, setOpenUpdateConfig] = useState(false)

    const {
        setConfirmPopupOpen,
        onConfirmSetter,
        setOpenToast,
        onToast
    } = useContext(GeneralContext);

    useEffect(() => {
        trackPromise(getConfig())
    }, [])

    const getConfig = async (currentPage) => {

        const data = {
            first: (currentPage || currentPage === 0) ? currentPage.toString() : currentPage_MainbarMyConfig.toString(),
            max: "10"
        }
        let response1 = await getAllConfigs(data);
        if (Object.values(response1.data).length > 0) {
            setAllConfig(response1.data);

        } else {
            setCurrentPage_MainbarMyConfig(currentPage_MainbarMyConfig - 10);
            onToast("تنظیماتی دیگر وجود ندارد", "warning")
            setOpenToast(true)
        }
    }

    const handleChangePage = (currentPage) => {
        setCurrentPage_MainbarMyConfig(currentPage + 10);
        getConfig(currentPage + 10)
    };

    const handleChangeRowsPerPage = (currentPage) => {
        let currPage = currentPage - 10;
        setCurrentPage_MainbarMyConfig(currPage);
        getConfig(currPage)
    };

    const removeSelectConfig = async (row) => {
        const configName = row.CNF_TYPE;
        const data = Object.create(
            {
                configName: {
                    CNF_TYPE: row.CNF_TYPE,
                    CNF_STATE: row.CNF_STATE,
                    CNF_DESCRIPTION: row.CNF_DESCRIPTION,
                    CNF_NAME: row.CNF_NAME
                },
            },
        );
        data[configName] = data["configName"];

        let response = await removeConfig(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("گروه با موفقیت حذف شد", "success");
            getConfig();
        } else {
            setOpenToast(true);
            onToast("گروه حذف نشد", "error");
        }
    }

    const EditConfig = async (row) => {
        setDataConfig(row);
        setOpenUpdateConfig(true);

    }


    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <div className="btnAdd2">
                        <Tooltip
                            id="tooltip-top-start"
                            title="افزودن تنظیمات"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                            color={"#00adef"}
                        >
                            <IconButton
                                aria-label="Key"
                                className={classes.tableActionButton}
                                onClick={() => {
                                    setOpenInsertConfig(true);
                                }}
                            >
                                <AddIcon
                                    className={
                                        classes.tableActionButtonIcon}
                                    style={{ color: "white", fontSize: "2rem" }}
                                />
                            </IconButton>
                        </Tooltip>

                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>

                        <CardBody>
                            {allConfig && Object.keys(allConfig).length > 0 ? (
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={[
                                        "نوع تنظیمات",
                                        "وضعیت",
                                        "نام",
                                        "نوع",
                                        "توضیحات",
                                        "عملیات",
                                    ]}
                                    tableData={Object.values(allConfig)}
                                    currentPage={currentPage_MainbarMyConfig}
                                    removeConfig={(row) => {
                                        onConfirmSetter("آیا برای حذف تنظیمات مطمئن هستید؟", () => {
                                            trackPromise(removeSelectConfig(row));
                                        });
                                        setConfirmPopupOpen(true);
                                    }}
                                    EditConfig={EditConfig}
                                    config
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}

                                />
                            ) : (
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: 10,
                                        backgroundColor: "#ec7254",
                                        color: "white",
                                        borderRadius: 5,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                    }}
                                >
                                    {" "}
                                    تنظیماتی وجود ندارد
                                </div>
                            )}

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            {openUpdateConfig && dataConfig &&
                <EditGroup
                    openEditConfigPopUp={openUpdateConfig}
                    dataConfig={dataConfig}
                    closePopUpEdit={() => { setOpenUpdateConfig(false) }}
                    EditSuccess={() => {
                        setOpenToast(true);
                        onToast("تنظیمات بروزرسانی شد", "success");
                        trackPromise(getAllConfigs())
                        setOpenUpdateConfig(false)
                    }} />
            }

            {openInsertConfig &&
                <InsertConfig
                    openPopUpInsertConfig={openInsertConfig}
                    closePopUp={() => { setOpenInsertConfig(false) }}
                    InsertSuccess={() => {
                        setOpenToast(true);
                        onToast("تنظیمات اضافه شد", "success");
                        trackPromise(getAllConfigs());
                        setOpenInsertConfig(false);
                    }} />
            }
        </>
    );
}
