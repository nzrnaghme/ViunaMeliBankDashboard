import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { editeGroup } from "api/Core/Group";
import { GeneralContext } from "providers/GeneralContext";

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
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
});

const useStyles = makeStyles(styles);

export default function EditTeacher(props) {
    const classes = useStyles();
    const { setOpenToast, onToast, setLosdingShow } = useContext(GeneralContext);

    const {
        openEditTeacherPopUp,
        EditSuccess,
        closePopUpEdit,
        dataGroup } = props

    const [condition, setCondition] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        setCondition(dataGroup.GROUP_STATUS);
        setDescription(dataGroup.GROUP_DESCRIPTION);
    }, [dataGroup]);

    const updateDataGroup = async () => {
        setLosdingShow(true)

        const groupName = dataGroup.GROUP_USERNAME
        const data = Object.create(
            {
                groupName: {
                    GROUP_STATUS: condition.toString(),
                    GROUP_DESCRIPTION: description,
                },
            },
        );
        data[groupName] = data["groupName"];

        let response = await editeGroup(data);
        if (response.data === "SUCCESSFUL") {
            setLosdingShow(false)

            EditSuccess();
        }

        else {
            setLosdingShow(false)

            setOpenToast(true)
            onToast("گروه بروزرسانی نشد", "error")
            closePopUpEdit();
        }


    }

    return (
        <PopUpCustome
            open={openEditTeacherPopUp}
            handleClose={() => { closePopUpEdit() }}
            className="popUpEditGroup">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse" style={{ boxShadow: "none" }}>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>بروزرسانی گروه</h4>
                        </CardHeader>
                        <CardBody className="bodyEditGroup">
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            disabled
                                            rtlActive
                                            labelText="اسم گروه"
                                            value={dataGroup.GROUP_USERNAME}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>


                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        {User_Status && User_Status.length > 0 &&
                                            <CustomSelectInput
                                                labelText="وضعیت گروه"
                                                value={condition}
                                                options={User_Status}
                                                handleChange={(e) => {
                                                    setCondition(e.target.value)
                                                }} />
                                        }
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
                                            multiline
                                            rows={3}
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
                                        onClick={() => { updateDataGroup() }}>ثبت تغییرات</RegularButton>
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

EditTeacher.propTypes = {
    openEditTeacherPopUp: PropTypes.bool,
    EditSuccess: PropTypes.func,
    closePopUpEdit: PropTypes.func,
    dataGroup: PropTypes.object
};