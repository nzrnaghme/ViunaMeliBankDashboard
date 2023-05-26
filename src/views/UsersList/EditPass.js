import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";

import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import "./User.css";
import { changePassword } from "api/Core/User";


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
        fontFamily: "'IRANSANSX'",
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
        EditSuccess,
        closePopUpEdit,
        dataUser,
    } = props;

    const [newPass, setNewPass] = useState();
    const [oldPass, setOldPass] = useState();
    const [newAgainPass, setNewAgainPass] = useState();

    const [errorPass, setErrorPass] = useState(false);
    const [errorOldPass, setErrorOldPass] = useState(false);
    const [errorAgainPass, setErrorAgainPass] = useState(false);

    const [errorPassTxt, setErrorPassTxt] = useState('');
    const [errorOldPassTxt, setErrorOldPassTxt] = useState('');
    const [errorAgainPassTxt, setErrorAgainPassTxt] = useState('');

    const [textLeftNew, setTextLeftNew] = useState(false);
    const [textLeftOld, setTextLeftOld] = useState(false);
    const [textLeft, setTextLeft] = useState(false);

    const [showPass, setShowPass] = useState(false);
    const [showPassNew, setShowPassNew] = useState(false);
    const [showPassAgainNew, setShowPassAgainNew] = useState(false);


    function validatePassword(password) {
        const regex = /^(?=.*[0-7])(?=.*[!@#$%^&*])[a-zA-Z0-7!@#$%^&*]{8,}$/;
        return regex.test(password);
    }

    const updatePass = async () => {
        if (newPass && newPass.length > 7 && validatePassword(newPass) && newPass === newAgainPass && oldPass) {
            const userName = dataUser.USER_USERNAME;
            const data = Object.create(
                {
                    userName: {
                        USER_PASSWORD: newPass,
                        OLD_USER_PASSWORD: oldPass
                    },
                },
            );
            data[userName] = data["userName"];
            let response = await changePassword(data);
            if (response.data === "SUCCESSFUL") {

                EditSuccess();
            } else {

                toast.error("!رمز عبور اشتباه است");
                // closePopUpEdit();
            }
        } else if (newPass && oldPass && newAgainPass && newPass != newAgainPass) {
            setErrorAgainPass(true);
            setErrorAgainPassTxt("نکرار رمز جدید باهم منطبق نیست");
        } else if (!newPass && oldPass && !newAgainPass) {
            setErrorAgainPass(true);
            setErrorPass(true);
            setErrorAgainPassTxt("رمز جدید وارد نشده است");
            setErrorPassTxt("رمز جدید وارد نشده است");
        } else if (newPass && !oldPass && !newAgainPass) {
            setErrorAgainPass(true);
            setErrorOldPass(true);
            setErrorAgainPassTxt("رمز جدید وارد نشده است");
            setErrorOldPassTxt("رمز عبور وارد نشده است");
        }
        else if (!newPass && !oldPass && newAgainPass) {
            setErrorPass(true);
            setErrorOldPass(true);
            setErrorPassTxt("رمز جدید وارد نشده است");
            setErrorOldPassTxt("رمز عبور وارد نشده است");
        }
        else if (newPass && !oldPass && newAgainPass) {
            setErrorOldPass(true);
            setErrorOldPassTxt("رمز عبور وارد نشده است");
        }
        else if (!newPass && oldPass && newAgainPass) {
            setErrorPass(true);
            setErrorPassTxt("رمز جدید وارد نشده است");
        }
        else if (newPass && oldPass && !newAgainPass) {
            setErrorAgainPass(true);
            setErrorAgainPassTxt("تکرار جدید وارد نشده است");
        } else if (!newPass && !oldPass && !newAgainPass) {
            setErrorPass(true);
            setErrorOldPass(true);
            setErrorAgainPass(true);
            setErrorPassTxt("رمز جدید وارد نشده است");
            setErrorOldPassTxt("رمز عبور وارد نشده است");
            setErrorAgainPassTxt("رمز جدید وارد نشده است");
        } else {
            setErrorPass(true);
            setErrorAgainPass(true);
            setErrorPassTxt("رمز جدید باید ۸ کاراکتر و شامل حروف بزرگ و کوچیک و علامت باشد");
            setErrorAgainPassTxt("رمز جدید باید ۸ کاراکتر و شامل حروف بزرگ و کوچیک و علامت باشد");
        }

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
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>تغییر رمز عبور کاربر {dataUser.USER_USERNAME} </h4>
                        </CardHeader>
                        <CardBody className="bodyEditCourse bodyStyleCard">

                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText="رمز عبور"
                                            value={oldPass}
                                            onChange={(e) => {
                                                setTextLeftOld(true)
                                                setErrorOldPass(false)
                                                setOldPass(e)
                                            }}
                                            textLeft={textLeftOld}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                required: true,
                                                minLength: 8,
                                                endAdornment: (
                                                    <InputAdornment position="start">
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
                                            className="password"
                                            type={showPass ? 'text' : 'password'}

                                            error={errorOldPass}
                                            errorText={errorOldPassTxt}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText="رمز عبور جدید"
                                            value={newPass}
                                            onChange={(e) => {
                                                setTextLeft(true)
                                                setErrorPass(false)
                                                setNewPass(e)
                                            }}
                                            textLeft={textLeft}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                required: true,
                                                minLength: 8,
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton

                                                            onClick={() => {
                                                                setShowPassNew(!showPassNew)
                                                            }}

                                                        >
                                                            {showPassNew ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            className="password"
                                            type={showPassNew ? 'text' : 'password'}

                                            error={errorPass}
                                            errorText={errorPassTxt}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText="نکرار رمز عبور جدید"
                                            value={newAgainPass}
                                            onChange={(e) => {
                                                setTextLeftNew(true)
                                                setErrorAgainPass(false)
                                                setNewAgainPass(e)
                                            }}
                                            textLeft={textLeftNew}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                required: true,
                                                minLength: 8,
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton

                                                            onClick={() => {
                                                                setShowPassAgainNew(!showPassAgainNew)
                                                            }}
                                                        >
                                                            {showPassAgainNew ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            className="password"
                                            type={showPassAgainNew ? 'text' : 'password'}
                                            error={errorAgainPass}
                                            errorText={errorAgainPassTxt}
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
                                        marginTop: 20,
                                        justifyContent: "center"
                                    }}
                                >
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => {
                                            trackPromise(updatePass());
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
