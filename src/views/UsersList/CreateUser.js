import React, { useState, useContext } from "react";

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
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
import { getItem } from "api/storage/storage";
import { GeneralContext } from "providers/GeneralContext";

import "./User.css";
import { insertUser } from "api/Core/User";

// new

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
        width: theme.spacing(22),
        height: theme.spacing(22),
    },
});

const useStyles = makeStyles(styles);

export default function CreateUser(props) {
    const { setOpenToast, onToast ,setLosdingShow} = useContext(GeneralContext);
    const roleUser = getItem('role')
    // const userId = getItem('id')

    const classes = useStyles();
    const {
        openCreateUserPopUp,
        CreateSuccess,
        closePopUpCreate,
    } = props;


    // new

    const [name, setName] = useState();
    const [pass, setPass] = useState();
    const [status, setStatus] = useState(0);
    const [description, setDescription] = useState();


    const createNewCourse = async () => {
        setLosdingShow(true)

        if (name && pass && description) {
            const userName = name;
            const data = Object.create(
                {
                    userName: {
                        USER_PASSWORD: pass,
                        USER_STATUS: status.toString(),
                        USER_DESCRIPTION: description,
                    },
                },
            );
            data[userName] = data["userName"];
            console.log(data, "22");
            let response = await insertUser(data);
            if (response.data === "SUCCESSFUL") {
                setLosdingShow(false)

                CreateSuccess();

            } else {
                setLosdingShow(false)

                setOpenToast(true);
                onToast("کاربر با اضافه نشد", "error");
                closePopUpCreate();
            }
        } else {
            setLosdingShow(false)

            setOpenToast(true);
            onToast("کاربر اضافه نشد", "error");
            closePopUpCreate();
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
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse" style={{ boxShadow: "none" }}>
                        <CardHeader color="warning" className="CardTitle">
                            <h4 className={classes.cardTitleWhite}>افزودن کاربر</h4>
                        </CardHeader>
                        <CardBody className="bodyCreateCourse" style={{ marginTop: 20 }}>
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="اسم کاربری"
                                            value={name}
                                            onChange={(e) => {
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
                                            labelText="رمز عبور"
                                            value={pass}
                                            onChange={(e) => {
                                                setPass(e);
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomSelectInput
                                            labelText="وضعیت کاربر"
                                            value={status}
                                            options={User_Status}
                                            handleChange={(e) => {
                                                setStatus(e.target.value);
                                            }}
                                            disabled={roleUser === "teacher"}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
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
                                            (createNewCourse());
                                        }}
                                    >
                                        ثبت تغییرات
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
        </PopUpCustome>
    );
}

CreateUser.propTypes = {
    openCreateUserPopUp: PropTypes.bool,
    CreateSuccess: PropTypes.func,
    closePopUpCreate: PropTypes.func,
};
