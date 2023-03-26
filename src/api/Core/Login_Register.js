import api from "../interceptor";
import { LOGIN_EMPLOYEE, REGISTER_EMPLOYEE } from "../endpoints"


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