import React, { useState } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PopUpCustome from "components/PopUp/PopUp";
import RegularButton from "components/CustomButtons/Button";
// import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
// @material-ui/icons
import { addConfig } from "api/Core/Config";

import "../Groups/group.css"

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
export default function InsertConfig(props) {
    const classes = useStyles();

    const {
        InsertSuccess,
        openPopUpInsertConfig,
        closePopUp
    } = props;

    const [typeConfig, setTypeConfig] = useState(null)
    // const [condition, setCondition] = useState(1);
    const [description, setDescription] = useState(null);
    const [nameConfig, setNameConfig] = useState()

    const InsertConfig = async () => {

        if (typeConfig && description) {
            const configName = typeConfig
            const data = Object.create(
                {
                    configName: {
                        CNF_STATE:"1" ,//condition.toString(),
                        CNF_DESCRIPTION: description,
                        CNF_TYPE: typeConfig,
                        CNF_NAME: nameConfig
                    },
                },
            );
            data[configName] = data["configName"];
            let response = await addConfig(data);
            if (response.data === "SUCCESSFUL") {
                InsertSuccess();
            }
            else {
                toast.error("تنظیمات اضافه نشد")
            }
        } else {
            toast.error("اطلاعات ناقص است")
        }

    }

    return (
        <PopUpCustome
            open={openPopUpInsertConfig}
            handleClose={() => { closePopUp() }}
            className="popUpCreateGroup">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse" style={{ boxShadow: "none" }}>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>افزودن تنظیمات</h4>
                        </CardHeader>
                        <CardBody className="bodyEditGroup" style={{ marginTop: "-17px" }}>
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        
                                        <CustomInput
                                            rtlActive
                                            labelText="نوع تنظیمات"
                                            value={typeConfig}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            onChange={(e) => { setTypeConfig(e) }}
                                            inputProps={{
                                                required: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>

                                        <CustomInput
                                            rtlActive
                                            labelText="اسم تنظیمات"
                                            value={nameConfig}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            onChange={(e) => { setNameConfig(e) }}
                                            inputProps={{
                                                required: true
                                            }}
                                        />
                                    </GridItem>

                                </GridContainer>
                                <GridContainer>
                                    {/* <GridItem xs={12} sm={12} md={6}>
                                        {User_Status && User_Status.length > 0 &&
                                            <CustomSelectInput
                                                labelText="وضعیت تنظیمات"
                                                value={condition}
                                                options={User_Status}
                                                handleChange={(e) => {
                                                    setCondition(e.target.value)
                                                }} />
                                        }
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
                                            inputProps={{
                                                required: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </div>
                            <div className="btnEditGroup">
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    bottom: 20,
                                    cursor: "pointer"
                                }}>
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { trackPromise(InsertConfig()) }}>ثبت تغییرات</RegularButton>
                                    <RegularButton
                                        color="danger"
                                        size="sm"
                                        onClick={() => {

                                            closePopUp()
                                        }}
                                    >انصراف</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

InsertConfig.propTypes = {
    closePopUp: PropTypes.func,
    openPopUpInsertConfig: PropTypes.bool,
    InsertSuccess: PropTypes.func
};