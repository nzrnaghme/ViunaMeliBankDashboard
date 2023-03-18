import { ADD_GROUP, ADD_GROUP_GROUP, ADD_GROUP_MEMBER, EDIT_GROUP, LIST_GROUPS, REMOVE_GROUP } from "../endpoints";
import api from "../interceptor";

export const getAllGroups = () => api.post(LIST_GROUPS)

export const removeGroup = (payload) => api.post(REMOVE_GROUP, payload);

export const editeGroup = (payload) => api.post(EDIT_GROUP, payload);

export const addGroup = (payload) => api.post(ADD_GROUP, payload);

export const addGroupMember = (payload) => api.post(ADD_GROUP_MEMBER, payload);

export const addGroupToGroup = (payload) => api.post(ADD_GROUP_GROUP, payload);


