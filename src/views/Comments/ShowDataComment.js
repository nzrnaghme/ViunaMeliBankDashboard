import React from "react";
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
import "./comment.css"

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
export default function ShowDataComment(props) {
    const classes = useStyles();
    const {
        openDataCommentPopUp,
        closePopUpDataComment,
        dataComment,
        dataCourse } = props;

    return (
        <PopUpCustome
            open={openDataCommentPopUp}
            handleClose={() => { closePopUpDataComment(); }}
            className="popUpShowDataComment">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardShowDataComment">
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>اطلاعات کامنت</h4>
                        </CardHeader>
                        <CardBody className="bodyShowDataComment">
                            <div>

                                {!props.support && <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="اسم کاربر"
                                            value={dataComment.username}
                                            disabled
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="ایمیل کاربر"

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={dataComment.email}
                                            disabled
                                        />
                                    </GridItem>
                                </GridContainer>
                                }
                                {!props.support && <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="اسم دوره"
                                            value={dataCourse.title}
                                            disabled
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="مدرس دوره"

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={dataCourse.teacher.fullName}
                                            disabled
                                        />
                                    </GridItem>
                                </GridContainer>
                                }

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText={props.support ? "متن پیام" : "متن کامنت"}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={dataComment.comment}
                                            disabled
                                            multiline
                                            rows={dataComment.comment.length > 70 ? 5 : 2}
                                        />
                                    </GridItem>
                                    {dataComment.answer &&
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText={props.support ? "پاسخ به پیام" : "پاسخ کامنت"}
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                value={dataComment.answer}
                                                disabled
                                                rtlActive
                                                multiline
                                                rows={dataComment.comment.length > 70 ? 5 : 2}

                                            />
                                        </GridItem>}
                                </GridContainer>

                            </div>
                            <div className="photoEditTeacher">
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { closePopUpDataComment(); }}>تایید</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>)
}

ShowDataComment.propTypes = {
    openDataCommentPopUp: PropTypes.bool,
    closePopUpDataComment: PropTypes.func,
    dataComment: PropTypes.object,
    support: PropTypes.bool,
    dataCourse: PropTypes.object
};