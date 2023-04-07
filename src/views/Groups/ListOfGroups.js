import React, { useEffect, useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
import { listGroupToGroup } from "api/Core/Group";
import { getAllRoles } from "api/Core/Role";
import { listRoleOfUser } from "api/Core/User";
import { removeGroupToGroup } from "api/Core/Group";
import { addMemberToRole } from "api/Core/Role";
import { removeMemberToRole } from "api/Core/Role";


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

export default function ListOfGroups(props) {
    const classes = useStyles();
    const [currentPage_MainbarCurrentGroup, setCurrentPage_MainbarCurrentGroup] = useState(0);

    const [itemTabs, setItemTabs] = useState(0);
    const [allRoles, setAllRoles] = useState();

    const [allGroup, setAllGroups] = useState()

    const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast } = useContext(GeneralContext);
    const [rowsPerPageGroup, setRowsPerPageGroup] = useState(10);
    const [currentGroupToGroup, setCurrentGroupToGroup] = useState([])

    const [currentPage_MainbarCurrentRole, setCurrentPage_MainbarCurrentRole] = useState(0);
    const [rowsPerPageRole, setRowsPerPageRole] = useState(10);
    const [currentRoleToGroup, setCurrentRoleToGroup] = useState([])

    const {
        openListGrouptPopUp,
        InsertSuccess,
        closePopUpList,
        dataGroupToGroup } = props

    useEffect(() => {
        trackPromise(getGroups(dataGroupToGroup.GROUP_USERNAME))
        trackPromise(getRoles(dataGroupToGroup.GROUP_USERNAME))
    }, [])

    const getGroups = async (groupName) => {
        const data = {
            first: "0",
            max: "1000"
        }
        let data2 = {
            GROUP_NAME: groupName
        }
        let responseCurrent = await listGroupToGroup(data2);
        let response = await getAllGroups(data);

        if (responseCurrent.data) {
            var currentGroup = Object.values(responseCurrent.data).map((item) => (
                item.GROUP_NAME
            ))
            setCurrentGroupToGroup(currentGroup);
        }
        if (response.data) {
            var newData = Object.values(response.data).map((item, index) => ({
                GROUP_USERNAME: Object.keys(response.data)[index],
                GROUP_STATUS: item.GROUP_STATUS,
                GROUP_ID: item.GROUP_ID,
                GROUP_DESCRIPTION: item.GROUP_DESCRIPTION,
            }));
            var responceCurrent = newData.filter((item) => item.GROUP_USERNAME != dataGroupToGroup.GROUP_USERNAME)
            // setAllGroups(responceCurrent);
        }

        var select = responceCurrent.filter((e) => (
            currentGroup.includes(e.GROUP_USERNAME)
        ))

        var AllGroups = responceCurrent.filter((e) => (
            !currentGroup.includes(e.GROUP_USERNAME)
        ))

        select.forEach(element1 => {
            AllGroups.unshift(element1)
        });

        setAllGroups(AllGroups);

    };

    const getRoles = async (groupName) => {
        const data = {
            first: "0",
            max: "1000"
        }
        let response = await getAllRoles(data);

        let data2 = {
            GROUP_NAME: groupName
        }
        let responseCurrent = await listRoleOfUser(data2)
        if (responseCurrent.data) {
            var currentRole = Object.values(responseCurrent.data).map((item) => (
                item.ROLE_NAME
            ))
            setCurrentRoleToGroup(currentRole);
        }

        if (response.data) {
            var newData = Object.values(response.data).map((item, index) => ({
                title: Object.keys(response.data)[index],
                ROLE_STATUS: item.ROLE_STATUS,
                ROLE_ID: item.ROLE_ID,
                ROLE_DESCRIPTION: item.ROLE_DESCRIPTION,
            }));
            // setAllRoles(newData);
        }

        var select = newData.filter((e) => (
            currentRole.includes(e.title)
        ))

        var AllRoles = newData.filter((e) => (
            !currentRole.includes(e.title)
        ))

        select.forEach(element1 => {
            AllRoles.unshift(element1)
        });
        setAllRoles(AllRoles)
    };

    const handleChangeRowsPerPageGroup = (event) => {
        setRowsPerPageGroup(+event.target.value);
        setCurrentPage_MainbarCurrentGroup(0);
    };

    const handleChangePageGroup = (event, newPage) => {
        setCurrentPage_MainbarCurrentGroup(newPage)
    }

    const handleChangeRowsPerPageRole = (event) => {
        setRowsPerPageRole(+event.target.value);
        setCurrentPage_MainbarCurrentRole(0);
    };

    const handleChangePageRole = (event, newPage) => {
        setCurrentPage_MainbarCurrentRole(newPage)
    }

    const addGroupToGroups = async (row) => {
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

    const removeGroup = async (row) => {

        const groupName = row.GROUP_USERNAME
        const data = Object.create(
            {
                groupName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: dataGroupToGroup.GROUP_USERNAME,
                },
            },
        );
        data[groupName] = data["groupName"];

        let response = await removeGroupToGroup(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("گروه با موفقیت از کاربر حذف شد", "success");
            getGroups(dataGroupToGroup.GROUP_USERNAME);
        } else {
            setOpenToast(true);
            onToast("گروه از کاربر حذف نشد", "error");
        }
    }

    const addGroupToRoles = async (row) => {
        const roleName = row.title
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: dataGroupToGroup.GROUP_USERNAME,
                },
            },
        );
        data[roleName] = data["roleName"];
        let response = await addMemberToRole(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("نقش با موفقیت به کاربر اضافه شد", "success");
            getRoles(dataGroupToGroup.GROUP_USERNAME);

        } else {
            setOpenToast(true);
            onToast("نقش قبلا به کاربر اضافه شده است", "error");
        }
    }

    const removeGroupToRole = async (row) => {
        const roleName = row.title
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: dataGroupToGroup.GROUP_USERNAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await removeMemberToRole(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("نقش با موفقیت از کاربر حذف شد", "success");
            getRoles(dataGroupToGroup.GROUP_USERNAME);
        } else {
            setOpenToast(true);
            onToast("نقش از کاربر حذف نشد", "error");
        }
    }

    const handleChange = (event, newValue) => {
        setItemTabs(newValue);
    };

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

                            <Tabs
                                value={itemTabs}
                                indicatorColor="secondary"
                                textColor="secondary"
                                onChange={handleChange}
                                aria-label="disabled tabs example"
                                className="tabsUser"
                            >
                                <Tab label="گروه" />
                                <Tab label="نقش" />
                            </Tabs>

                            {itemTabs === 0 &&
                                currentGroupToGroup != undefined &&
                                allGroup != undefined &&
                                allGroup.length > 0 ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["اسم گروه", "توضیحات گروه", "وضعیت گروه", "عملیات"]}
                                    rowsCount={rowsPerPageGroup}
                                    tableData={allGroup}
                                    currentPage={currentPage_MainbarCurrentGroup}
                                    handleChangePage={handleChangePageGroup}
                                    handleChangeRowsPerPage={handleChangeRowsPerPageGroup}
                                    addToGroup={(row) => {
                                        onConfirmSetter('آیا برای اضافه کردن گروه مطمئن هستید؟', () => {
                                            console.log(row);
                                            trackPromise(addGroupToGroups(row))
                                        })
                                        setConfirmPopupOpen(true)

                                    }}
                                    currentGroupToUser={currentGroupToGroup}
                                    removeGroupToGroup={(row) => {
                                        onConfirmSetter('آیا برای حذف کردن گروه از گروه مطمئن هستید؟', () => {
                                            trackPromise(removeGroup(row))
                                        })
                                        setConfirmPopupOpen(true)
                                    }}
                                    groupToGroup
                                /> :
                                itemTabs === 1 && currentRoleToGroup != undefined &&
                                    allRoles != undefined && allRoles.length > 0 ?
                                    <Table
                                        tableHeaderColor="info"
                                        tableHead={["اسم نقش", "توضیحات نقش", "وضعیت", "عملیات"]}
                                        tableData={allRoles}
                                        rowsCount={rowsPerPageRole}
                                        currentPage={currentPage_MainbarCurrentRole}
                                        handleChangePage={handleChangePageRole}
                                        handleChangeRowsPerPage={handleChangeRowsPerPageRole}
                                        addRoleToGroup={(row) => {
                                            onConfirmSetter('آیا برای اضافه کردن نقش به گروه مطمئن هستید؟', () => {
                                                trackPromise(addGroupToRoles(row))
                                            })
                                            setConfirmPopupOpen(true)
                                        }}
                                        groupToRole
                                        currentRoleToGroup={currentRoleToGroup}
                                        removeRoleToGroup={(row) => {
                                            onConfirmSetter('آیا برای حذف کردن نقش از گروه مطمئن هستید؟', () => {
                                                trackPromise(removeGroupToRole(row))
                                            })
                                            setConfirmPopupOpen(true)
                                        }}
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
                        {allGroup != undefined && allGroup.length > 0 &&
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

ListOfGroups.propTypes = {
    openListGrouptPopUp: PropTypes.bool,
    InsertSuccess: PropTypes.func,
    closePopUpList: PropTypes.func,
    dataGroupToGroup: PropTypes.array
};