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

import { activeEmployeeManage } from "api/Core/Employe_Manage";
import { deActiveEmployeetManage } from "api/Core/Employe_Manage";
import { GeneralContext } from "providers/GeneralContext";
import { removeEmployee } from "api/Core/Employe_Manage";
import { getAllGroups } from "api/Core/Group";
import { trackPromise } from "react-promise-tracker";

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
  const [allTeachers, setAllTeachers] = useState([]);
  const [allTeachersV, setAllTeachersV] = useState([]);
  const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openInsertGroup, setOpenInsertGroup] = useState(false)
  const { setConfirmPopupOpen, onConfirmSetter, setOpenToast, onToast } = useContext(GeneralContext);

  const [openUpdateGroup, setOpenUpdateGroup] = useState(false)
  const [dataGroup, setDataGroup] = useState()

  useEffect(() => {
    trackPromise(getGroups());
  }, [])



  const getGroups = async () => {

    let response1 = await getAllGroups();

    if (response1.data) {
      var newData = Object.values(response1.data).map((item, index) => ({
        GROUP_USERNAME: Object.keys(response1.data)[index],
        GROUP_STATUS: item.GROUP_STATUS,
        GROUP_ID: item.GROUP_ID,
        GROUP_DESCRIPTION: item.GROUP_DESCRIPTION,
      }));

      setAllTeachersV(newData);
    }
  }

  const removeTeacher = async (id) => {
    let response = await removeEmployee(id)
    if (response.data.result) {
      let newTeacher = allTeachers.filter((item) => item.id != id)
      setOpenToast(true)
      onToast("استاد با موفقیت حذف شد", "success")
      setAllTeachers(newTeacher);
    }
  }

  const editGroup = (row) => {
    setDataGroup(row);
    setOpenUpdateGroup(true);
  }

  const changeActivate = (id, active) => {
    if (active) {
      deActiveEmployee(id)
    } else activeEmployee(id)
  }

  const activeEmployee = async (id) => {
    let response = await activeEmployeeManage(id)
    if (response.data.result) {
      setOpenToast(true)
      onToast("استاد فعال شد", "success")
      getGroups()
    }

  }

  const deActiveEmployee = async (id) => {
    let response = await deActiveEmployeetManage(id)
    if (response.data.result) {
      setOpenToast(true)
      onToast("استاد غیرفعال شد", "success")
      getGroups()
    }
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage_MainbarMyCourses(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage_MainbarMyCourses(0);
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
              {allTeachersV && Object.keys(allTeachersV).length > 0 ?
                <Table
                  tableHeaderColor="info"
                  tableHead={["ردیف", "اسم گروه", "توضیحات گروه", "وضعیت گروه", "کد گروه", "عملیات"]}
                  tableData={allTeachersV}
                  currentPage={currentPage_MainbarMyCourses}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsCount={rowsPerPage}
                  editGroup={editGroup}
                  changeActivate={changeActivate}
                  removeTeacher={(id) => {
                    onConfirmSetter('آیا برای حذف گروه مطمئن هستید؟', () => {
                      trackPromise(removeTeacher(id))
                    })
                    setConfirmPopupOpen(true)
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
            setOpenToast(true)
            onToast("گروه اضافه شد", "success")
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
            setOpenToast(true)
            onToast("گروه بروزرسانی شد", "success")
            getGroups()
            setOpenUpdateGroup(false)
          }} />
      }

    </>
  );
}
