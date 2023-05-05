import React, { useEffect, useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { trackPromise } from "react-promise-tracker";

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
import { getAllGroups, findGroup } from "api/Core/Group";
import { listMemberToRole, getAllRoles, addMemberToRole, removeMemberToRole, findRole } from "api/Core/Role";
import { getListUser, findUser } from "api/Core/User";


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

export default function ListOfRole(props) {
    const classes = useStyles();
    const [currentPage_MainbarCurrentGroup, setCurrentPage_MainbarCurrentGroup] = useState(0);

    const [itemTabs, setItemTabs] = useState(0);
    const [allRoles, setAllRoles] = useState();

    const [allGroup, setAllGroups] = useState();

    const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast } = useContext(GeneralContext);
    const [rowsPerPageGroup, setRowsPerPageGroup] = useState(10);
    const [currentGroupToGroup, setCurrentGroupToGroup] = useState([]);

    const [currentPage_MainbarCurrentRole, setCurrentPage_MainbarCurrentRole] = useState(0);
    const [rowsPerPageRole, setRowsPerPageRole] = useState(10);
    const [currentRoleToGroup, setCurrentRoleToGroup] = useState([]);

    const [currentPage_MainbarCurrentUser, setCurrentPage_MainbarCurrentUser] = useState(0);
    const [rowsPerPageUser, setRowsPerPageUser] = useState(10);
    const [currentRoleToUser, setCurrentRoleToUser] = useState([]);
    const [allMember, setAllMember] = useState();

    const {
        openListRolePopUp,
        InsertSuccess,
        closePopUpList,
        dataRoleTo } = props

    useEffect(() => {
        trackPromise(getGroups(dataRoleTo.ROLE_NAME));
        trackPromise(getRoles(dataRoleTo.ROLE_NAME));
        trackPromise(getMember(dataRoleTo.ROLE_NAME));

    }, [])

    const getGroups = async (roleName) => {
        const data = {
            first: "0",
            max: "1000"
        }
        let response = await getAllGroups(data);
        let data2 = {
            ROLE_NAME: roleName,
            MEMBER_TYPE: "ENT_GROUP"
        }
        let responseCurrent = await listMemberToRole(data2)
        if (responseCurrent.data) {
            var currentGroup = Object.values(responseCurrent.data).map((item) => (
                item.GROUP_NAME
            ))
            setCurrentGroupToGroup(currentGroup);
        }
        if (response.data) {
            var newData = Object.values(response.data).map((item, index) => ({
                GROUP_NAME: Object.keys(response.data)[index],
                GROUP_STATUS: item.GROUP_STATUS,
                GROUP_ID: item.GROUP_ID,
                GROUP_DESCRIPTION: item.GROUP_DESCRIPTION,
            }));
        }
        if (currentGroup.length > 0) {

            var select = newData.filter((e) => (
                currentGroup.includes(e.GROUP_NAME)
            ))

            var AllGroups = newData.filter((e) => (
                !currentGroup.includes(e.GROUP_NAME)
            ))

            select.forEach(element1 => {
                AllGroups.unshift(element1)
            });

            setAllGroups(AllGroups);
        } else setAllGroups(newData)
    };

    const getRoles = async (roleName) => {

        const data = {
            first: "0",
            max: "1000"
        }
        let response = await getAllRoles(data);
        let data2 = {
            ROLE_NAME: roleName,
            MEMBER_TYPE: "ENT_ROLE"
        }
        let responseCurrent = await listMemberToRole(data2)
        if (responseCurrent.data) {
            var currentRole = Object.values(responseCurrent.data).map((item) => (
                item.ROLE_NAME
            ))
            setCurrentRoleToGroup(currentRole);
        }
        if (response.data) {
            var newData = Object.values(response.data).map((item, index) => ({
                ROLE_NAME: Object.keys(response.data)[index],
                ROLE_STATUS: item.ROLE_STATUS,
                ROLE_ID: item.ROLE_ID,
                ROLE_DESCRIPTION: item.ROLE_DESCRIPTION,
            }));

        }
        if (currentRole.length > 0) {
            var select = newData.filter((e) => (
                currentRole.includes(e.ROLE_NAME)
            ))

            var AllRoles = newData.filter((e) => (
                !currentRole.includes(e.ROLE_NAME)
            ))

            select.forEach(element1 => {
                AllRoles.unshift(element1)
            });

            setAllRoles(AllRoles);
        } else setAllRoles(newData)
    };

    const getMember = async (roleName) => {

        const data = {
            first: "0",
            max: "1500000"
        }
        let response = await getListUser(data);
        let data2 = {
            ROLE_NAME: roleName,
            MEMBER_TYPE: "ENT_USER"
        }
        let responseCurrent = await listMemberToRole(data2)
        if (responseCurrent.data) {
            var currentUser = Object.values(responseCurrent.data).map((item) => (
                item.USER_USERNAME
            ))
            setCurrentRoleToUser(currentUser);
        }
        if (response.data) {
            var newData = Object.values(response.data).map((item) => ({
                USER_USERNAME: item.USER_USERNAME,
                USER_DESCRIPTION: item.USER_DESCRIPTION,
                USER_STATUS: item.USER_STATUS,
            }));
        }
        if (currentUser.length > 0) {
            var select = newData.filter((e) => (
                currentUser.includes(e.USER_USERNAME)
            ))


            var AllUsers = newData.filter((e) => (
                !currentUser.includes(e.USER_USERNAME)
            ))


            select.forEach(element1 => {
                AllUsers.unshift(element1)
            });

            setAllMember(AllUsers);
        } else setAllMember(newData);

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

    const handleChangeRowsPerPageUser = (event) => {
        setRowsPerPageUser(+event.target.value);
        setCurrentPage_MainbarCurrentUser(0);
    };

    const handleChangePageUser = (event, newPage) => {
        setCurrentPage_MainbarCurrentUser(newPage)
    }

    const addRoleToGroups = async (row) => {

        const roleName = dataRoleTo.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: row.GROUP_NAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await addMemberToRole(data);
        if (response.data === "SUCCESSFUL") {

            setOpenToast(true);
            onToast("گروه با موفقیت اضافه شد", "success");
            getGroups(dataRoleTo.ROLE_NAME);
            setCurrentPage_MainbarCurrentGroup(0);
            setRowsPerPageGroup(10);
        } else {

            setOpenToast(true);
            onToast("گروه قبلا اضافه شده است", "error");
        }
    }

    const removeGroupToRole = async (row) => {

        const roleName = dataRoleTo.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: row.GROUP_NAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await removeMemberToRole(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("گروه با موفقیت از نقش حذف شد", "success");
            trackPromise(getGroups(dataRoleTo.ROLE_NAME))
        } else {
            setOpenToast(true);
            onToast("گروه از نقش حذف نشد", "error");
        }
    }

    const addRoleToRoles = async (row) => {

        const roleName = dataRoleTo.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "ROLE",
                    MEMBER: row.ROLE_NAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await addMemberToRole(data);
        if (response.data === "SUCCESSFUL") {

            setOpenToast(true);
            onToast("نقش با موفقیت اضافه شد", "success");
            trackPromise(getRoles(dataRoleTo.ROLE_NAME));
            setCurrentPage_MainbarCurrentRole(0);
            setRowsPerPageRole(10);
        } else {

            setOpenToast(true);
            onToast("نقش قبلا اضافه شده است", "error");
        }
    }

    const removeRoleToRole = async (row) => {

        const roleName = dataRoleTo.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "ROLE",
                    MEMBER: row.ROLE_NAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await removeMemberToRole(data);
        if (response.data === "SUCCESSFUL") {

            setOpenToast(true);
            onToast("نقش با موفقیت از نقش حذف شد", "success");
            trackPromise(getRoles(dataRoleTo.ROLE_NAME)
            )
        } else {

            setOpenToast(true);
            onToast("نقش از نقش حذف نشد", "error");
        }
    }

    const addRoleToUser = async (row) => {

        const roleName = dataRoleTo.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "USER",
                    MEMBER: row.USER_USERNAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await addMemberToRole(data);
        if (response.data === "SUCCESSFUL") {

            setOpenToast(true);
            onToast("کاربر به نقش با موفقیت اضافه شد", "success");
            trackPromise(getMember(dataRoleTo.ROLE_NAME));
            setCurrentPage_MainbarCurrentUser(0);
            setRowsPerPageUser(10);
        } else {
            setOpenToast(true);
            onToast("کاربر به نقش قبلا اضافه شده بود", "error");
        }
    }


    const removeRoleToUser = async (row) => {

        const roleName = dataRoleTo.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "USER",
                    MEMBER: row.USER_USERNAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await removeMemberToRole(data);
        if (response.data === "SUCCESSFUL") {

            setOpenToast(true);
            onToast("کاربر با موفقیت از نقش حذف شد", "success");
            trackPromise(getMember(dataRoleTo.ROLE_NAME))
        } else {

            setOpenToast(true);
            onToast("کاربر از نقش حذف نشد", "error");
        }
    }

    const handleChange = (event, newValue) => {
        setItemTabs(newValue);
    };

    const searchWithNameUser = async (nameSearch) => {
        if (itemTabs === 0) {
            let data = {
                GROUP_NAME: nameSearch
            };
            const response = await findGroup(data);
            if (Object.values(response.data).length > 0) {
                setAllGroups(Object.values(response.data))
                setRowsPerPageGroup(10)
                setCurrentPage_MainbarCurrentGroup(0);
            } else {
                onToast("گروهی با این اسم وجود ندارد", "warning")
                setOpenToast(true)
            }

        } else if (itemTabs === 1) {
            let data = {
                ROLE_NAME: nameSearch
            };
            const response = await findRole(data);
            if (Object.values(response.data).length > 0) {
                setAllRoles(Object.values(response.data))
                setRowsPerPageRole(10)
                setCurrentPage_MainbarCurrentRole(0);
            } else {
                onToast("نقشی با این اسم وجود ندارد", "warning")
                setOpenToast(true)
            }

        } else {
            let data = {
                USER_USERNAME: nameSearch
            };
            const response = await findUser(data);
            if (Object.values(response.data).length > 0) {
                setAllMember(Object.values(response.data))
                setRowsPerPageUser(10)
                setCurrentPage_MainbarCurrentUser(0);
            } else {
                onToast("کاربری با این اسم وجود ندارد", "warning")
                setOpenToast(true)
            }
        }

    }

    return (
        <PopUpCustome
            open={openListRolePopUp}
            handleClose={() => { closePopUpList() }}
            className="popUpAllCurrentStudent">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>اضافه کردن به نقش {dataRoleTo.ROLE_NAME}</h4>
                        </CardHeader>
                        <CardBody>

                            <Tabs
                                value={itemTabs}
                                indicatorColor="secondary"
                                textColor="secondary"
                                onChange={handleChange}
                                aria-label="disabled tabs example"
                                className="tabsRole"
                            >
                                <Tab label="گروه" />
                                <Tab label="نقش" />
                                <Tab label="کاربر" />

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
                                        onConfirmSetter('آیا برای اضافه کردن گروه به نفش مطمئن هستید؟', () => {
                                            trackPromise(addRoleToGroups(row))
                                        })
                                        setConfirmPopupOpen(true)

                                    }}
                                    currentGroupToUser={currentGroupToGroup}
                                    removeGroupToGroup={(row) => {
                                        onConfirmSetter('آیا برای حذف کردن گروه از نقش مطمئن هستید؟', () => {
                                            trackPromise(removeGroupToRole(row))
                                        })
                                        setConfirmPopupOpen(true)
                                    }}
                                    RoleToGroup
                                    AllDatas={() => {
                                        trackPromise(getGroups(dataRoleTo.ROLE_NAME))
                                    }}

                                    SelectDatas={(nameSearch) => {
                                        trackPromise(searchWithNameUser(nameSearch))
                                    }}
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
                                            onConfirmSetter('آیا برای اضافه کردن نقش به نقش مطمئن هستید؟', () => {
                                                trackPromise(addRoleToRoles(row))
                                            })
                                            setConfirmPopupOpen(true)
                                        }}
                                        RoleToRole
                                        currentRoleToGroup={currentRoleToGroup}
                                        removeRoleToGroup={(row) => {
                                            onConfirmSetter('آیا برای حذف کردن نقش از نقش مطمئن هستید؟', () => {
                                                trackPromise(removeRoleToRole(row))
                                            })
                                            setConfirmPopupOpen(true)
                                        }}

                                        AllDatas={() => {
                                            trackPromise(getRoles(dataRoleTo.ROLE_NAME))
                                        }}

                                        SelectDatas={(nameSearch) => {
                                            trackPromise(searchWithNameUser(nameSearch))
                                        }}
                                    /> :
                                    itemTabs === 2 && currentRoleToUser != undefined &&
                                        allMember != undefined && allMember.length > 0 ?
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["اسم کاربر", "توضیحات کاربر", "وضعیت", "عملیات"]}
                                            tableData={allMember}
                                            rowsCount={rowsPerPageUser}
                                            currentPage={currentPage_MainbarCurrentUser}
                                            handleChangePage={handleChangePageUser}
                                            handleChangeRowsPerPage={handleChangeRowsPerPageUser}
                                            addRoleToGroup={(row) => {
                                                onConfirmSetter('آیا برای اضافه کردن کاربر به نقش مطمئن هستید؟', () => {
                                                    trackPromise(addRoleToUser(row))
                                                })
                                                setConfirmPopupOpen(true)
                                            }}
                                            roleToUser
                                            currentRoleToGroup={currentRoleToUser}
                                            removeRoleToGroup={(row) => {
                                                onConfirmSetter('آیا برای حذف کردن کاربر از نقش مطمئن هستید؟', () => {
                                                    trackPromise(removeRoleToUser(row))
                                                })
                                                setConfirmPopupOpen(true)
                                            }}

                                            AllDatas={() => {
                                                trackPromise(getMember(dataRoleTo.ROLE_NAME));
                                            }}

                                            SelectDatas={(nameSearch) => {
                                                trackPromise(searchWithNameUser(nameSearch))
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

ListOfRole.propTypes = {
    openListRolePopUp: PropTypes.bool,
    InsertSuccess: PropTypes.func,
    closePopUpList: PropTypes.func,
    dataRoleTo: PropTypes.array
};