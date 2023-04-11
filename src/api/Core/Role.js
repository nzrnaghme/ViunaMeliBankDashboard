import {
    ADD_MEMBER_ROLE,
    ADD_ROLE,
    COUNT_ROLE,
    EDIT_ROLE,
    LIST_MEMBER_ROLE,
    LIST_ROLLS,
    REMOVE_MEMBER_ROLE,
    REMOVE_ROLE
} from "../endpoints";
import api from "../interceptor";

export const getAllRoles = (payload) => api.post(LIST_ROLLS, payload);

export const editRole = (payload) => api.post(EDIT_ROLE, payload);

export const addRole = (payload) => api.post(ADD_ROLE, payload);

export const removeRole = (payload) => api.post(REMOVE_ROLE, payload);

export const addMemberToRole = (payload) => api.post(ADD_MEMBER_ROLE, payload);

export const removeMemberToRole = (payload) => api.post(REMOVE_MEMBER_ROLE, payload);

export const listMemberToRole = (payload) => api.post(LIST_MEMBER_ROLE, payload);

export const countOfRole = (payload) => api.post(COUNT_ROLE, payload);
