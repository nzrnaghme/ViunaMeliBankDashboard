import {
    ADD_USER, ADD_USER_ROLE,
    EDIT_USER,
    LIST_USERS,
    REMOVE_USER,
    LIST_GROUP_USER,
    REMOVE_USER_GROUP,
    LIST_ROLE_USER,
    COUNT_USER,
    CHANGE_PASS,
    FIND_USER,
    FILTER_STATUS,
    FILTER_DESCRIPTION,
    FILTER_DISPLAYNAME,
    FILTER_BRANCHCODE
} from "../endpoints";
import api from "../interceptor";

export const getListUser = (payload) => api.post(LIST_USERS, payload);

export const removeUser = (payload) => api.post(REMOVE_USER, payload)

export const insertUser = (payload) => api.post(ADD_USER, payload)

export const editUser = (payload) => api.post(EDIT_USER, payload)

export const addUserToRole = (payload) => api.post(ADD_USER_ROLE, payload)

export const listGroupOfUser = (payload) => api.post(LIST_GROUP_USER, payload)

export const removeUserFromGroup = (payload) => api.post(REMOVE_USER_GROUP, payload)

export const listRoleOfUser = (payload) => api.post(LIST_ROLE_USER, payload)

export const countOfUser = (payload) => api.post(COUNT_USER, payload)

export const changePassword = (payload) => api.post(CHANGE_PASS, payload)

export const findUser = (payload) => api.post(FIND_USER, payload)

export const filterByStatus = (payload) => api.post(FILTER_STATUS, payload)

export const filterByDescription = (payload) => api.post(FILTER_DESCRIPTION, payload)

export const filterByDisplayName = (payload) => api.post(FILTER_DISPLAYNAME, payload)

export const filterBranchCode = (payload) => api.post(FILTER_BRANCHCODE, payload)
