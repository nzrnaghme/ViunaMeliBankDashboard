import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { trackPromise } from "react-promise-tracker";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { GeneralContext } from "providers/GeneralContext";

import "../UsersList/User.css";
import { createCatalog } from "api/Core/Catalog";


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
    const { setOpenToast, onToast } = useContext(GeneralContext);

    const classes = useStyles();
    const {
        openCreateUserPopUp,
        CreateSuccess,
        closePopUpCreate,
        parentPath
    } = props;


    const [name, setName] = useState();
    const [errorName, setErrorName] = useState(false);


    const createNewCourse = async () => {
        if (name) {

            const data = {
                PATH: parentPath ? `${parentPath}/${name}` : `/${name}`,
                CREATEIFNOTEXIST: "true",
                CREATEINTERMEDIATEDIRS: "true"
            }

            let response = await createCatalog(data);
            if (response.data === "CreateFolder_Done") {
                CreateSuccess();

            } else {
                setOpenToast(true);
                onToast("فایل اضافه نشد", "error");
            }

        } else {
            setErrorName(true);
            setOpenToast(true);
            onToast("اطلاعات کافی نیست", "error");
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
                            <h4 className={classes.cardTitleWhite}>
                                افزودن فایل به {parentPath ? parentPath : "صفحه"}
                            </h4>
                        </CardHeader>
                        <CardBody className="bodyCreateCourse" style={{ marginTop: 25 }}>
                            <div>
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={12} >
                                        <CustomInput
                                            rtlActive
                                            labelText="اسم فایل"
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
        </PopUpCustome >
    );
}

CreateUser.propTypes = {
    openCreateUserPopUp: PropTypes.bool,
    CreateSuccess: PropTypes.func,
    closePopUpCreate: PropTypes.func,
    parentPath: PropTypes.string
};
