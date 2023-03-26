import { ADD_USER, ADD_USER_ROLE, EDIT_USER, LIST_USERS, REMOVE_USER } from "../endpoints";
import api from "../interceptor";

export const getListUser = () => api.post(LIST_USERS);

export const removeUser = (payload) => api.post(REMOVE_USER, payload)

export const insertUser = (payload) => api.post(ADD_USER, payload)

export const editUser = (payload) => api.post(EDIT_USER, payload)

export const addUserToRole = (payload) => api.post(ADD_USER_ROLE, payload)

