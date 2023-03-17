import { ACTIVE_EMPLOYEE, ALL_TEACHER, DEACTIVE_EMPLOYEE, GET_EMPLOYEE_BY_ID, LAST_TEACHERS, REMOVE_EMPLOYEE, UPDATE_EMPLOYEE } from "../endpoints";
import api from "../interceptor";

export const getAllTeachers = () => api.get(ALL_TEACHER)

export const getLastTeachers = () => api.get(LAST_TEACHERS)

export const getEmployeeById = (payload) => api.get(GET_EMPLOYEE_BY_ID(payload))

export const updateEmployeeById = (payload) => api.put(UPDATE_EMPLOYEE(payload.id), {
    fullName: payload.fullName,
    email: payload.email,
    birthDate: payload.birthDate,
    phoneNumber: payload.phoneNumber,
    address: payload.address,
    nationalId: payload.nationalId,
    profile: payload.profile
})

export const deActiveEmployeetManage = payload => api.put(DEACTIVE_EMPLOYEE(payload))

export const activeEmployeeManage = payload => api.put(ACTIVE_EMPLOYEE(payload))

export const removeEmployee = payload => api.delete(REMOVE_EMPLOYEE(payload))

