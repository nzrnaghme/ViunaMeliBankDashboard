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
import { getListUser } from "api/Core/Course";


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

export default function ListOfUsers(props) {
    const classes = useStyles();
    const [currentPage_MainbarCurrentUser, setCurrentPage_MainbarCurrentUser] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [currentUsers, setCurrentUsers] = useState()

    const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);

    const {
        openListStudentPopUp,
        RemoveSuccess,
        closePopUpList,
        groupName } = props

    useEffect(() => {
        trackPromise(getMember())
    }, [])

    const getMember = async () => {
        let response1 = await getListUser();

        setCurrentUsers(response1.data);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage_MainbarCurrentUser(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage_MainbarCurrentUser(0);
    };

    return (
        <PopUpCustome
            open={openListStudentPopUp}
            handleClose={() => { closePopUpList() }}
            className="popUpAllCurrentStudent">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning" className="CardTitle">
                            <h4 className={classes.cardTitleWhite}>تمام دانشجویان</h4>
                        </CardHeader>
                        <CardBody className="bodyStyleCard">
                            {currentUsers != undefined && currentUsers.length > 0 ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={[
                                        "ردیف",
                                        "نام کاربری",
                                        "توضیحات",
                                        "وضعیت کاربر",
                                        "کد کاربر",
                                        "عملیات"]}
                                    tableData={currentUsers}
                                    currentPage={currentPage_MainbarCurrentUser}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    rowsCount={rowsPerPage}
                                    addMemberToGroup={(row) => {
                                        onConfirmSetter('آیا برای اضافه کردن کاربر مطمئن هستید؟', () => {
                                            console.log(row);
                                            // trackPromise(removeStudentInCourse(id))
                                        })
                                        setConfirmPopupOpen(true)

                                    }}
                                    groupMember
                                /> :
                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    backgroundColor: "#ec7254",
                                    color: "white",
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>کاربری ثبت نام نکرده</div>}
                        </CardBody>
                        {currentUsers != undefined && currentUsers.length > 0 &&
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <RegularButton
                                    color="success"
                                    size="sm"
                                    onClick={() => { RemoveSuccess() }}>ثبت تغییرات</RegularButton>
                            </div>}
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

ListOfStudents.propTypes = {
    openListStudentPopUp: PropTypes.bool,
    RemoveSuccess: PropTypes.func,
    closePopUpList: PropTypes.func,
    userIdCourse: PropTypes.string
};