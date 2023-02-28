import React, { useState } from "react";
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
import { putAnswerToComment } from "api/Core/Comment";
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

export default function AnswerComment(props) {
    const classes = useStyles();
    const {
        openAnswerCommentPopUp,
        closePopUpAnswerComment,
        dataComment,
        setAnswerComment,
        dataCourse } = props;

    const [answer, setAnswer] = useState('')

    const handleAnswerComment = async () => {
        const data = {
            id: dataComment._id,
            answer
        }
        let response = await putAnswerToComment(data);
        if (response.data) {
            setAnswerComment()
        }
    }

    return (
        <PopUpCustome
            open={openAnswerCommentPopUp}
            handleClose={() => { closePopUpAnswerComment() }}
            className="popUpSetAnswerComment">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardShowDataComment">
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>ثبت جواب به کامنت</h4>
                        </CardHeader>
                        <CardBody className="bodyAnswerComment">
                            <div>
                                {!props.support &&
                                    <GridContainer>
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
                                    </GridContainer>}
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
                                    <GridItem xs={12} sm={12} md={12}>
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

                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText={props.support ? "پاسخ به پیام" : "پاسخ کامنت"}
                                            onChange={(e) => {
                                                setAnswer(e)
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={answer}
                                            rtlActive
                                            multiline
                                            rows={4}
                                        />
                                    </GridItem>
                                </GridContainer>

                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-around",
                                flexDirection: "row"
                            }}>
                                <RegularButton
                                    color="info"
                                    size="sm"
                                    onClick={() => { trackPromise(handleAnswerComment()) }}>ثبت پاسخ کامنت</RegularButton>

                                <RegularButton
                                    color="info"
                                    size="sm"
                                    onClick={() => { closePopUpAnswerComment() }}>انصراف</RegularButton>
                            </div>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

AnswerComment.propTypes = {
    openAnswerCommentPopUp: PropTypes.bool,
    closePopUpAnswerComment: PropTypes.func,
    dataComment: PropTypes.object,
    setAnswerComment: PropTypes.func,
    support: PropTypes.bool,
    dataCourse:PropTypes.object
};