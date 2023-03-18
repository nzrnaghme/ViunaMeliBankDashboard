import { ADD_USER, EDIT_USER, LIST_USERS, REMOVE_USER } from "../endpoints";
import api from "../interceptor";

export const getListUser = () => api.post(LIST_USERS);

export const removeUser = (payload) => api.post(REMOVE_USER, payload)

export const insertUser = (payload) => api.post(ADD_USER, payload)

export const editUser = (payload) => api.post(EDIT_USER, payload)

