import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";

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

import stylesTool from "assets/jss/material-dashboard-react/tooltipStyle.js";

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
        fontFamily: "'IRANSANSX'",
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
const useStylesTool = makeStyles(stylesTool);

export default function Setting() {
    const classes = useStyles();
    const classesTools = useStylesTool();

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

    const [noNext, setNoNext] = useState(false)

    const {
        setConfirmPopupOpen,
        onConfirmSetter
    } = useContext(GeneralContext);

    useEffect(() => {
        trackPromise(getConfig())
    }, [])

    const getConfig = async (currentPage, fromHandlePlus, fromHandleMisen) => {

        const data = {
            first: (currentPage || currentPage === 0) ? currentPage.toString() : currentPage_MainbarMyConfig.toString(),
            max: "10"
        }
        let response1 = await getAllConfigs(data);
        if (Object.values(response1.data).length > 0) {
            setAllConfig(response1.data);
            if (fromHandlePlus) {
                setCurrentPage_MainbarMyConfig(currentPage);
            }
            else if (fromHandleMisen) {
                setCurrentPage_MainbarMyConfig(currentPage);
            }
        } else {
            setNoNext(false);
            toast.warning("تنظیماتی دیگر وجود ندارد");
        }
    }

    const handleChangePage = (currentPage) => {
        trackPromise(getConfig(currentPage + 10, true));
    };

    const handleChangeRowsPerPage = (currentPage) => {
        let currPage = currentPage - 10;
        trackPromise(getConfig(currPage, false, true));
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
            toast.success("گروه با موفقیت حذف شد");
            trackPromise(getConfig());
        } else {
            toast.error("گروه حذف نشد");
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
                            classes={{ tooltip: classesTools.tooltip }}
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
                                        // "وضعیت",
                                        "نام",
                                        "نوع",
                                        "توضیحات",
                                        "عملیات",
                                    ]}
                                    NoNext={noNext}
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
                        toast.success("تنظیمات بروزرسانی شد");
                        trackPromise(getAllConfigs())
                        setOpenUpdateConfig(false)
                    }} />
            }

            {openInsertConfig &&
                <InsertConfig
                    openPopUpInsertConfig={openInsertConfig}
                    closePopUp={() => { setOpenInsertConfig(false) }}
                    InsertSuccess={() => {
                        toast.success("تنظیمات اضافه شد");
                        trackPromise(getAllConfigs());
                        setOpenInsertConfig(false);
                    }} />
            }
        </>
    );
}
