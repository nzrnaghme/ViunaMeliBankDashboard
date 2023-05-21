import React, { useEffect, useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PopUpCustome from "components/PopUp/PopUp";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { GeneralContext } from "providers/GeneralContext";
import {
    getAllGroups,
    findGroup,
    filterByStatusGroup,
    filterByDescriptionGroup
} from "api/Core/Group";
import {
    listMemberToRole,
    getAllRoles,
    addMemberToRole,
    removeMemberToRole,
    findRole,
    filterByDescriptionRole,
    filterByStatusRole
} from "api/Core/Role";
import {
    getListUser,
    findUser,
    filterByStatus,
    filterByDescription
} from "api/Core/User";


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

    const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);
    const [rowsPerPageGroup, setRowsPerPageGroup] = useState(10);
    const [currentGroupToGroup, setCurrentGroupToGroup] = useState([]);

    const [currentPage_MainbarCurrentRole, setCurrentPage_MainbarCurrentRole] = useState(0);
    const [rowsPerPageRole, setRowsPerPageRole] = useState(10);
    const [currentRoleToGroup, setCurrentRoleToGroup] = useState([]);

    const [currentPage_MainbarCurrentUser, setCurrentPage_MainbarCurrentUser] = useState(0);
    const [rowsPerPageUser, setRowsPerPageUser] = useState(10);
    const [currentRoleToUser, setCurrentRoleToUser] = useState([]);
    const [allMember, setAllMember] = useState();

    const [which, setWhich] = useState("گروه")

    const {
        openListRolePopUp,
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
            const newData = Object.values(response.data).map((item, index) => ({
                GROUP_NAME: Object.keys(response.data)[index],
                GROUP_STATUS: item.GROUP_STATUS,
                GROUP_ID: item.GROUP_ID,
                GROUP_DESCRIPTION: item.GROUP_DESCRIPTION,
                GROUP_DISPLAYNAME: item.GROUP_DISPLAYNAME,
            }));
            var sortedData = newData.sort((a, b) => b.GROUP_ID - a.GROUP_ID);

        }
        if (currentGroup.length > 0) {

            var select = sortedData.filter((e) => (
                currentGroup.includes(e.GROUP_NAME)
            ))

            var AllGroups = sortedData.filter((e) => (
                !currentGroup.includes(e.GROUP_NAME)
            ))

            select.forEach(element1 => {
                AllGroups.unshift(element1)
            });

            setAllGroups(AllGroups);
        } else setAllGroups(sortedData)
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
            const newData = Object.values(response.data).map((item, index) => ({
                ROLE_NAME: Object.keys(response.data)[index],
                ROLE_STATUS: item.ROLE_STATUS,
                ROLE_ID: item.ROLE_ID,
                ROLE_DESCRIPTION: item.ROLE_DESCRIPTION,
                ROLE_DISPLAYNAME: item.ROLE_DISPLAYNAME,
            }));
            var sortedData = newData.sort((a, b) => b.ROLE_ID - a.ROLE_ID);

        }
        if (currentRole.length > 0) {
            var select = sortedData.filter((e) => (
                currentRole.includes(e.ROLE_NAME && dataRoleTo.ROLE_ID)
            ))

            var AllRoles = sortedData.filter((e) => (
                !currentRole.includes(e.ROLE_NAME)
            ))

            select.forEach(element1 => {
                AllRoles.unshift(element1)
            });

            setAllRoles(AllRoles);
        } else setAllRoles(sortedData)
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
            const newData = Object.values(response.data).map((item) => ({
                USER_USERNAME: item.USER_USERNAME,
                USER_DESCRIPTION: item.USER_DESCRIPTION,
                USER_STATUS: item.USER_STATUS,
                USER_DISPLAYNAME: item.USER_DISPLAYNAME,
                USER_ID: item.USER_ID
            }));
            var sortedData = newData.sort((a, b) => b.USER_ID - a.USER_ID);

        }
        if (currentUser.length > 0) {
            var select = sortedData.filter((e) => (
                currentUser.includes(e.USER_USERNAME)
            ))


            var AllUsers = sortedData.filter((e) => (
                !currentUser.includes(e.USER_USERNAME)
            ))


            select.forEach(element1 => {
                AllUsers.unshift(element1)
            });

            setAllMember(AllUsers);
        } else setAllMember(sortedData);

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

            toast.success("گروه با موفقیت اضافه شد");
            getGroups(dataRoleTo.ROLE_NAME);
            setCurrentPage_MainbarCurrentGroup(0);
            setRowsPerPageGroup(10);
        } else {

            toast.error("گروه قبلا اضافه شده است");
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
            toast.success("گروه با موفقیت از نقش حذف شد");
            trackPromise(getGroups(dataRoleTo.ROLE_NAME))
        } else {
            toast.error("گروه از نقش حذف نشد");
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

            toast.success("نقش با موفقیت اضافه شد");
            trackPromise(getRoles(dataRoleTo.ROLE_NAME));
            setCurrentPage_MainbarCurrentRole(0);
            setRowsPerPageRole(10);
        } else {

            toast.error("نقش قبلا اضافه شده است");
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

            toast.success("نقش با موفقیت از نقش حذف شد");
            trackPromise(getRoles(dataRoleTo.ROLE_NAME))
        } else {

            toast.error("نقش از نقش حذف نشد");
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

            toast.success("کاربر به نقش با موفقیت اضافه شد");
            trackPromise(getMember(dataRoleTo.ROLE_NAME));
            setCurrentPage_MainbarCurrentUser(0);
            setRowsPerPageUser(10);
        } else {
            toast.error("کاربر به نقش قبلا اضافه شده بود");
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

            toast.success("کاربر با موفقیت از نقش حذف شد");
            trackPromise(getMember(dataRoleTo.ROLE_NAME))
        } else {

            toast.error("کاربر از نقش حذف نشد");
        }
    }

    const handleChange = (event, newValue) => {
        setItemTabs(newValue);

        if (newValue === 0) setWhich("گروه")
        else if (newValue === 1) setWhich("نقش")
        else setWhich("کاربر")
    };

    const searchWithNameGroup = async (nameSearch) => {
        let data = {
            GROUP_NAME: nameSearch
        };
        const response = await findGroup(data);
        if (Object.values(response.data).length > 0) {
            setAllGroups(Object.values(response.data));
            setCurrentPage_MainbarCurrentGroup(0);
            setRowsPerPageGroup(10);
        } else {
            toast.warning("گروهی با این اسم وجود ندارد")
        }
    }

    const searchWithDescriptionGroup = async (nameSearch) => {
        let data = {
            GROUP_DESCRIPTION: nameSearch
        };
        const response = await filterByDescriptionGroup(data);
        if (Object.values(response.data).length > 0) {
            setAllGroups(Object.values(response.data));
            setCurrentPage_MainbarCurrentGroup(0);
            setRowsPerPageGroup(10);
        } else {
            toast.warning("گروهی با این مشخصات وجود ندارد")
        }
    }

    const searchWithStatusGroup = async (nameSearch) => {
        let data = {
            GROUP_STATUS: nameSearch.toString()
        };
        const response = await filterByStatusGroup(data);
        if (Object.values(response.data).length > 0) {
            setAllGroups(Object.values(response.data));
            setCurrentPage_MainbarCurrentGroup(0);
            setRowsPerPageGroup(10);
        } else {
            toast.warning("گروهی با این مشخصات وجود ندارد")
        }
    }

    const searchWithNameRole = async (nameSearch) => {
        let data = {
            ROLE_NAME: nameSearch
        };
        const response = await findRole(data);
        if (Object.values(response.data).length > 0) {
            setAllRoles(Object.values(response.data));
            setRowsPerPageRole(10);
            setCurrentPage_MainbarCurrentRole(0);
        } else {
            toast.warning("نقشی با این اسم وجود ندارد")
        }
    }


    const searchWithDescriptionRole = async (nameSearch) => {
        let data = {
            ROLE_DESCRIPTION: nameSearch
        };
        const response = await filterByDescriptionRole(data);
        if (Object.values(response.data).length > 0) {
            setAllRoles(Object.values(response.data));
            setRowsPerPageRole(10);
            setCurrentPage_MainbarCurrentRole(0);
        } else {
            toast.warning("نقشی با این مشخصات وجود ندارد")
        }
    }

    const searchWithStatusRole = async (nameSearch) => {
        let data = {
            ROLE_STATUS: nameSearch.toString()
        };
        const response = await filterByStatusRole(data);
        if (Object.values(response.data).length > 0) {
            setAllRoles(Object.values(response.data));
            setRowsPerPageRole(10);
            setCurrentPage_MainbarCurrentRole(0);
        } else {
            toast.warning("نقشی با این مشخصات وجود ندارد")
        }
    }

    const searchWithNameUser = async (nameSearch) => {
        let data = {
            USER_USERNAME: nameSearch
        };
        const response = await findUser(data);
        if (Object.values(response.data).length > 0) {
            setAllMember(Object.values(response.data))
            setRowsPerPageUser(10)
            setCurrentPage_MainbarCurrentUser(0);
        } else {
            toast.warning("کاربری با این مشخصات وجود ندارد")
        }
    }

    const searchWithStatus = async (nameSearch) => {
        let data = {
            USER_STATUS: nameSearch.toString()
        };
        const response = await filterByStatus(data);
        if (Object.values(response.data).length > 0) {
            setAllMember(Object.values(response.data))
            setRowsPerPageUser(10)
            setCurrentPage_MainbarCurrentUser(0);
        } else {
            toast.warning("کاربری با این مشخصات وجود ندارد")
        }
    }

    const searchWithDescription = async (nameSearch) => {
        let data = {
            USER_DESCRIPTION: nameSearch
        };
        const response = await filterByDescription(data);
        if (Object.values(response.data).length > 0) {
            setAllMember(Object.values(response.data))
            setRowsPerPageUser(10)
            setCurrentPage_MainbarCurrentUser(0);
        } else {
            toast.warning("کاربری با این مشخصات وجود ندارد")
        }
    }

    return (
        <PopUpCustome
            open={openListRolePopUp}
            handleClose={() => { closePopUpList() }}
            className="popUpAllCurrentStudent"
            closeBtn>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>اضافه کردن {which} به نقش {dataRoleTo.ROLE_NAME}</h4>
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
                                    tableHead={[
                                        "اسم گروه",
                                        "عنوان",
                                        "توضیحات گروه",
                                        // "وضعیت گروه",
                                        "عملیات"]}
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

                                    SelectDatas={(nameSearch, key) => {
                                        switch (key) {
                                            case 0:
                                                trackPromise(searchWithNameGroup(nameSearch))
                                                break;
                                            case 2:
                                                trackPromise(searchWithDescriptionGroup(nameSearch))
                                                break;
                                            case 3:
                                                trackPromise(searchWithStatusGroup(nameSearch))
                                                break;
                                            default:
                                                trackPromise(searchWithNameGroup(nameSearch))
                                                break;
                                        }
                                    }}
                                /> :
                                itemTabs === 1 && currentRoleToGroup != undefined &&
                                    allRoles != undefined && allRoles.length > 0 ?
                                    <Table
                                        tableHeaderColor="info"
                                        tableHead={[
                                            "اسم نقش",
                                            "عنوان",
                                            "توضیحات نقش",
                                            // "وضعیت",
                                            "عملیات"]}
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

                                        SelectDatas={(nameSearch, key) => {
                                            switch (key) {
                                                case 0:
                                                    trackPromise(searchWithNameRole(nameSearch))
                                                    break;
                                                case 2:
                                                    trackPromise(searchWithDescriptionRole(nameSearch))
                                                    break;
                                                case 3:
                                                    trackPromise(searchWithStatusRole(nameSearch))
                                                    break;
                                                default:
                                                    trackPromise(searchWithNameRole(nameSearch))
                                                    break;
                                            }
                                        }}
                                    /> :
                                    itemTabs === 2 && currentRoleToUser != undefined &&
                                        allMember != undefined && allMember.length > 0 ?
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={[
                                                "اسم کاربر",
                                                "عنوان",
                                                "توضیحات کاربر",
                                                // "وضعیت",
                                                "عملیات"]}
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

                                            SelectDatas={(nameSearch, key) => {
                                                switch (key) {
                                                    case 0:
                                                        trackPromise(searchWithNameUser(nameSearch))
                                                        break;
                                                    case 2:
                                                        trackPromise(searchWithDescription(nameSearch))
                                                        break;
                                                    case 3:
                                                        trackPromise(searchWithStatus(nameSearch))
                                                        break;
                                                    default:
                                                        trackPromise(searchWithNameUser(nameSearch))
                                                        break;
                                                }

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
                                        }}>اطلاعاتی ثبت نام نکرده</div>}
                        </CardBody>
                      
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