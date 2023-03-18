import React, { useState, useContext } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PopUpCustome from "components/PopUp/PopUp";
import RegularButton from "components/CustomButtons/Button";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
// @material-ui/icons
import PersonIcon from '@material-ui/icons/Person';
import { GeneralContext } from "providers/GeneralContext";

import "./group.css"
import { trackPromise } from "react-promise-tracker";
import { addGroup } from "api/Core/Group";

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
export default function InsertGroup(props) {
    const classes = useStyles();
    const { setOpenToast, onToast } = useContext(GeneralContext);

    const {
        InsertSuccess,
        openPopUpInsertGroup,
        closePopUp
    } = props;
    const [nameNew, setNameNew] = useState()
    const [condition, setCondition] = useState(0);
    const [description, setDescription] = useState(null);

    const InsertGroup = async () => {
        if (nameNew && description) {
            const groupName = nameNew
            const data = Object.create(
                {
                    groupName: {
                        GROUP_STATUS: condition.toString(),
                        GROUP_DESCRIPTION: description,
                    },
                },
            );
            data[groupName] = data["groupName"];
            let response = await addGroup(data);
            if (response.data === "SUCCESSFUL")
                InsertSuccess();
            else {
                setOpenToast(true)
                onToast("گروه اضافه نشد", "error")
                closePopUp()
            }
        } else {
            setOpenToast(true)
            onToast("گروه اضافه نشد", "error")
            closePopUp()
        }

    }

    return (
        <PopUpCustome
            open={openPopUpInsertGroup}
            handleClose={() => { closePopUp() }}
            className="popUpCreateGroup">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse" style={{ boxShadow: "none" }}>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>افزودن گروه</h4>
                        </CardHeader>
                        <CardBody className="bodyEditGroup bodyStyleCard">
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>

                                        <CustomInput
                                            rtlActive
                                            labelText="نام گروه"
                                            value={nameNew}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            onChange={(e) => { setNameNew(e) }}
                                            inputProps={{
                                                required: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PersonIcon className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
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
                                            labelText="توضیخات"
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e);
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            multiline
                                            rows={3}
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
                                        onClick={() => { trackPromise(InsertGroup()) }}>ثبت تغییرات</RegularButton>
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

InsertGroup.propTypes = {
    closePopUp: PropTypes.func,
    openPopUpInsertGroup: PropTypes.bool,
    InsertSuccess: PropTypes.func
};