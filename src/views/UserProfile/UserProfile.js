import React, { useEffect, useState, useContext, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { GeneralContext } from "providers/GeneralContext";
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker"
import imagePicker from "components/UploadPhoto/imagePicker"

import { getItem } from "api/storage/storage";
import { getEmployeeById } from "api/Core/Employe_Manage";
import { updateEmployeeById } from "api/Core/Employe_Manage";
import UploadPhoto from "components/UploadPhoto/UploadPhoto";
import "./profile.css"
import { trackPromise } from "react-promise-tracker";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "bakh",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  var jalaali = require('jalaali-js')
  const classes = useStyles();
  const userId = getItem('id')
  const [dataUser, setDataUser] = useState()
  const [topics, setTopics] = useState([])
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [birth, setBirth] = useState()
  const [address, setAddress] = useState()
  const [email, setEmail] = useState()
  const { setOpenToast, onToast } = useContext(GeneralContext);
  const [date, setDate] = useState(null);

  const [photoUser, setPhotoUser] = useState()
  const [filesImg, setFileImg] = useState()
  const fileName = useRef('')
  const upsertImgRef = useRef(null);

  useEffect(() => {
    trackPromise(getDataUser(userId))
  }, [])

  const getDataUser = async (userId) => {
    let response = await getEmployeeById(userId);
    if (response.data.result) {
      setDataUser(response.data.result)
      const topic = response.data.result.courses.map((item) => (
        { topic: item.lesson.topics[0] }
      ))
      setTopics(topic)
      setName(response.data.result.fullName)
      setPhone(response.data.result.phoneNumber)
      setBirth(response.data.result.birthDate)
      setAddress(response.data.result.address)
      setEmail(response.data.result.email)
      setPhotoUser(response.data.result.profile)

      var datePirsian = response.data.result.birthDate.split("/")
      var dateEnglish = jalaali.toGregorian(Number(datePirsian[0]), Number(datePirsian[1]), Number(datePirsian[2]))
      setDate(new Date(`${dateEnglish.gy}/${dateEnglish.gm}/${dateEnglish.gd}`))
    }
  }

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
    setPhotoUser(img);
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
      trackPromise(updateUser(photoUser))
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
            trackPromise(updateUser(response.data.result))

        })
        .catch(function (response) {
          console.log(response);
        });
    }


  }

  const updateUser = async (img) => {
    const data = {
      id: userId,
      fullName: name,
      email,
      birthDate: birth,
      phoneNumber: phone,
      address,
      nationalId: dataUser.nationalId,
      profile: img
    }
    let response = await updateEmployeeById(data)
    if (response.data) {
      setOpenToast(true)
      onToast(response.data.message[0].message, "success")
    }
  }


  return (
    <div>
      {dataUser && topics &&
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}> پروفایل</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="نام"
                      value={name}
                      onChange={(e) => { setName(e) }}
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />

                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      rtlActive
                      labelText="کد ملی"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                      value={dataUser.nationalId}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      rtlActive
                      labelText="ایمیل"
                      id="email-address"
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
                      id="phone"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={phone}
                      onChange={(e) => { setPhone(e) }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="آدرس"
                      id="address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={address}
                      rtlActive
                      onChange={(e) => { setAddress(e) }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>

                    <CustomeDatePicker
                      label="تاریخ تولد"
                      maxDate={new Date()}
                      onChange={(e) => {
                        setDate(e);
                        setBirth(`${e.year}/${e.month.number}/${e.day}`)
                      }}
                      value={date}
                      className="Birth"
                    />
                  </GridItem>

                </GridContainer>

              </CardBody>
              <CardFooter>
                <Button color="info" onClick={() => { trackPromise(uploadImgToDatabase()) }}>بروزرسانی</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <div className="photoMyProfile">
                <UploadPhoto
                  src={photoUser}
                  onUploadingImg={onUploadingImg}
                  onUpsertClicked={onUpsertClicked}
                  upsertRef={upsertImgRef} />
              </div>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{dataUser.role}</h6>
                {topics.map((item, key) => (
                  <p className={classes.description} key={key}>
                    {item.topic}

                  </p>
                ))}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>}
    </div>
  );
}
