import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/views/registerPageStyle.js";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput.js";
// @material-ui/icons
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { loginEmployee } from "api/Core/Login_Register";
import { setItem } from "api/storage/storage";

//captcha pic
import captcha from "./../../assets/img/captcha.png";

const useStyles = makeStyles(styles);
export default function LoginPage() {
  const classes = useStyles();
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const handleToggle = (value) => {
    setCheck(value.target.checked);
  };

  const login = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password: pass,
    };
    let response = await loginEmployee(data);
    if (response.data.message[0].eventId === 200) {
      setItem("id", response.data.result.employeeModel._id);
      setItem("role", response.data.result.employeeModel.role);
      setItem("token", response.data.result.jwtToken);
      if (response.data.result.employeeModel.role === "admin")
        window.location = "/admin/dashboard";
      else window.location = "/teacher/dashboard";
    }
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={login}>
            <Card className={classes.login}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="info"
              >
                <h4 className={classes.cardTitle}>
                  سامانه مدیریت بانک ملی ایران
                </h4>
                {/* <div className={classes.socialLine}>
                  {[
                    "fa fa-facebook-square",
                    "fa fa-twitter",
                    "fa fa-google-plus",
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div> */}
              </CardHeader>
              <CardBody>
                <CustomInput
                  rtlActive
                  labelText="ایمیل"
                  id="name"
                  value={email}
                  onChange={(e) => {
                    setEmail(e);
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    required: true,
                    name: "name",
                    endAdornment: (
                      <InputAdornment position="end">
                        <MailOutlineIcon
                          className={classes.inputAdornmentIcon}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  rtlActive
                  labelText="رمز عبور"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  value={pass}
                  onChange={(e) => {
                    setPass(e);
                  }}
                  inputProps={{
                    required: true,
                    name: "password",
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  rtlActive
                  labelText="کد تصویر پایین"
                  id="name"
                  value={email}
                  onChange={(e) => {
                    setEmail(e);
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    required: true,
                    name: "name",
                    endAdornment: (
                      <InputAdornment position="end">
                        <HowToRegIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <div
                  style={{
                    width: "35%",
                    height: "45px",

                    margin: "auto",
                    marginTop: "25px",
                  }}
                >
                  <img
                    style={{
                      height: "100%",
                      width: "auto",
                      objectPosition: "center",
                    }}
                    src={captcha}
                    alt="captchaPic"
                  />
                </div>
                <FormControlLabel
                  classes={{
                    root:
                      classes.checkboxLabelControl +
                      " " +
                      classes.checkboxLabelControlClassName,
                    label: classes.checkboxLabel,
                  }}
                  control={
                    <Checkbox
                      size="small"
                      style={{ color: "#A5A5A5", marginRight: "-10px" }}
                      onChange={handleToggle}
                      checked={check}
                    />
                  }
                  label={<span>ذخیره رمزعبور؟ </span>}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type="submit" color="success" size="lg" block>
                  ورود
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
