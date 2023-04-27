import React, { useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";

import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

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

import { setItem } from "api/storage/storage";
import { GeneralContext } from "providers/GeneralContext";

//captcha pic
import captchaPic from "./../../assets/img/captcha.png";
import { loginUser } from "api/Core/Login";

const useStyles = makeStyles(styles);

export default function LoginPage() {

  const classes = useStyles();
  const [check, setCheck] = useState(false);
  const [userName, setUserName] = useState();
  const [pass, setPass] = useState();
  const [captcha, setCaptcha] = useState();

  const [showPass, setShowPass] = useState(false);


  const {
    setOpenToast,
    onToast } = useContext(GeneralContext);

  const handleToggle = (value) => {
    setCheck(value.target.checked);
  };

  const login = async (e) => {
    e.preventDefault();
    const userN = userName;
    const data = Object.create(
      {
        userN: {
          PASSWORD: pass,
          USER_DESCRIPTION: "loginUser",
        },
      },
    );
    data[userN] = data["userN"];
    let response = await loginUser(data);
    console.log(response);
    if (response.status != "200") {
      setOpenToast(true);
      onToast("کاربر وجود ندارد", "error")
    } else {
      switch (response.data) {
        case 0:
          setOpenToast(true);
          onToast("ورود موفقیت آمیز نبود", "error")
          break;
        case 1:
          window.location = "/dashboard";
          setItem("user", userName);

          break;
        case 2:
          setOpenToast(true);
          onToast("کاربر قفل شده", "error")

          break;
        case 3:
          setOpenToast(true);
          onToast("کاربر فعال نیست", "error")

          break;
        case 4:
          setOpenToast(true);
          onToast("کاربر تعریف نشده", "error")
          break;

        default:
          window.location = "/dashboard";
          break;
      }
    }


  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={(e) => {
            trackPromise(login(e));
          }}>
            <Card className={classes.login}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="info"
              >
                <h4 className={classes.cardTitle}>
                  سامانه مدیریت بانک ملی ایران
                </h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  rtlActive
                  labelText="نام کاربری"
                  id="name"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e);
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    required: true,
                    name: "name",
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
                  type={showPass ? 'text' : 'password'}
                  inputProps={{
                    required: true,
                    name: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton

                          onClick={() => {
                            setShowPass(!showPass)
                          }}

                        >
                          {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  rtlActive
                  labelText="کد تصویر پایین"
                  id="name"
                  value={captcha}
                  onChange={(e) => {
                    setCaptcha(e);
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    required: true,
                    name: "name",
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
                    src={captchaPic}
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
