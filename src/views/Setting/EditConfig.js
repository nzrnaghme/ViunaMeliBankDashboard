import React, { useEffect, useState } from "react";
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

import { editConfig } from "api/Core/Config";


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

export default function EditConfig(props) {
    const classes = useStyles();

    const {
        openEditConfigPopUp,
        EditSuccess,
        closePopUpEdit,
        dataConfig } = props

    const [condition, setCondition] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        setCondition(dataConfig.CNF_TYPE);
        setDescription(dataConfig.CNF_DESCRIPTION);
    }, [dataConfig]);

    const updateDataConfig = async () => {

        const configType = condition
        const data = Object.create(
            {
                configType: {
                    CNF_DESCRIPTION: description,
                },
            },
        );
        data[configType] = data["configType"];

        let response = await editConfig(data);
        if (response.data === "SUCCESSFUL") {
            EditSuccess();
        }

        else {
            toast.error("تنظیمات بروزرسانی نشد")
            closePopUpEdit();
        }
    }

    return (
        <PopUpCustome
            open={openEditConfigPopUp}
            handleClose={() => { closePopUpEdit() }}
            className="popUpEditGroup">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse" style={{ boxShadow: "none" }}>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>بروزرسانی تنظیمات</h4>
                        </CardHeader>
                        <CardBody className="bodyEditGroup" style={{ marginTop: "-15px" }}>
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            disabled
                                            rtlActive
                                            labelText="اسم تنظیمات"
                                            value={dataConfig.CNF_NAME}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>


                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>

                                        <CustomInput
                                            rtlActive
                                            labelText="نوع تنظیمات"
                                            value={condition}
                                            onChange={(e) => {
                                                setCondition(e);
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
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
                                        onClick={() => { trackPromise(updateDataConfig()) }}>ثبت تغییرات</RegularButton>
                                    <RegularButton
                                        color="danger"
                                        size="sm"
                                        onClick={() => { closePopUpEdit() }}>انصراف</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

EditConfig.propTypes = {
    openEditConfigPopUp: PropTypes.bool,
    EditSuccess: PropTypes.func,
    closePopUpEdit: PropTypes.func,
    dataConfig: PropTypes.object
};