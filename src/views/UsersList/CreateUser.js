import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// import CustomSelectInput from "components/CustomInput/CustomeSelectInput";

import "./User.css";
import { insertUser } from "api/Core/User";

// new

// export const User_Status = [
//     {
//         _id: 0,
//         fullName: "غیر فعال"
//     },
//     {
//         _id: 1,
//         fullName: "فعال"
//     }
// ];

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
    const {
        openCreateUserPopUp,
        CreateSuccess,
        closePopUpCreate,
    } = props;


    // new

    const [name, setName] = useState();
    const [pass, setPass] = useState();
    const [displayName, setDisplayName] = useState(null);
    // const [status, setStatus] = useState(1);
    const [description, setDescription] = useState(null);
    const [errorName, setErrorName] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [textLeft, setTextLeft] = useState(false);
    const [errorDisplayName, setErrorDisplayName] = useState(false);

    function validatePassword(password) {
        const regex = /^(?=.*[0-7])(?=.*[!@#$%^&*])[a-zA-Z0-7!@#$%^&*]{8,}$/;
        return regex.test(password);
    }

    const createNewCourse = async () => {

        if (name && pass && displayName) {

            if (pass.length > 7 && validatePassword(pass)) {

                const userName = name;
                const data = Object.create(
                    {
                        userName: {
                            USER_PASSWORD: pass,
                            USER_STATUS: "1",//status.toString()
                            USER_DESCRIPTION: description,
                            USER_DISPLAYNAME: displayName
                        },
                    },
                );
                data[userName] = data["userName"];

                let response = await insertUser(data);
                if (response.data === "SUCCESSFUL") {
                    CreateSuccess();

                } else {
                    toast.error("کاربر با اضافه نشد");
                }
            } else setErrorPass(true)


        } else if (name && !pass && !displayName) {
            // setErrorName(true);
            setErrorPass(true);
            setErrorDisplayName(true)
            // toast.error("اطلاعات کافی نیست");
        } else if (!name && !pass && displayName) {
            setErrorName(true);
            setErrorPass(true);
        } else if (!name && pass && !displayName) {
            setErrorName(true);
            setErrorDisplayName(true);
        } else if (name && pass && !displayName) {
            setErrorDisplayName(true);
        } else if (!name && pass && displayName) {
            setErrorName(true);
        } else if (name && !pass && displayName) {
            setErrorPass(true);
        } else {
            setErrorPass(true);
            setErrorName(true);
            setErrorDisplayName(true);
            toast.error("اطلاعات کافی نیست");
        }
    };

    return (
        <PopUpCustome
            open={openCreateUserPopUp}
            handleClose={() => {
                closePopUpCreate();
            }}
            className="popUpCreateCourse"
        >
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card className="CardEditCourse" style={{ boxShadow: "none" }}>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>افزودن کاربر</h4>
                        </CardHeader>
                        <CardBody className="bodyCreateCourse" style={{ marginTop: 25 }}>
                            <div>
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={6} >
                                        <CustomInput
                                            rtlActive
                                            labelText="اسم کاربری"
                                            value={name}
                                            error={errorName}

                                            onChange={(e) => {
                                                setErrorName(false)
                                                setName(e);
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            errorText={"رمز عبور باید شامل عدد و حروف بزرگ و کوچک انگلیسی باشد و ۸ کاراکتر باشد"}
                                            textLeft={textLeft}
                                            labelText="رمز عبور"
                                            value={pass}
                                            onChange={(e) => {
                                                setTextLeft(true)
                                                setErrorPass(false)
                                                setPass(e);
                                            }}
                                            error={errorPass}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                required: true,
                                                minLength: 8,
                                                dir: "ltr"
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    {/* <GridItem xs={12} sm={12} md={6}>
                                        <CustomSelectInput
                                            labelText="وضعیت کاربر"
                                            value={status}
                                            options={User_Status}
                                            handleChange={(e) => {
                                                setStatus(e.target.value);
                                            }}
                                        />
                                    </GridItem> */}
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText="توضیحات"
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e);
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText="عنوان"
                                            value={displayName}
                                            error={errorDisplayName}

                                            onChange={(e) => {
                                                setErrorDisplayName(false)
                                                setDisplayName(e);
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
                                        marginTop: 20,
                                        justifyContent: "center"
                                    }}
                                >
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => {
                                            trackPromise(createNewCourse());
                                        }}
                                    >
                                        ایجاد کاربر
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
        </PopUpCustome >
    );
}

CreateUser.propTypes = {
    openCreateUserPopUp: PropTypes.bool,
    CreateSuccess: PropTypes.func,
    closePopUpCreate: PropTypes.func,
};
