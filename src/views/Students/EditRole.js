import React, { useContext, useState, useEffect } from "react";

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
import { GeneralContext } from "providers/GeneralContext";

import "./students.css";
import { trackPromise } from "react-promise-tracker";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
import { editRole } from "api/Core/Role";

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
  const classes = useStyles();
  const {
    openEditRolePopUp,
    EditSuccess,
    closePopUpEdit,
    dataRole } = props;
  const { setOpenToast, onToast } = useContext(GeneralContext);

  const [description, setDescription] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    setStatus(dataRole.ROLE_STATUS);
    setDescription(dataRole.ROLE_DESCRIPTION);
  }, [dataRole])


  const updateRole = async () => {
    const roleName = dataRole.title
    const data = Object.create(
      {
        roleName: {
          ROLE_STATUS: status.toString(),
          ROLE_DESCRIPTION: description,
        },
      },
    );
    data[roleName] = data["roleName"];
    let response = await editRole(data);
    if (response.data === "SUCCESSFUL")
      EditSuccess();

    else {
      setOpenToast(true)
      onToast("نفش بروزرسانی نشد", "error")
      closePopUpEdit();
    }

  }

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
              <h4 className={classes.cardTitleWhite}>بروزرسانی نقش</h4>
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
                    {Role_Status && Role_Status.length > 0 &&
                      <CustomSelectInput
                        labelText="وضعیت"
                        value={status}
                        options={Role_Status}
                        handleChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      rtlActive
                      labelText="توضیحات"
                      value={description}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChange={(e) => {
                        setDescription(e);
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
                    trackPromise(updateRole());
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
