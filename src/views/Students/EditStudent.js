import React, { useContext, useEffect, useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { updateStudetInform } from "api/Core/Student_Manage";
import { GeneralContext } from "providers/GeneralContext";
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker"
import UploadPhoto from "components/UploadPhoto/UploadPhoto";
import imagePicker from "components/UploadPhoto/imagePicker"

import "./students.css"
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

export default function EditStudent(props) {
    var jalaali = require('jalaali-js')
    const classes = useStyles();
    const {
        openEditStudentPopUp,
        EditSuccess,
        closePopUpEdit,
        dataStudent } = props
    const { setOpenToast, onToast } = useContext(GeneralContext);

    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [date, setDate] = useState()
    const [email, setEmail] = useState()
    const [photo, setPhoto] = useState()
    const [nationalId, setNationalCode] = useState()

    const [birth, setBirth] = useState();

    const [filesImg, setFileImg] = useState()
    const fileName = useRef('')
    const upsertImgRef = useRef(null);

    useEffect(() => {
        setName(dataStudent.fullName)
        setPhone(dataStudent.phoneNumber)
        setBirth(dataStudent.birthDate)
        setEmail(dataStudent.email)
        setPhoto(dataStudent.profile)
        setNationalCode(dataStudent.nationalId);
        var datePirsian = dataStudent.birthDate.split("/")
        var dateEnglish = jalaali.toGregorian(Number(datePirsian[0]), Number(datePirsian[1]), Number(datePirsian[2]))
        setDate(new Date(`${dateEnglish.gy}/${dateEnglish.gm}/${dateEnglish.gd}`))
    }, [dataStudent])


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
            trackPromise(updateDataStudent(dataStudent._id, photo))
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
                    trackPromise(updateDataStudent(dataStudent._id, response.data.result))

                })
                .catch(function (response) {
                    console.log(response);
                });
        }


    }


    const updateDataStudent = async (id, img) => {
        const data = {
            id,
            fullName: name,
            email,
            phoneNumber: phone,
            birthDate: birth,
            nationalId,
            profile: img
        }
        let response = await updateStudetInform(data)
        if (response.data.result) {
            setOpenToast(true)
            onToast("کاربر آپدیت شد", "success")
            EditSuccess();
        }
    }

    return (
        <PopUpCustome
            open={openEditStudentPopUp}
            handleClose={() => { closePopUpEdit() }}
            className="popUpEditStudent">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditStudent">
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>آپدیت دانشجو</h4>
                        </CardHeader>
                        <CardBody className="bodyEditStudent">
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="نام"
                                            value={name}
                                            onChange={(e) => { setName(e) }}

                                            formControlProps={{
                                                fullWidth: true,
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
                                            value={nationalId}
                                            onChange={(e) => { setNationalCode(e) }}
                                        />
                                    </GridItem>

                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText="ایمیل"

                                            value={email}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            onChange={(e) => { setEmail(e) }}
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
                                            value={phone}
                                            onChange={(e) => { setPhone(e) }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomeDatePicker
                                            className="enterInputPanel"
                                            label="تاریخ تولد"
                                            maxDate={new Date()}
                                            onChange={(e) => {
                                                setDate(e);
                                                setBirth(`${e.year}/${e.month.number}/${e.day}`)
                                            }}
                                            value={date} />
                                    </GridItem>
                                </GridContainer>
                            </div>
                            <div className="photoEditStudent">
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
EditStudent.propTypes = {
    openEditStudentPopUp: PropTypes.bool,
    EditSuccess: PropTypes.func,
    closePopUpEdit: PropTypes.func,
    dataStudent: PropTypes.object
};