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

import "views/Comments/comment.css"

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

export default function AnswerQuestion(props) {
    const classes = useStyles();
    const {
        openAnswerCommentPopUp,
        closePopUpAnswerComment,
        dataComment,
        setAnswerComment,
        detailCourse } = props;

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
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>ثبت جواب به کامنت</h4>
                        </CardHeader>
                        <CardBody className="bodyAnswerComment">
                            <div>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="اسم دوره"
                                            value={detailCourse.title}
                                            disabled
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="استاد"

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={detailCourse.teacher.fullName}
                                            disabled
                                        />
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText={"متن سوال"}
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
                                            labelText={"پاسخ به سوال"}
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
                                    onClick={() => { trackPromise(handleAnswerComment()) }}>ثبت پاسخ سوال</RegularButton>

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

AnswerQuestion.propTypes = {
    openAnswerCommentPopUp: PropTypes.bool,
    closePopUpAnswerComment: PropTypes.func,
    dataComment: PropTypes.object,
    setAnswerComment: PropTypes.func,
    detailCourse: PropTypes.object
};