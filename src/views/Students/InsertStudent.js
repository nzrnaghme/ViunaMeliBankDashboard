import React, { useContext, useState, useRef } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PopUpCustome from "components/PopUp/PopUp";
import RegularButton from "components/CustomButtons/Button";
import { GeneralContext } from "providers/GeneralContext";
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker";
import imagePicker from "components/UploadPhoto/imagePicker";
import UploadPhoto from "components/UploadPhoto/UploadPhoto";

// @material-ui/icons
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import Call from "@material-ui/icons/Call";
import PersonIcon from "@material-ui/icons/Person";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { registerUser } from "api/Core/Login_Register";
import photoPic from "assets/img/photo.png";
import { trackPromise } from "react-promise-tracker";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";

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

export const Role_Status = [
  {
    _id: 0,
    fullName: "غیر فعال",
  },
  {
    _id: 1,
    fullName: "فعال",
  },
];

const useStyles = makeStyles(styles);
export default function InsertStudent(props) {
  const classes = useStyles();
  const { InsertSuccess, openPopUpInsertStudent, closePopUp } = props;
  const { setOpenToast, onToast } = useContext(GeneralContext);

  const [nameNew, setNameNew] = useState();
  const [phoneNew, setPhoneNew] = useState();
  const [birthNew, setBirthNew] = useState();
  const [emailNew, setEmailNew] = useState();
  const [passNew, setPassNew] = useState();
  const [nationalIdNew, setNationalCodeNew] = useState();

  const [title, setTitle] = useState();
  const [statos, setStatos] = useState();
  const [description, setDescription] = useState();

  const insertStudent = async (img) => {
    const data = {
      fullName: nameNew,
      email: emailNew,
      phoneNumber: phoneNew,
      birthDate: birthNew,
      nationalId: nationalIdNew,
      profile: img,
      password: passNew,
    };
    let response = await registerUser(data);
    if (response.data.result) {
      setNameNew("");
      setEmailNew("");
      setPassNew("");
      setPhoneNew("");
      setNationalCodeNew("");
      setBirthNew("");
      setOpenToast(true);
      onToast("نقش اضافه شد", "success");
      InsertSuccess();
    }
  };

  return (
    <PopUpCustome
      open={openPopUpInsertStudent}
      handleClose={() => {
        closePopUp();
      }}
      className="popUpCreateStudent"
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className="CardEditStudent">
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>افزودن نقش</h4>
            </CardHeader>
            <CardBody className="bodyCreateStudent">
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="عنوان"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonIcon
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomSelectInput
                      labelText="وضعیت کاربر"
                      value={statos}
                      options={Role_Status}
                      handleChange={(e) => {
                        setStatos(e.target.value);
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      rtlActive
                      labelText="توضیخات"
                      value={description}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      inputProps={{
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <MailOutlineIcon
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </div>
              <div className="photoEditStudent">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    bottom: 20,
                    cursor: "pointer",
                    justifyContent: "center",
                  }}
                >
                  <RegularButton
                    color="info"
                    size="sm"
                    onClick={() => {
                      trackPromise(uploadImgToDatabase());
                    }}
                  >
                    ثبت تغییرات
                  </RegularButton>
                  <RegularButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      closePopUp();
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

InsertStudent.propTypes = {
  closePopUp: PropTypes.func,
  openPopUpInsertStudent: PropTypes.bool,
  InsertSuccess: PropTypes.func,
};
