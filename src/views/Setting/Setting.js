import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";

import { GeneralContext } from "providers/GeneralContext";
import { trackPromise } from "react-promise-tracker";
import { getAllConfigs } from "api/Core/Config";

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
    // const roleUser = getItem("role");
    // const userId = getItem('id')

    const classes = useStyles();
    const [allConfig, setAllConfig] = useState()
    const [
        currentPage_MainbarMyConfig,
        setCurrentPage_MainbarMyConfig,
    ] = useState(0);
    const {
        setConfirmPopupOpen,
        onConfirmSetter,
        // setOpenToast,
        // onToast,
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
        setAllConfig(response1.data);
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

    const removeSelectConfig = async () => {

    }

    const EditConfig = async () => {

    }
    console.log(allConfig, "allConfig",);
    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>تنظیمات</h4>
                        </CardHeader>
                        <CardBody>
                            {allConfig && Object.keys(allConfig).length > 0 ? (
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={[
                                        "نوع تنظیمات",
                                        "وضعیت",
                                        "مقادیر",
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
                                    دوره وجود ندارد
                                </div>
                            )}

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

        </>
    );
}
