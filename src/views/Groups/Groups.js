import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "components/CustomButtons/Button";
import InsertGroup from "./InsertGroup";
import EditGroup from "./EditGroup";

import { GeneralContext } from "providers/GeneralContext";
import { getAllGroups } from "api/Core/Group";
import { removeGroup } from "api/Core/Group";
import ListOfUGroups from "./ListOfGroups";

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
  const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast,setLosdingShow } = useContext(GeneralContext);

  const [openUpdateGroup, setOpenUpdateGroup] = useState(false)
  const [dataGroup, setDataGroup] = useState()

  const [openGroupToGroup, setOpenGroupToGroup] = useState(false)
  const [dataGroupToGroup, setDataGroupToGroup] = useState()

  useEffect(() => {
    getGroups();
  }, [])

  const getGroups = async (currentPage) => {
    setLosdingShow(true)

    const data = {
      first: (currentPage || currentPage === 0) ? currentPage.toString() : currentPage_MainbarMyGroup.toString(),
      max: "10"
    }
    let response = await getAllGroups(data);

    if (response.data) {
      var newData = Object.values(response.data).map((item, index) => ({
        GROUP_USERNAME: Object.keys(response.data)[index],
        GROUP_STATUS: item.GROUP_STATUS,
        GROUP_ID: item.GROUP_ID,
        GROUP_DESCRIPTION: item.GROUP_DESCRIPTION,
      }));

      setAllGroups(newData);
      setLosdingShow(false)

    }
  }

  const removeSelectGroup = async (row) => {
    setLosdingShow(true)

    const groupName = row.GROUP_USERNAME
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
      setLosdingShow(false)
      setOpenToast(true);
      onToast("گروه با موفقیت حذف شد", "success");
      getGroups();
    }else{
      setLosdingShow(false)
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


  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} >
          <div className="btnAdd">
            <RegularButton color="success"
              onClick={() => {
                setOpenInsertGroup(true)
              }} >افزودن گروه</RegularButton>
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>تمام گروه ها</h4>
            </CardHeader>
            <CardBody>
              {allGroups && Object.keys(allGroups).length > 0 ?
                <Table
                  tableHeaderColor="info"
                  tableHead={[ "اسم گروه", "توضیحات گروه", "وضعیت گروه", "عملیات"]}
                  tableData={allGroups}
                  currentPage={currentPage_MainbarMyGroup}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  editGroup={editGroup}
                  removeGroup={(row) => {
                    onConfirmSetter('آیا برای حذف گروه مطمئن هستید؟', () => {
                      removeSelectGroup(row)
                    })
                    setConfirmPopupOpen(true)
                  }}
                  addGroupToGroup={(row) => {
                    setDataGroupToGroup(row)
                    setOpenGroupToGroup(true);
                  }}
                  group
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
            getGroups();
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
            getGroups()
            setOpenUpdateGroup(false)
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
            getGroups()
            setOpenGroupToGroup(false)
          }}
        />
      }

    </>
  );
}
