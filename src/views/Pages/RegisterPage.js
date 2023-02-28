import React, { useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import styles from "assets/jss/material-dashboard-react/views/loginPageStyle.js";
import photo from "assets/img/photo.png";
//custome component
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter";
// @material-ui/icons
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import Call from "@material-ui/icons/Call";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker";
import { GeneralContext } from "providers/GeneralContext";

import { registerEmployee } from "api/Core/Login_Register";

const useStyles = makeStyles(styles);
export default function RegisterPage() {
  const { setOpenToast, onToast } = useContext(GeneralContext);
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [birth, setBirth] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [value, setValue] = useState("teacher");
  const [date, setDate] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    const dataUser = {
      fullName: name,
      email: email,
      password: pass,
      phoneNumber: phone,
      birthDate: birth,
      nationalId: nationalCode,
      profile: photo,
      role: value,
      address: address,
    };
    let response = await registerEmployee(dataUser);
    if (response.data.result) {
      onToast("کاربر اضافه شد", "success");
      setOpenToast(true);
      history.push("/auth/login-page");
    }
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={register}>
            <Card className={classes.login}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="info"
              >
                <h4 className={classes.cardTitle}> ثبت نام کارمندان</h4>
                <div className={classes.socialLine}>
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
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  rtlActive
                  labelText="نام کامل"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  value={name}
                  onChange={(e) => {
                    setName(e);
                  }}
                  inputProps={{
                    required: true,
                    name: "name",
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  rtlActive
                  labelText="شماره موبایل"
                  id="phoneNumber"
                  value={phone}
                  onChange={(e) => {
                    if (/^[0-9]+$/i.test(e)) {
                      setPhone(e);
                    } else setPhone("");
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    inputMode: "tel",
                    required: true,
                    name: "phoneNumber",
                    maxLength: 11,
                    minLength: 11,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Call className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomeDatePicker
                  label="تاریخ تولد"
                  maxDate={new Date()}
                  onChange={(e) => {
                    setDate(e);
                    setBirth(`${e.year}/${e.month.number}/${e.day}`);
                  }}
                  value={date}
                  className="Birth"
                />
                <CustomInput
                  rtlActive
                  labelText="کد ملی"
                  id="nationalCode"
                  value={nationalCode}
                  onChange={(e) => {
                    if (/^[0-9]+$/i.test(e)) {
                      setNationalCode(e);
                    } else setNationalCode("");
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    maxLength: 10,
                    minLength: 10,
                    required: true,
                    name: "nationalCode",
                    endAdornment: (
                      <InputAdornment position="end">
                        <RecentActorsIcon
                          className={classes.inputAdornmentIcon}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  rtlActive
                  labelText="آدرس"
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e);
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    required: true,
                    name: "address",
                    endAdornment: (
                      <InputAdornment position="end">
                        <HomeIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  rtlActive
                  labelText="ایمیل"
                  id="emai"
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
                    name: "emai",
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
                  value={pass}
                  onChange={(e) => {
                    setPass(e);
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  // error={errors}
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
                <FormControl
                  component="fieldset"
                  style={{ width: "80%", marginTop: "20px" }}
                >
                  <FormLabel
                    component="legend"
                    style={{ color: "gray", marginBottom: "-5px" }}
                  >
                    نقش
                  </FormLabel>
                  <RadioGroup
                    aria-label="teacher"
                    name="teacher1"
                    value={value}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      value="teacher"
                      control={<Radio color="info" />}
                      label="استاد"
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio color="info" />}
                      label="ادمین"
                    />
                  </RadioGroup>
                </FormControl>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type="submit" color="info" simple size="lg" block>
                  ثبت نام
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
