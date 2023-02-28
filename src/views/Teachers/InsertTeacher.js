import React, { useState, useRef, useContext } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PopUpCustome from "components/PopUp/PopUp";
import RegularButton from "components/CustomButtons/Button";
// @material-ui/icons
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker"
import Call from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { registerEmployee } from "api/Core/Login_Register";
import photoPic from "assets/img/photo.png"
import imagePicker from "components/UploadPhoto/imagePicker"
import UploadPhoto from "components/UploadPhoto/UploadPhoto";
import { GeneralContext } from "providers/GeneralContext";

import "./teacher.css"
import { trackPromise } from "react-promise-tracker";

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
export default function InsertTeacher(props) {
    const classes = useStyles();
    const { setOpenToast, onToast } = useContext(GeneralContext);

    const {
        InsertSuccess,
        openPopUpInsertTecher,
        closePopUp
    } = props;
    const [nameNew, setNameNew] = useState()
    const [phoneNew, setPhoneNew] = useState()
    const [photo, setPhoto] = useState(photoPic)
    const [birthNew, setBirthNew] = useState()
    const [emailNew, setEmailNew] = useState()
    const [passNew, setPassNew] = useState()
    const [addressNew, setAddressNew] = useState()
    const [nationalIdNew, setNationalCodeNew] = useState()
    const [date, setDate] = useState(null);

    const [filesImg, setFileImg] = useState()
    const fileName = useRef('')
    const upsertImgRef = useRef(null);

    const onUploadingImg = async (e) => {
        const files = e.target.files[0];
        fileName.current = files.name;
        let blob = await imagePicker(files);
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            (imgUpdateHandler(reader.result));
        };
    }

    const imgUpdateHandler = (img) => {
        setPhoto(img);
        var fileImg = dataURLtoFile(img, fileName.current);
        setFileImg(fileImg)
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    const onUpsertClicked = () => {
        upsertImgRef.current.click();
    }

    const uploadImgToDatabase = async () => {
        if (!filesImg) {
            onToast('لطفا عکس انتخاب کنید!');
            setOpenToast(true)
        }
        else {

            let formData = new FormData();
            formData.append('image', filesImg);
            axios({
                method: "post",
                url: "https://api.noorgon.sepehracademy.ir/api/upload/image",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    if (response.data.result)
                        trackPromise(insertStudent(response.data.result))

                })
                .catch(function (response) {
                    console.log(response);
                });
        }


    }


    const insertStudent = async (img) => {
        const data = {
            fullName: nameNew,
            email: emailNew,
            phoneNumber: phoneNew,
            birthDate: birthNew,
            nationalId: nationalIdNew,
            profile: img,
            password: passNew,
            address: addressNew,
            role: "teacher"
        }
        let response = await registerEmployee(data);
        if (response.data.result) {
            setNameNew('');
            setEmailNew('');
            setPassNew('');
            setPhoneNew('');
            setNationalCodeNew('');
            setBirthNew('')
            setAddressNew('')
            InsertSuccess()
        }
    }

    return (
        <PopUpCustome
            open={openPopUpInsertTecher}
            handleClose={() => { closePopUp() }}
            className="popUpCreateTeacher">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardInsertTeacher">
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>افزودن استاد</h4>
                        </CardHeader>
                        <CardBody className="bodyCreateTeacher">
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="نام"
                                            value={nameNew}
                                            onChange={(e) => { setNameNew(e) }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
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
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="کد ملی"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={nationalIdNew}
                                            onChange={(e) => {
                                                if (/^[0-9]+$/i.test(e)) {
                                                    setNationalCodeNew(e)
                                                } else setNationalCodeNew('')
                                            }}
                                            inputProps={{
                                                maxLength: 10,
                                                minLength: 10,
                                                required: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <RecentActorsIcon className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="ایمیل"
                                            value={emailNew}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            onChange={(e) => { setEmailNew(e) }}
                                            inputProps={{
                                                required: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <MailOutlineIcon className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="رمز عبور"
                                            value={passNew}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            onChange={(e) => { setPassNew(e) }}
                                            inputProps={{
                                                required: true,
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputAdornmentIcon}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="موبایل"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={phoneNew}
                                            onChange={(e) => {
                                                if (/^[0-9]+$/i.test(e)) {
                                                    setPhoneNew(e)
                                                } else setPhoneNew('')
                                            }}
                                            inputProps={{
                                                inputMode: "tel",
                                                required: true,
                                                maxLength: 11,
                                                minLength: 11,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Call className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomeDatePicker
                                            label="تاریخ تولد"
                                            maxDate={new Date()}
                                            onChange={(e) => {
                                                setDate(e);
                                                setBirthNew(`${e.year}/${e.month.number}/${e.day}`)
                                            }}
                                            value={date}
                                            className="BirthTeacher"
                                        />
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="آدرس"
                                            value={addressNew}
                                            onChange={(e) => { setAddressNew(e) }}
                                            formControlProps={{
                                                fullWidth: true,
                                                className: classes.formControlClassName
                                            }}
                                            className="address"
                                            inputProps={{
                                                required: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <HomeIcon className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </div>
                            <div className="photoInsertTeacher">
                                <UploadPhoto
                                    src={photo}
                                    onUploadingImg={onUploadingImg}
                                    onUpsertClicked={onUpsertClicked}
                                    upsertRef={upsertImgRef} />
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    position: "absolute",
                                    bottom: 20,
                                    cursor: "pointer"
                                }}>
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { trackPromise(uploadImgToDatabase()) }}>ثبت تغییرات</RegularButton>
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

InsertTeacher.propTypes = {
    closePopUp: PropTypes.func,
    openPopUpInsertTecher: PropTypes.bool,
    InsertSuccess: PropTypes.func
};