import { ANSWER_COMMENT, GETALL_COMMENTS, SEND_NEW_COMMENT, VERIFY_COMMENT } from "../endpoints";
import api from "../interceptor";

export const getComment = () => api.get(GETALL_COMMENTS)

export const sendNewComment = payload =>
    api.post(SEND_NEW_COMMENT, {
        postId: payload.postId,
        email: payload.email,
        username: payload.username,
        comment: payload.Comment
    })

export const verifyComment = payload => api.post(VERIFY_COMMENT, payload)

export const putAnswerToComment = payload => api.post(ANSWER_COMMENT, payload)