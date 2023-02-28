import api from "../interceptor";
import { FORGET_PASS, LOGIN, LOGIN_EMPLOYEE, REGISTER, REGISTER_EMPLOYEE, RESET_PASS } from "../endpoints"

export const registerUser = payload =>
    api.post(REGISTER, {
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.phoneNumber,
        birthDate: payload.birthDate,
        nationalId: payload.nationalId,
        profile: payload.profile
    })

export const loginUser = payload =>
    api.post(LOGIN, {
        email: payload.email,
        password: payload.password
    })

export const forgetPassUser = payload =>
    api.post(FORGET_PASS, {
        email: payload.email
    })

export const resetPassUser = payload =>
    api.post(RESET_PASS(payload.tokenPass), {
        password: payload.password
    })

//Employee
export const registerEmployee = payload => api.post(REGISTER_EMPLOYEE, {
    fullName: payload.fullName,
    email: payload.email,
    password: payload.password,
    phoneNumber: payload.phoneNumber,
    birthDate: payload.birthDate,
    nationalId: payload.nationalId,
    profile: payload.profile,
    address: payload.address,
    role: payload.role
})

export const loginEmployee = payload => api.post(LOGIN_EMPLOYEE, {
    email: payload.email,
    password: payload.password,
})