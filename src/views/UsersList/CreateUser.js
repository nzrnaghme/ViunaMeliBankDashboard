import React, { useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx'

import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";

// import CustomSelectInput from "components/CustomInput/CustomeSelectInput";

import { insertUser } from "api/Core/User";
import "./User.css";

// new

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
        width: theme.spacing(22),
        height: theme.spacing(22),
    },
});

const useStyles = makeStyles(styles);

export default function CreateUser(props) {

    const classes = useStyles();
    const {
        openCreateUserPopUp,
        CreateSuccess,
        closePopUpCreate,
    } = props;


    // new

    const [name, setName] = useState();
    const [pass, setPass] = useState();
    const [passAgain, setPassAgain] = useState();

    const [displayName, setDisplayName] = useState(null);
    const [codeBranch, setCodeBranch] = useState(null);
    // const [status, setStatus] = useState(1);
    const [description, setDescription] = useState(null);
    const [errorName, setErrorName] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorPassAgain, setErrorPassAgain] = useState(false);
    const [textLeft, setTextLeft] = useState(false);
    const [textLeftAgain, setTextLeftAgain] = useState(false);
    const [errorDisplayName, setErrorDisplayName] = useState(false);
    const [errorCodeBranch, setErrorCodeBranch] = useState(false);

    const [showPass, setShowPass] = useState(false);
    const [showPassAgain, setShowPassAgain] = useState(false);

    const [itemTabs, setItemTabs] = useState(0);

    const uoploadFile = useRef(null);
    const [nameFile, setNameFile] = useState(null);

    const [rowsPerPageGroup, setRowsPerPageGroup] = useState(10);
    const [currentPage_MainbarCurrentGroup, setCurrentPage_MainbarCurrentGroup] = useState(0);
    const [allUsers, setAllUsers] = useState()


    function validatePassword(password) {
        const regex = /^(?=.*[0-7])(?=.*[!@#$%^&*])[a-zA-Z0-7!@#$%^&*]{8,}$/;
        return regex.test(password);
    }

    const createNewCourse = async () => {

        if (name && pass && displayName) {

            if (pass.length > 7 && validatePassword(pass) && pass === passAgain) {

                const userName = name;
                const data = Object.create(
                    {
                        userName: {
                            USER_PASSWORD: pass,
                            USER_STATUS: "1",//status.toString()
                            USER_DESCRIPTION: description,
                            USER_DISPLAYNAME: displayName,
                            USER_BRANCH_CODE: codeBranch
                        },
                    },
                );
                data[userName] = data["userName"];

                let response = await insertUser(data);
                if (response.data === "SUCCESSFUL") {
                    CreateSuccess();

                } else {
                    toast.error("کاربر با اضافه نشد");
                }
            } else {
                setErrorPass(true);
                setErrorPassAgain(true)
            }


        } else if (name && !pass && !displayName && !passAgain && !codeBranch) {
            setErrorPassAgain(true);
            setErrorPass(true);
            setErrorDisplayName(true);
            setErrorCodeBranch(true)
        } else if (!name && !pass && displayName && !passAgain && !codeBranch) {
            setErrorName(true);
            setErrorPass(true);
            setErrorPassAgain(true);
            setErrorCodeBranch(true)
        } else if (!name && pass && !displayName && !passAgain && !codeBranch) {
            setErrorName(true);
            setErrorDisplayName(true);
            setErrorPassAgain(true);
            setErrorCodeBranch(true)
        } else if (!name && !pass && !displayName && passAgain && !codeBranch) {
            setErrorName(true);
            setErrorDisplayName(true);
            setErrorPass(true);
            setErrorCodeBranch(true);
        }
        else if (!name && !pass && !displayName && !passAgain && codeBranch) {
            setErrorName(true);
            setErrorDisplayName(true);
            setErrorPass(true);
        } else if (name && pass && !displayName && !passAgain && !codeBranch) {
            setErrorDisplayName(true);
            setErrorPassAgain(true);
            setErrorCodeBranch(true)
        } else if (!name && pass && displayName && !passAgain && !codeBranch) {
            setErrorName(true);
            setErrorPassAgain(true);
            setErrorCodeBranch(true)
        } else if (name && !pass && displayName && !passAgain && !codeBranch) {
            setErrorPass(true);
            setErrorPassAgain(true);
            setErrorCodeBranch(true);
        } else if (!name && !pass && displayName && passAgain && !codeBranch) {
            setErrorName(true);
            setErrorPass(true);
            setErrorCodeBranch(true)
        }
        else if (!name && pass && !displayName && passAgain && !codeBranch) {
            setErrorName(true);
            setErrorDisplayName(true);
            setErrorCodeBranch(true)
        }
        else if (name && !pass && !displayName && passAgain && !codeBranch) {
            setErrorDisplayName(true);
            setErrorPass(true);
            setErrorCodeBranch(true)
        }
        else if (!name && !pass && !displayName && passAgain && codeBranch) {
            setErrorDisplayName(true);
            setErrorPass(true);
            setErrorName(true)
        }
        else if (!name && !pass && displayName && !passAgain && codeBranch) {
            setErrorPassAgain(true);
            setErrorPass(true);
            setErrorName(true)
        }
        else if (!name && pass && !displayName && !passAgain && codeBranch) {
            setErrorDisplayName(true);
            setErrorPassAgain(true);
            setErrorName(true)
        }
        else if (name && !pass && !displayName && !passAgain && codeBranch) {
            setErrorDisplayName(true);
            setErrorPass(true);
            setErrorPassAgain(true);
        }//from three
        else if (!name && !pass && displayName && passAgain && codeBranch) {
            setErrorPass(true);
            setErrorName(true);
        }
        else if (!name && pass && !displayName && passAgain && codeBranch) {
            setErrorDisplayName(true);
            setErrorName(true);
        }
        else if (!name && pass && displayName && !passAgain && codeBranch) {
            setErrorPassAgain(true);
            setErrorName(true);
        }
        else if (!name && pass && displayName && passAgain && !codeBranch) {
            setErrorCodeBranch(true);
            setErrorName(true);
        }
        else if (name && !pass && displayName && passAgain && !codeBranch) {
            setErrorCodeBranch(true);
            setErrorPass(true);
        }
        else if (name && pass && !displayName && passAgain && !codeBranch) {
            setErrorCodeBranch(true);
            setErrorDisplayName(true);
        }
        // else if (name && pass && displayName && !passAgain && !codeBranch) {
        //     setErrorCodeBranch(true);
        //     setErrorPassAgain(true);
        // }
        else if (name && !pass && displayName && !passAgain && codeBranch) {
            setErrorPass(true);
            setErrorPassAgain(true);
        }
        else if (name && pass && !displayName && !passAgain && codeBranch) {
            setErrorDisplayName(true);
            setErrorPassAgain(true);
        }//from one
        else if (name && pass && !displayName && passAgain && codeBranch) {
            setErrorDisplayName(true);
        }
        else if (name && !pass && displayName && passAgain && codeBranch) {
            setErrorPass(true);
        }
        else if (!name && pass && displayName && passAgain && codeBranch) {
            setErrorName(true);
        }
        // else if (!codeBranch && name && pass && displayName && passAgain) {
        //     setErrorCodeBranch(true);
        // }
        // else if (name && pass && displayName && !passAgain && codeBranch) {
        //     setErrorPassAgain(true);
        // }

        else {
            setErrorPass(true);
            setErrorName(true);
            setErrorDisplayName(true);
            setErrorCodeBranch(true);
            toast.error("اطلاعات کافی نیست");
        }
    };


    const readExcel = (file) => {
        try {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);
                fileReader.onload = (e) => {
                    const bufferReader = e.target.result;
                    const wb = XLSX.read(bufferReader, { type: "buffer" });
                    const wbSheetName = wb.SheetNames[0];
                    console.log(wbSheetName, "wbSheetName");
                    const ws = wb.Sheets[wbSheetName];
                    console.log(ws, "ws");
                    const data = XLSX.utils.sheet_to_json(ws);
                    const resultArray = data.map((obj, index) => {
                        console.log(obj, "obj");
                        const newKeyNames = [
                            "USER_USERNAME",
                            "USER_PASSWORD",
                            // "USER_STATUS",
                            "USER_DISPLAYNAME",
                            "USER_DESCRIPTION",
                            "USER_BRANCH_CODE",
                        ];

                        const updatedObject = {};
                        const objectKeys = Object.keys(obj);

                        for (let i = 0; i < objectKeys.length; i++) {
                            const oldKey = objectKeys[i];
                            const newKey = newKeyNames[i] || oldKey; // Use new key name if available, otherwise keep the old key name
                            updatedObject[newKey] = obj[oldKey];
                        }
                        console.log(updatedObject, "updatedObject");
                        const newObj = { ...updatedObject }; // Create a new object to avoid modifying the original object
                        newObj.id = index + 1; // Assign unique id based on index position

                        return newObj;
                    });
                    console.log(resultArray, "resultArray");
                    setAllUsers(resultArray)
                    resolve(data);
                };
                FileReader.onError = (error) => {
                    reject(error);
                };
            })
        } catch (error) {
            console.log(error)
        }
    }


    const handleChange = (event, newValue) => {
        setItemTabs(newValue);
    };

    const handleChangeRowsPerPageGroup = (event) => {
        setRowsPerPageGroup(+event.target.value);
        setCurrentPage_MainbarCurrentGroup(0);
    };

    const handleChangePageGroup = (event, newPage) => {
        setCurrentPage_MainbarCurrentGroup(newPage)
    }

    const createAllUser = () => {
        const resultObject = {};
        allUsers.forEach(obj => {
            const key = obj.USER_USERNAME;
            delete obj.USER_USERNAME;
            delete obj.id;
            // obj.USER_STATUS = String(obj.USER_STATUS);
            obj.USER_BRANCH_CODE = String(obj.USER_BRANCH_CODE);
            resultObject[key] = obj;
        });

        const userObjects = Object.entries(resultObject);

        userObjects.forEach(async ([key, value]) => {
            const name = key
            const data = Object.create(
                {
                    name: value
                }
            )
            data[name] = data["name"];
            let response = await insertUser(data);
            if (response.data === "SUCCESSFUL") {
                CreateSuccess();
            } else if (response.data) {
                toast.error(`کاربر ${response.data} اضافه نشد`);
            }
        });
    }


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
                            <h4 className={classes.cardTitleWhite}>افزودن کاربر</h4>
                        </CardHeader>
                        <CardBody className="bodyCreateCourse" style={{ marginTop: 25 }}>
                            <Tabs
                                value={itemTabs}
                                indicatorColor="secondary"
                                textColor="secondary"
                                onChange={handleChange}
                                aria-label="disabled tabs example"
                                className="tabsUser"
                            >
                                <Tab label="بصورت تکی" />
                                <Tab label="بصورت فایل" />
                            </Tabs>

                            {itemTabs === 0 &&
                                <>

                                    <div>
                                        <GridContainer >
                                            <GridItem xs={12} sm={12} md={6} >
                                                <CustomInput
                                                    rtlActive
                                                    labelText="نام کاربری"
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



                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="نام خانوادگی"
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

                                        <GridContainer>
                                            {/* <GridItem xs={12} sm={12} md={6}>
                                        <CustomSelectInput
                                            labelText="وضعیت کاربر"
                                            value={status}
                                            options={User_Status}
                                            handleChange={(e) => {
                                                setStatus(e.target.value);
                                            }}
                                        />
                                        </GridItem> */}
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    errorText={"رمز عبور باید شامل عدد و حروف بزرگ و کوچک انگلیسی و کاراکتر خاص باشد و ۸ کاراکتر باشد"}
                                                    textLeft={textLeft}
                                                    labelText="رمز عبور جدید"
                                                    value={pass}
                                                    className="password"
                                                    onChange={(e) => {
                                                        setTextLeft(true)
                                                        setErrorPass(false)
                                                        setPass(e);
                                                    }}
                                                    error={errorPass}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    inputProps={{
                                                        required: true,
                                                        minLength: 8,
                                                        name: "password",
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconButton

                                                                    onClick={() => {
                                                                        setShowPass(!showPass)
                                                                    }}

                                                                >
                                                                    {showPass ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    type={showPass ? 'text' : 'password'}

                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    errorText={"رمز عبور باید شامل عدد و حروف بزرگ و کوچک انگلیسی و کاراکتر خاص باشد و ۸ کاراکتر باشد"}
                                                    textLeft={textLeftAgain}
                                                    labelText="تکرار رمز عبور جدید"
                                                    value={passAgain}
                                                    className="password"
                                                    onChange={(e) => {
                                                        setTextLeftAgain(true)
                                                        setErrorPassAgain(false)
                                                        setPassAgain(e);
                                                    }}
                                                    error={errorPassAgain}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    inputProps={{
                                                        required: true,
                                                        minLength: 8,
                                                        name: "password",
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconButton

                                                                    onClick={() => {
                                                                        setShowPassAgain(!showPassAgain)
                                                                    }}

                                                                >
                                                                    {showPassAgain ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    type={showPassAgain ? 'text' : 'password'}

                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="سمت"
                                                    value={displayName}
                                                    error={errorDisplayName}

                                                    onChange={(e) => {
                                                        setErrorDisplayName(false)
                                                        setDisplayName(e);
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="کد شعبه"
                                                    value={codeBranch}
                                                    error={errorCodeBranch}

                                                    onChange={(e) => {
                                                        setErrorCodeBranch(false)
                                                        setCodeBranch(e);
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
                                                ایجاد کاربر
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
                                </>
                            }

                            {itemTabs === 1 &&
                                <>
                                    <div className="file">
                                        <input
                                            hidden
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setNameFile(file.name)
                                                readExcel(file);
                                            }}
                                            ref={uoploadFile}
                                        />

                                        <RegularButton
                                            color="info"
                                            size="sm"
                                            onClick={() => {
                                                uoploadFile.current.click();
                                            }}
                                            className="btnFile"
                                        >
                                            بارگذاری فایل
                                        </RegularButton>
                                        {nameFile &&
                                            <p>{nameFile}</p>
                                        }
                                    </div>
                                    {allUsers && allUsers.length > 0 && allUsers != undefined &&
                                        <div style={{ textAlign: "center" }}>
                                            <Table
                                                tableHeaderColor="info"
                                                tableHead={[
                                                    "نام کاربر",
                                                    "رمز کاربر",
                                                    "نام و نام خانوادگی",
                                                    "سمت",
                                                    "کد شعبه",
                                                    "عملیات"]}
                                                rowsCount={rowsPerPageGroup}
                                                tableData={allUsers}
                                                currentPage={currentPage_MainbarCurrentGroup}
                                                handleChangePage={handleChangePageGroup}
                                                handleChangeRowsPerPage={handleChangeRowsPerPageGroup}
                                                listFileUser
                                                removeRowFromList={(row) => {
                                                    var newData = allUsers.filter((e) => e.id != row.id)
                                                    setAllUsers(newData);
                                                }}

                                            />
                                            <RegularButton
                                                color="info"
                                                size="sm"
                                                onClick={createAllUser}
                                                className="btnFileAccept"
                                            >
                                                ذخیره تغییرات
                                            </RegularButton>
                                        </div>
                                    }
                                </>
                            }

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
