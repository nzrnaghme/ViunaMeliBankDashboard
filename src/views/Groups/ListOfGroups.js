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
import { getAllGroups, addGroupToGroup, listGroupToGroup, removeGroupToGroup, listRoleOfGroup, findGroup } from "api/Core/Group";
import { getAllRoles, removeMemberToRole, addMemberToRole, findRole } from "api/Core/Role";


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
    const [currentRoleToGroup, setCurrentRoleToGroup] = useState([]);

    const {
        openListGrouptPopUp,
        InsertSuccess,
        closePopUpList,
        dataGroupToGroup } = props

    useEffect(() => {
        trackPromise(getGroups(dataGroupToGroup.GROUP_NAME))
        trackPromise(getRoles(dataGroupToGroup.GROUP_NAME))
    }, [])

    const getGroups = async (groupName) => {

        const data = {
            first: "0",
            max: "10000"
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
                GROUP_NAME: Object.keys(response.data)[index],
                GROUP_STATUS: item.GROUP_STATUS,
                GROUP_ID: item.GROUP_ID,
                GROUP_DESCRIPTION: item.GROUP_DESCRIPTION,
            }));
            var responceCurrent = newData.filter((item) => item.GROUP_NAME != dataGroupToGroup.GROUP_NAME)

        }
        if (currentGroup.length > 0) {
            var select = responceCurrent.filter((e) => (
                currentGroup.includes(e.GROUP_NAME)
            ))

            var AllGroups = responceCurrent.filter((e) => (
                !currentGroup.includes(e.GROUP_NAME)
            ))

            select.forEach(element1 => {
                AllGroups.unshift(element1)
            });

            setAllGroups(AllGroups);
        } else setAllGroups(responceCurrent)

    };

    const getRoles = async (groupName) => {

        const data = {
            first: "0",
            max: "10000"
        }
        let response = await getAllRoles(data);

        let data2 = {
            GROUP_NAME: groupName
        }
        let responseCurrent = await listRoleOfGroup(data2)
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
            setAllRoles(AllRoles)
        } else setAllRoles(newData)

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

        const groupName = dataGroupToGroup.GROUP_NAME
        const data = Object.create(
            {
                groupName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: row.GROUP_NAME,
                },
            },
        );
        data[groupName] = data["groupName"];

        let response = await addGroupToGroup(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("گروه با موفقیت اضافه شد", "success");
            trackPromise(getGroups(dataGroupToGroup.GROUP_NAME));
            setRowsPerPageGroup(10);
            setCurrentPage_MainbarCurrentGroup(0);
        } else {
            setOpenToast(true);
            onToast("گروه قبلا اضافه شده است", "error");
        }
    }

    const removeGroup = async (row) => {

        const groupName = dataGroupToGroup.GROUP_NAME
        const data = Object.create(
            {
                groupName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: row.GROUP_NAME,
                },
            },
        );
        data[groupName] = data["groupName"];

        let response = await removeGroupToGroup(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("گروه با موفقیت از کاربر حذف شد", "success");
            trackPromise(getGroups(dataGroupToGroup.GROUP_NAME));
        } else {
            setOpenToast(true);
            onToast("گروه از کاربر حذف نشد", "error");
        }
    }

    const addGroupToRoles = async (row) => {
        const roleName = row.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: dataGroupToGroup.GROUP_NAME,
                },
            },
        );
        data[roleName] = data["roleName"];
        let response = await addMemberToRole(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("گروه با موفقیت به نقش اضافه شد", "success");
            trackPromise(getRoles(dataGroupToGroup.GROUP_NAME));
            setRowsPerPageRole(10);
            setCurrentPage_MainbarCurrentRole(0);

        } else {
            setOpenToast(true);
            onToast("گروه قبلا به نقش اضافه شده است", "error");
        }
    }

    const removeGroupToRole = async (row) => {
        const roleName = row.ROLE_NAME
        const data = Object.create(
            {
                roleName: {
                    MEMBER_TYPE: "GROUP",
                    MEMBER: dataGroupToGroup.GROUP_NAME,
                },
            },
        );
        data[roleName] = data["roleName"];

        let response = await removeMemberToRole(data);
        if (response.data === "SUCCESSFUL") {
            setOpenToast(true);
            onToast("نقش با موفقیت از گروه حذف شد", "success");
            trackPromise(getRoles(dataGroupToGroup.GROUP_NAME));
        } else {
            setOpenToast(true);
            onToast("نقش از گروه حذف نشد", "error");
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

        } else {
            let data = {
                ROLE_NAME: nameSearch
            };
            const response = await findRole(data);
            if (Object.values(response.data).length > 0) {
                setAllRoles(Object.values(response.data))
                setRowsPerPageRole(10)
                setCurrentPage_MainbarCurrentRole(0);
            } else {
                onToast("گروهی با این اسم وجود ندارد", "warning")
                setOpenToast(true)
            }
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
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>اضافه کردن به گروه {dataGroupToGroup.GROUP_NAME}</h4>
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
                                    AllDatas={() => {
                                        trackPromise(getGroups(dataGroupToGroup.GROUP_NAME))
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

                                        AllDatas={() => {
                                            trackPromise(getRoles(dataGroupToGroup.GROUP_NAME))
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
        </PopUpCustome >
    )
}

ListOfGroups.propTypes = {
    openListGrouptPopUp: PropTypes.bool,
    InsertSuccess: PropTypes.func,
    closePopUpList: PropTypes.func,
    dataGroupToGroup: PropTypes.array
};