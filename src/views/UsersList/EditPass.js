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
import { GeneralContext } from "providers/GeneralContext";

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
export default function EditCourse(props) {
    const classes = useStyles();
    const { setOpenToast, onToast, setLosdingShow } = useContext(GeneralContext);

    const {
        openEditUserPopUp,
        EditSuccess,
        closePopUpEdit,
        dataUser,
    } = props;

    const [newPass, setNewPass] = useState();
    const [errorPass, setErrorPass] = useState(false);
    const [textLeft, setTextLeft] = useState(false);


    const updatePass = async () => {
        var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if (newPass && newPass.length > 8 && newPass.match(passw)) {
            setLosdingShow(true)

            const userName = dataUser.USER_USERNAME;
            const data = Object.create(
                {
                    userName: {
                        USER_PASSWORD: newPass
                    },
                },
            );
            data[userName] = data["userName"];
            let response = await changePassword(data);
            if (response.data === "SUCCESSFUL") {
                setLosdingShow(false)

                EditSuccess();
            } else {
                setLosdingShow(false)

                setOpenToast(true);
                onToast("کاربر بروزرسانی نشد", "error");
                closePopUpEdit();
            }
        } else {
            setErrorPass(true)
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
                        <CardHeader color="warning" className="CardTitle">
                            <h4 className={classes.cardTitleWhite}>تغییر رمز عبور کاربر {dataUser.USER_USERNAME} </h4>
                        </CardHeader>
                        <CardBody className="bodyEditCourse bodyStyleCard">

                            <div>
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
                                                dir: "ltr"
                                            }}
                                            error={errorPass}
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
                                            (updatePass());
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
