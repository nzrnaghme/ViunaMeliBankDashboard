import React, { useContext, useEffect, useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { updateStudetInform } from "api/Core/Student_Manage";
import { GeneralContext } from "providers/GeneralContext";
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker";
import UploadPhoto from "components/UploadPhoto/UploadPhoto";
import imagePicker from "components/UploadPhoto/imagePicker";

import "./students.css";
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

const useStyles = makeStyles(styles);

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

export default function EditRole(props) {
  var jalaali = require("jalaali-js");
  const classes = useStyles();
  const { openEditRolePopUp, EditSuccess, closePopUpEdit, dataRole } = props;
  const { setOpenToast, onToast } = useContext(GeneralContext);

  const [description, setDescription] = useState();
  const [statos, setStatos] = useState();

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();
  const [nationalId, setNationalCode] = useState();

  const [birth, setBirth] = useState();

  const [filesImg, setFileImg] = useState();
  const fileName = useRef("");
  const upsertImgRef = useRef(null);

  const onUploadingImg = async (e) => {
    const files = e.target.files[0];
    fileName.current = files.name;
    let blob = await imagePicker(files);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
  };

  const onUpsertClicked = () => {
    upsertImgRef.current.click();
  };

  const uploadImgToDatabase = async () => {
    if (!filesImg) {
      trackPromise(updateDataStudent(dataRole._id, photo));
    } else {
      let formData = new FormData();
      formData.append("image", filesImg);
      axios({
        method: "post",
        url: "https://api.noorgon.sepehracademy.ir/api/upload/image",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.data.result)
            trackPromise(updateDataStudent(dataRole._id, response.data.result));
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  const updateDataStudent = async (id, img) => {
    const data = {
      id,
      fullName: name,
      email,
      phoneNumber: phone,
      birthDate: birth,
      nationalId,
      profile: img,
    };
    let response = await updateStudetInform(data);
    if (response.data.result) {
      setOpenToast(true);
      onToast("کاربر آپدیت شد", "success");
      EditSuccess();
    }
  };

  return (
    <PopUpCustome
      open={openEditRolePopUp}
      handleClose={() => {
        closePopUpEdit();
      }}
      className="popUpEditStudent"
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className="CardEditStudent">
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>آپدیت نقش</h4>
            </CardHeader>
            <CardBody className="bodyEditStudent">
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="عنوان"
                      value={dataRole.title}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      disabled
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomSelectInput
                      labelText="وضعیت"
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
                      labelText="توضیحات"
                      value={email}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChange={(e) => {
                        setEmail(e);
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </div>
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
                    closePopUpEdit();
                  }}
                >
                  انصراف
                </RegularButton>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </PopUpCustome>
  );
}
EditRole.propTypes = {
  openEditRolePopUp: PropTypes.bool,
  EditSuccess: PropTypes.func,
  closePopUpEdit: PropTypes.func,
  dataRole: PropTypes.object,
};
