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
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import InsertGroup from "./InsertGroup";
import EditGroup from "./EditGroup";

import { GeneralContext } from "providers/GeneralContext";
import { getAllGroups, removeGroup, findGroup } from "api/Core/Group";
import ListOfUGroups from "./ListOfGroups";
import { filterByStatusGroup } from "api/Core/Group";
import { filterByDescriptionGroup } from "api/Core/Group";

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

export default function Groups() {
  const classes = useStyles();
  const [allGroups, setAllGroups] = useState([]);
  const [currentPage_MainbarMyGroup, setCurrentPage_MainbarMyGroup] = useState(0);

  const [openInsertGroup, setOpenInsertGroup] = useState(false)
  const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast } = useContext(GeneralContext);

  const [openUpdateGroup, setOpenUpdateGroup] = useState(false)
  const [dataGroup, setDataGroup] = useState()

  const [openGroupToGroup, setOpenGroupToGroup] = useState(false)
  const [dataGroupToGroup, setDataGroupToGroup] = useState()

  useEffect(() => {
    trackPromise(getGroups());
  }, [])

  const getGroups = async (currentPage) => {

    const data = {
      first: (currentPage || currentPage === 0) ? currentPage.toString() : currentPage_MainbarMyGroup.toString(),
      max: "10"
    }
    let response = await getAllGroups(data);

    if (Object.values(response.data).length > 0) {
      var newData = Object.values(response.data).map((item, index) => ({
        GROUP_NAME: Object.keys(response.data)[index],
        GROUP_STATUS: item.GROUP_STATUS,
        GROUP_ID: item.GROUP_ID,
        GROUP_DESCRIPTION: item.GROUP_DESCRIPTION,
        GROUP_DISPLAYNAME: item.GROUP_DISPLAYNAME,
      }));
      setAllGroups(newData);
    } else {
      setCurrentPage_MainbarMyGroup(currentPage_MainbarMyGroup - 10);
      onToast("گروهی دیگر وجود ندارد", "warning")
      setOpenToast(true)
    }

  }

  const removeSelectGroup = async (row) => {
    const groupName = row.GROUP_NAME
    const data = Object.create(
      {
        groupName: {
          GROUP_STATUS: row.GROUP_STATUS.toString(),
          GROUP_DESCRIPTION: row.GROUP_DESCRIPTION,
        },
      },
    );
    data[groupName] = data["groupName"];

    let response = await removeGroup(data);
    if (response.data === "SUCCESSFUL") {
      setOpenToast(true);
      onToast("گروه با موفقیت حذف شد", "success");
      getGroups();
    } else {
      setOpenToast(true);
      onToast("گروه حذف نشد", "success");
      getGroups();
    }
  }

  const editGroup = (row) => {
    setDataGroup(row);
    setOpenUpdateGroup(true);
  }


  const handleChangePage = (currentPage) => {
    setCurrentPage_MainbarMyGroup(currentPage + 10);
    getGroups(currentPage + 10)
  };

  const handleChangeRowsPerPage = (currentPage) => {
    let currPage = currentPage - 10;
    setCurrentPage_MainbarMyGroup(currPage);
    getGroups(currPage)
  };


  const searchWithNameGroup = async (nameSearch) => {
    let data = {
      GROUP_NAME: nameSearch
    };
    const response = await findGroup(data);
    if (Object.values(response.data).length > 0) {
      setAllGroups(Object.values(response.data))
    } else {
      onToast("گروهی با این مشخصات وجود ندارد", "warning")
      setOpenToast(true)
    }
  }

  const searchWithStatusGroup = async (nameSearch) => {
    let data = {
      GROUP_STATUS: nameSearch.toString()
    };
    const response = await filterByStatusGroup(data);
    if (Object.values(response.data).length > 0) {
      setAllGroups(Object.values(response.data))
    } else {
      onToast("گروهی با این مشخصات وجود ندارد", "warning")
      setOpenToast(true)
    }
  }

  const searchWithDescriptionGroup = async (nameSearch) => {
    let data = {
      GROUP_DESCRIPTION: nameSearch
    };
    const response = await filterByDescriptionGroup(data);
    if (Object.values(response.data).length > 0) {
      setAllGroups(Object.values(response.data))
    } else {
      onToast("گروهی با این مشخصات وجود ندارد", "warning")
      setOpenToast(true)
    }
  }


  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} >
          <div className="btnAdd2">
            <Tooltip
              id="tooltip-top-start"
              title="افزودن گروه"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
              color={"#00adef"}
            >
              <IconButton
                aria-label="Key"
                className={classes.tableActionButton}
                onClick={() => {
                  setOpenInsertGroup(true)
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
              {allGroups && Object.keys(allGroups).length > 0 ?
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "اسم گروه",
                    "عنوان",
                    "توضیحات",
                    "وضعیت گروه",
                    "عملیات"]}
                  tableData={allGroups}
                  currentPage={currentPage_MainbarMyGroup}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  editGroup={editGroup}
                  removeGroup={(row) => {
                    onConfirmSetter('آیا برای حذف گروه مطمئن هستید؟', () => {
                      trackPromise(removeSelectGroup(row));
                    })
                    setConfirmPopupOpen(true);
                  }}
                  addGroupToGroup={(row) => {
                    setDataGroupToGroup(row);
                    setOpenGroupToGroup(true);
                  }}
                  group

                  AllDatas={() => {
                    trackPromise(getGroups())
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
                <div style={{
                  textAlign: 'center',
                  marginTop: 10,
                  backgroundColor: "#ec7254",
                  color: "white",
                  borderRadius: 5,
                  paddingTop: 10,
                  paddingBottom: 10
                }}> گروهی ثبت نشده</div>}
            </CardBody>
            <div>

            </div>
          </Card>
        </GridItem>
      </GridContainer>
      {openInsertGroup &&
        <InsertGroup
          openPopUpInsertGroup={openInsertGroup}
          closePopUp={() => { setOpenInsertGroup(false) }}
          InsertSuccess={() => {
            setOpenToast(true);
            onToast("گروه اضافه شد", "success");
            trackPromise(getGroups());
            setOpenInsertGroup(false);
          }} />
      }
      {openUpdateGroup && dataGroup &&
        <EditGroup
          openEditTeacherPopUp={openUpdateGroup}
          dataGroup={dataGroup}
          closePopUpEdit={() => { setOpenUpdateGroup(false) }}
          EditSuccess={() => {
            setOpenToast(true);
            onToast("گروه بروزرسانی شد", "success");
            trackPromise(getGroups());
            setOpenUpdateGroup(false);
          }} />
      }
      {openGroupToGroup && dataGroupToGroup &&
        <ListOfUGroups
          openListGrouptPopUp={openGroupToGroup}
          closePopUpList={() => { setOpenGroupToGroup(false) }}
          dataGroupToGroup={dataGroupToGroup}
          InsertSuccess={() => {
            setOpenToast(true);
            onToast("گروه بروزرسانی شد", "success");
            trackPromise(getGroups());
            setOpenGroupToGroup(false);
          }}
        />
      }

    </>
  );
}
