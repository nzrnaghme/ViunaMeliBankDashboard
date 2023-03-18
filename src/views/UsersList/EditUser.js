import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { trackPromise } from "react-promise-tracker";

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
// import { User_Status } from "variables/general";

export const User_Status = [
  {
    _id: 0,
    fullName: "غیر فعال"
  },
  {
    _id: 1,
    fullName: "فعال"
  }
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
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
});

const useStyles = makeStyles(styles);
export default function EditCourse(props) {
  const classes = useStyles();
  const {
    openEditUserPopUp,
    // EditSuccess,
    closePopUpEdit,
    dataUser,
  } = props;

  //new

  const [condition, setCondition] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setCondition(dataUser.USER_STATUS);
    setDescription(dataUser.USER_DESCRIPTION)
  }, [dataUser]);


  const updateDataCourse = async () => {
    // const data = {
    //   id: dataUser._id,
    //   title,
    //   cost,
    //   endDate,
    //   startDate,
    //   teacher: teacherName,
    //   lesson: lessonName,
    // };

    // let response = await updateCourse(data);
    // if (response.data.result) {
    //   EditSuccess();
    // }
  };

  return (
    <PopUpCustome
      open={openEditUserPopUp}
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

              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      disabled
                      rtlActive
                      labelText="نام کاربری"
                      value={dataUser.USER_USERNAME}
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
                      value={dataUser.USER_ID}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    {/* <CustomInput
                      rtlActive
                      labelText="وضعیت کاربر"
                      value={condition}
                      onChange={(e) => {
                        setCondition(e.target.value);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    /> */}
                    {User_Status && User_Status.length > 0 &&
                      <CustomSelectInput
                        labelText="وضعیت کاربر"
                        value={condition}
                        options={User_Status}
                        handleChange={(e) => {
                          setCondition(e.target.value)
                        }} />
                    }
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
                    bottom: 20,
                    cursor: "pointer",
                  }}
                >
                  <RegularButton
                    color="info"
                    size="sm"
                    onClick={() => {
                      trackPromise(updateDataCourse());
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
  openEditUserPopUp: PropTypes.bool,
  EditSuccess: PropTypes.func,
  closePopUpEdit: PropTypes.func,
  dataUser: PropTypes.object,
};
