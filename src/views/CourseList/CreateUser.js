import React, { useState, useEffect } from "react";

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
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";

import "./Course.css";
import { trackPromise } from "react-promise-tracker";

// new

export const User_Status = [
  {
    _id: 0,
    fullName: "غیر فعال",
  },
  {
    _id: 1,
    fullName: "فعال",
  },
];

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
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
});

const useStyles = makeStyles(styles);
export default function CreateUser(props) {

  const classes = useStyles();
  const { openCreateUserPopUp, closePopUpCreate } = props;

  // new

  const [name, setName] = useState();
  const [pass, setPass] = useState();
  const [statos, setStatos] = useState();
  const [description, setDescription] = useState();

  const createNewCourse = async () => {
    console.log("Create occure");

    closePopUpCreate();
    // const data = {
    //   title,
    //   cost,
    //   endDate,
    //   startDate,
    //   capacity,
    //   teacher: teacherName,
    //   lesson: lessonName,
    // };
    // let response = await createCourse(data);
    // if (response.data.result) {
    //   setTeacherName("");
    //   setTitle("");
    //   setCapacity("");
    //   setCost("");
    //   setEndDate("");
    //   setStartDate("");
    //   setLessonName("");
    //   CreateSuccess();
    // }
  };

  return (
    <PopUpCustome
      open={openCreateUserPopUp}
      handleClose={() => {
        closePopUpCreate();
      }}
      className="popUpCreateUser"
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className="CardEditUser" style={{ boxShadow: "none" }}>
            <CardHeader color="warning" className="CardTitle">
              <h4 className={classes.cardTitleWhite}>افزودن کاربر</h4>
            </CardHeader>
            <CardBody className="bodyCreateUser">
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="نام کاربری"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="رمز عبور"
                      value={pass}
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomSelectInput
                      labelText="وضعیت کاربر"
                      value={statos}
                      options={User_Status}
                      handleChange={(e) => {
                        setStatos(e.target.value);
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="توضیحات"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </div>
              <div className="btnEditUser">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    bottom: 20,
                    cursor: "pointer",
                    marginTop: 20,
                  }}
                >
                  <RegularButton
                    color="info"
                    size="sm"
                    onClick={() => {
                      trackPromise(createNewCourse());
                    }}
                  >
                    ثبت تغییرات
                  </RegularButton>
                  <RegularButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      closePopUpCreate();
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

CreateUser.propTypes = {
  openCreateUserPopUp: PropTypes.bool,
  CreateSuccess: PropTypes.func,
  closePopUpCreate: PropTypes.func,
  imgLesson: PropTypes.string,
  idLesson: PropTypes.string,
};
