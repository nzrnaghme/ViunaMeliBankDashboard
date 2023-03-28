import React, { useContext, useState } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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

// @material-ui/icons
import PersonIcon from "@material-ui/icons/Person";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { trackPromise } from "react-promise-tracker";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
import { addRole } from "api/Core/Role";

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
export default function InsertRole(props) {
  const classes = useStyles();
  const { InsertSuccess, openPopUpInsertRole, closePopUp } = props;
  const { setOpenToast, onToast } = useContext(GeneralContext);

  const [title, setTitle] = useState();
  const [status, setStatus] = useState(0);
  const [description, setDescription] = useState();

  const insertRole = async () => {
    if (title && description) {
      const roleName = title
      const data = Object.create(
        {
          roleName: {
            ROLE_STATUS: status.toString(),
            ROLE_DESCRIPTION: description,
          },
        },
      );
      data[roleName] = data["roleName"];

      let response = await addRole(data);
      if (response.data === "SUCCESSFUL")
        InsertSuccess();
      else {
        setOpenToast(true)
        onToast("گروه اضافه نشد", "error")
        closePopUp()
      }
    } else {
      setOpenToast(true)
      onToast("گروه اضافه نشد", "error")
      closePopUp()
    }
  }

  return (
    <PopUpCustome
      open={openPopUpInsertRole}
      handleClose={() => {
        closePopUp();
      }}
      className="popUpCreateStudent"
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className="CardEditStudent" style={{ boxShadow: "none" }}>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>افزودن نقش</h4>
            </CardHeader>
            <CardBody className="bodyCreateStudent">
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="اسم نقش"
                      value={title}
                      onChange={(e) => {
                        setTitle(e);
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
                      labelText="وضعیت نقش"
                      value={status}
                      options={Role_Status}
                      handleChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    />
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
                      trackPromise(insertRole());
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

InsertRole.propTypes = {
  closePopUp: PropTypes.func,
  openPopUpInsertRole: PropTypes.bool,
  InsertSuccess: PropTypes.func,
};
