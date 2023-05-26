import {
    ADD_GROUP,
    ADD_GROUP_GROUP,
    ADD_GROUP_MEMBER,
    COUNT_GROUP,
    EDIT_GROUP,
    LIST_GROUPS,
    LIST_GROUP_GROUP,
    REMOVE_GROUP,
    REMOVE_GROUP_GROUP,
    LIST_ROLE_GROUP,
    FIND_GROUP,
    FILTER_STATUS_GROUP,
    FILTER_DESCRIPTION_GROUP,
    FILTER_DEISPLAYNAME_GROUP
} from "../endpoints";
import api from "../interceptor";

export const getAllGroups = (payload) => api.post(LIST_GROUPS, payload)

export const removeGroup = (payload) => api.post(REMOVE_GROUP, payload);

export const editeGroup = (payload) => api.post(EDIT_GROUP, payload);

export const addGroup = (payload) => api.post(ADD_GROUP, payload);

export const addGroupMember = (payload) => api.post(ADD_GROUP_MEMBER, payload);

export const addGroupToGroup = (payload) => api.post(ADD_GROUP_GROUP, payload);

export const listGroupToGroup = (payload) => api.post(LIST_GROUP_GROUP, payload);

export const listRoleOfGroup = (payload) => api.post(LIST_ROLE_GROUP, payload);

export const removeGroupToGroup = (payload) => api.post(REMOVE_GROUP_GROUP, payload);

export const countOfGroup = (payload) => api.post(COUNT_GROUP, payload);

export const findGroup = (payload) => api.post(FIND_GROUP, payload);

export const filterByStatusGroup = (payload) => api.post(FILTER_STATUS_GROUP, payload);

export const filterByDescriptionGroup = (payload) => api.post(FILTER_DESCRIPTION_GROUP, payload);

export const filterByDisplayNameGroup = (payload) => api.post(FILTER_DEISPLAYNAME_GROUP, payload);
