import { GET_CAPTCHA, LOGINUSER, RELOAD_CAPTCHA, CHECK_CAPTCHA } from "../endpoints";
import api from "../interceptor";

export const loginUser = (payload) => api.post(LOGINUSER, payload);

export const getCaptcha = () => api.post(GET_CAPTCHA)

export const retryCaptcha = () => api.post(RELOAD_CAPTCHA)

export const validCaptcha = (payload) => api.post(CHECK_CAPTCHA, payload)