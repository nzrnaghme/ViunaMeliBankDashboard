import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getAllTeachers } from "api/Core/Employe_Manage";
import { updateCourse } from "api/Core/Course";
import { getAllLesson } from "api/Core/Lesson";

import "./Course.css";
import { trackPromise } from "react-promise-tracker";

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
export default function EditCourse(props) {
  var jalaali = require("jalaali-js");
  const classes = useStyles();
  const {
    openEditCoursePopUp,
    EditSuccess,
    closePopUpEdit,
    dataCourse,
  } = props;

  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState();
  const [teacherName, setTeacherName] = useState();
  const [endDate, setEndDate] = useState();
  const [cost, setCost] = useState();
  const [lessonName, setLessonName] = useState("");
  const [capacity, setCapacity] = useState();

  //new

  const [condition, setCondition] = useState(dataCourse.USER_DESCRIPTION);
  const [description, setDescription] = useState(dataCourse.USER_STATU);

  // useEffect(() => {
  //   setTitle(dataCourse.title);
  //   setTeacherName(dataCourse.teacher._id);
  //   setCost(dataCourse.cost);
  //   setCapacity(dataCourse.capacity + dataCourse.students.length);
  //   setLessonName(dataCourse.lesson._id);

  // }, [dataCourse]);


  const updateDataCourse = async () => {
    const data = {
      id: dataCourse._id,
      title,
      cost,
      endDate,
      startDate,
      capacity,
      teacher: teacherName,
      lesson: lessonName,
    };

    let response = await updateCourse(data);
    if (response.data.result) {
      EditSuccess();
    }
  };

  return (
    <PopUpCustome
      open={openEditCoursePopUp}
      handleClose={() => {
        closePopUpEdit();
      }}
      className="popUpEditCourse"
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className="CardEditCourse" style={{ boxShadow: "none" }}>
            <CardHeader color="warning" className="CardTitle">
              <h4 className={classes.cardTitleWhite}>آپدیت کاربر</h4>
            </CardHeader>
            <CardBody className="bodyEditCourse bodyStyleCard">
              {/* <div className="avatarPhotoLesson">
                <Avatar src={photoLesson} className={classes.large} />
              </div> */}
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      disabled
                      rtlActive
                      labelText="نام کاربری"
                      value={dataCourse.USER_USERNAME}
                      // onChange={(e) => {
                      //   setTitle(e);
                      // }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      disabled
                      rtlActive
                      labelText="کد کاربر"
                      value={dataCourse.USER_ID}
                      // handleChange={(e) => {
                      //   setTeacherName(e.target.value);
                      // }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="وضعیت کاربر"
                      value={condition}
                      onChange={(e) => {
                        setCondition(e.target.value);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="توضیخات"
                      value={description}
                      handleChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </div>
              <div className="btnEditCourse">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // position: "absolute",
                    bottom: 20,
                    cursor: "pointer",
                  }}
                >
                  <RegularButton
                    color="info"
                    size="sm"
                    onClick={() => {
                      console.log("updateddddd");
                      // trackPromise(updateDataCourse(dataCourse._id));
                    }}
                  >
                    ثبت تغییرات
                  </RegularButton>
                  <RegularButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      closePopUpEdit();
                    }}
                  >
                    انصراف
                  </RegularButton>
                </div>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </PopUpCustome>
  );
}

EditCourse.propTypes = {
  openEditCoursePopUp: PropTypes.bool,
  EditSuccess: PropTypes.func,
  closePopUpEdit: PropTypes.func,
  dataCourse: PropTypes.object,
};
