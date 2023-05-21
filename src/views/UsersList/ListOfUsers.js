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
    getAllRoles,
    removeMemberToRole,
    addMemberToRole,
    findRole,
    filterByDescriptionRole,
    filterByStatusRole
} from "api/Core/Role";
import { removeUserFromGroup, listRoleOfUser, listGroupOfUser } from "api/Core/User";
import {
    addGroupMember,
    findGroup,
    getAllGroups,
    filterByStatusGroup,
    filterByDescriptionGroup
} from "api/Core/Group";

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

export default function ListOfGroup(props) {
    const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);
    const classes = useStyles();

    const [currentPage_MainbarCurrentGroup, setCurrentPage_MainbarCurrentGroup] = useState(0);
    const [rowsPerPageGroup, setRowsPerPageGroup] = useState(10);
    const [allGroups, setAllGroups] = useState()
    const [currentGroupToUser, setCurrentGroupToUser] = useState()

    const [itemTabs, setItemTabs] = useState(0);

    const [currentPage_MainbarCurrentRole, setCurrentPage_MainbarCurrentRole] = useState(0);
    const [allRoles, setAllRoles] = useState();
    const [rowsPerPageRole, setRowsPerPageRole] = useState(10);
    const [currentRoleToUser, setCurrentRoleToUser] = useState();

    const [which, setWhich] = useState("گروه")

    const {
        openListGrouptPopUp,
        closePopUpList,
        dataUserToGroup } = props

    useEffect(() => {
        trackPromise(getGroups(dataUserToGroup.USER_USERNAME))
        trackPromise(getRoles(dataUserToGroup.USER_USERNAME))
    }, [])

    const getGroups = async (userName) => {
        const data = {
            first: "0",
            max: "1000"
        }
        let response = await getAllGroups(data);
        let data2 = {
            USER_USERNAME: userName
        }
        let responseCurrent = await listGroupOfUser(data2);
        if (responseCurrent.data) {
            var currentGroup = Object.values(responseCurrent.data).map((item) => (
                item.GROUP_NAME
            ))
            setCurrentGroupToUser(currentGroup);
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
                AllGroups.unshift(element1);
            });
            setAllGroups(AllGroups);
        } else {
            setAllGroups(sortedData);
        }

    };

    const getRoles = async (userName) => {

        const data = {
            first: "0",
            max: "1000"
        }
        let data2 = {
            USER_USERNAME: userName
        }
        let response = await getAllRoles(data);

        let responseCurrent = await listRoleOfUser(data2)
        if (responseCurrent.data) {
            var currentRole = Object.values(responseCurrent.data).map((item) => (
                item.ROLE_NAME
            ))
            setCurrentRoleToUser(currentRole);
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
                currentRole.includes(e.ROLE_NAME)
            ))

            var AllRoles = sortedData.filter((e) => (
                !currentRole.includes(e.ROLE_NAME)
            ))

            select.forEach(element1 => {
                AllRoles.unshift(element1)
            });
            setAllRoles(AllRoles)
        } else setAllRoles(sortedData)

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


    const addUserToGroup = async (row) => {

        const groupName = row.GROUP_NAME
        const data = Object.create(
            {
                groupName: {
                    MEMBER_TYPE: "USER",
                    MEMBER: dataUserToGroup.USER_USERNAME,
                },
            },
        );
        data[groupName] = data["groupName"];

        let response = await addGroupMember(data);
        if (response.data === "SUCCESSFUL") {

            toast.success("گروه با موفقیت به کاربر اضافه شد");
            trackPromise(getGroups(dataUserToGroup.USER_USERNAME));
            setRowsPerPageGroup(10)
            setCurrentPage_MainbarCurrentGroup(0);
        } else {

            toast.error("گروه قبلا به کاربر اضافه شده است");
        }
    }


    const addUserToRoles = async (row) => {

        const roleName = row.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "USER",
                    MEMBER: dataUserToGroup.USER_USERNAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await addMemberToRole(data);
        if (response.data === "SUCCESSFUL") {

            toast.success("نقش با موفقیت به کاربر اضافه شد");
            trackPromise(getRoles(dataUserToGroup.USER_USERNAME));
            setRowsPerPageRole(10)
            setCurrentPage_MainbarCurrentRole(0);
        } else {

            toast.error("نقش قبلا به کاربر اضافه شده است");
        }
    }

    const handleChange = (event, newValue) => {
        setItemTabs(newValue);
        if (newValue === 0) setWhich("گروه")
        else setWhich("نقش")
    };

    const removeGroup = async (row) => {

        const groupName = row.GROUP_NAME
        const data = Object.create(
            {
                groupName: {
                    MEMBER_TYPE: "USER",
                    MEMBER: dataUserToGroup.USER_USERNAME,
                },
            },
        );
        data[groupName] = data["groupName"];

        let response = await removeUserFromGroup(data);
        if (response.data === "SUCCESSFUL") {

            toast.success("گروه با موفقیت از کاربر حذف شد");
            trackPromise(getGroups(dataUserToGroup.USER_USERNAME));
        } else {

            toast.error("گروه از کاربر حذف نشد");
        }
    }

    const removeUserToRole = async (row) => {

        const roleName = row.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "USER",
                    MEMBER: dataUserToGroup.USER_USERNAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await removeMemberToRole(data);
        if (response.data === "SUCCESSFUL") {

            toast.success("نقش با موفقیت از کاربر حذف شد");
            trackPromise(getRoles(dataUserToGroup.USER_USERNAME));
        } else {

            toast.error("نقش از کاربر حذف نشد");
        }
    }

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

    return (
        <PopUpCustome
            open={openListGrouptPopUp}
            handleClose={() => { closePopUpList() }}
            className="popUpAllCurrentStudent"
            closeBtn>
            <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ boxShadow: 'none' }}>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>اضافه کردن  کاربر {dataUserToGroup.USER_USERNAME} به {which}</h4>
                        </CardHeader>
                        <CardBody>

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

                            {itemTabs === 0 && currentGroupToUser != undefined && allGroups != undefined && allGroups.length > 0 ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={[
                                        "اسم گروه",
                                        "عنوان",
                                        "توضیحات گروه",
                                        // "وضعیت",
                                        "عملیات"]}
                                    rowsCount={rowsPerPageGroup}
                                    tableData={allGroups}
                                    currentPage={currentPage_MainbarCurrentGroup}
                                    handleChangePage={handleChangePageGroup}
                                    handleChangeRowsPerPage={handleChangeRowsPerPageGroup}
                                    addToUser={(row) => {
                                        onConfirmSetter('آیا برای اضافه کردن کاربر به گروه مطمئن هستید؟', () => {
                                            trackPromise(addUserToGroup(row))
                                        })
                                        setConfirmPopupOpen(true)
                                    }}
                                    currentGroupToUser={currentGroupToUser}
                                    removeGroupToUser={(row) => {
                                        onConfirmSetter('آیا برای حذف کردن کاربر از گروه مطمئن هستید؟', () => {
                                            trackPromise(removeGroup(row))
                                        })
                                        setConfirmPopupOpen(true)
                                    }}
                                    userToGroup

                                    AllDatas={() => {
                                        trackPromise(getGroups(dataUserToGroup.USER_USERNAME))
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
                                itemTabs === 1 && allRoles != undefined && allRoles.length > 0 ?
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
                                        addToUser={(row) => {
                                            onConfirmSetter('آیا برای اضافه کردن کاربر به نقش مطمئن هستید؟', () => {
                                                trackPromise(addUserToRoles(row))
                                            })
                                            setConfirmPopupOpen(true)
                                        }}

                                        userToRole
                                        currentRoleToUser={currentRoleToUser}
                                        removeRoleToUser={(row) => {
                                            onConfirmSetter('آیا برای حذف کردن کاربر از نقش مطمئن هستید؟', () => {
                                                trackPromise(removeUserToRole(row))
                                            })
                                            setConfirmPopupOpen(true)
                                        }}

                                        AllDatas={() => {
                                            trackPromise(getRoles(dataUserToGroup.USER_USERNAME))
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
                                    />
                                    :
                                    <div style={{
                                        textAlign: 'center',
                                        marginTop: 10,
                                        backgroundColor: "#ec7254",
                                        color: "white",
                                        borderRadius: 5,
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}>موردی یافت نشد</div>
                            }

                        </CardBody>
                        {/* {itemTabs === 0 && allGroups != undefined && allGroups.length > 0 &&
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <RegularButton
                                    color="success"
                                    size="sm"
                                    onClick={InsertSuccess}>ثبت تغییرات</RegularButton>
                            </div>
                        } */}

                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

ListOfGroup.propTypes = {
    openListGrouptPopUp: PropTypes.bool,
    InsertSuccess: PropTypes.func,
    closePopUpList: PropTypes.func,
    dataUserToGroup: PropTypes.array
};