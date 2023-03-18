import React, { useEffect, useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { GeneralContext } from "providers/GeneralContext";
import { trackPromise } from "react-promise-tracker";
import { getAllGroups } from "api/Core/Group";
import { addGroupToGroup } from "api/Core/Group";


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

export default function ListOfUGroups(props) {
    const classes = useStyles();
    const [currentPage_MainbarCurrentGroup, setCurrentPage_MainbarCurrentGroup] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [currentGroup, setCurrentGroups] = useState()

    const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast } = useContext(GeneralContext);

    const {
        openListGrouptPopUp,
        InsertSuccess,
        closePopUpList,
        dataGroupToGroup } = props

    useEffect(() => {
        trackPromise(getGroups())
    }, [])

    const getGroups = async () => {
        let response = await getAllGroups();
        console.log(response, "response");
        if (response.data) {
            var newData = Object.values(response.data).map((item, index) => ({
                GROUP_USERNAME: Object.keys(response.data)[index],
                GROUP_STATUS: item.GROUP_STATUS,
                GROUP_ID: item.GROUP_ID,
                GROUP_DESCRIPTION: item.GROUP_DESCRIPTION,
            }));
            let responceCurrent = newData.filter((item) => item.GROUP_USERNAME != dataGroupToGroup.GROUP_USERNAME)
            setCurrentGroups(responceCurrent);
        }
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage_MainbarCurrentGroup(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage_MainbarCurrentGroup(0);
    };

    const addGroupToGroups = async (row) => {
        console.log(row);
        const groupName = dataGroupToGroup.GROUP_USERNAME
        const data = Object.create(
            {
                groupName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: row.GROUP_USERNAME,
                },
            },
        );
        data[groupName] = data["groupName"];

        let response = await addGroupToGroup(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("گروه با موفقیت اضافه شد", "success");
        } else {
            setOpenToast(true);
            onToast("گروه قبلا اضافه شده است", "error");
        }
    }

    return (
        <PopUpCustome
            open={openListGrouptPopUp}
            handleClose={() => { closePopUpList() }}
            className="popUpAllCurrentStudent">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning" className="CardTitle">
                            <h4 className={classes.cardTitleWhite}>اضافه کردن به گروه {dataGroupToGroup.GROUP_USERNAME}</h4>
                        </CardHeader>
                        <CardBody className="bodyStyleCard">
                            {currentGroup != undefined && currentGroup.length > 0 ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["اسم گروه", "توضیحات گروه", "وضعیت گروه", "کد گروه", "عملیات"]}

                                    tableData={currentGroup}
                                    currentPage={currentPage_MainbarCurrentGroup}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    rowsCount={rowsPerPage}
                                    addGroupToGroup={(row) => {
                                        onConfirmSetter('آیا برای اضافه کردن گروه مطمئن هستید؟', () => {
                                            console.log(row);
                                            trackPromise(addGroupToGroups(row))
                                        })
                                        setConfirmPopupOpen(true)

                                    }}
                                    groupToGroup
                                /> :
                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    backgroundColor: "#ec7254",
                                    color: "white",
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>گروهی ثبت نام نکرده</div>}
                        </CardBody>
                        {currentGroup != undefined && currentGroup.length > 0 &&
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <RegularButton
                                    color="success"
                                    size="sm"
                                    onClick={InsertSuccess}>ثبت تغییرات</RegularButton>
                            </div>
                        }
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

ListOfUGroups.propTypes = {
    openListGrouptPopUp: PropTypes.bool,
    InsertSuccess: PropTypes.func,
    closePopUpList: PropTypes.func,
    dataGroupToGroup: PropTypes.array
};