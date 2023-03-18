import { ADD_ROLE, EDIT_ROLE, LIST_ROLLS, REMOVE_ROLE } from "../endpoints";
import api from "../interceptor";

export const getAllRoles = () => api.post(LIST_ROLLS);

export const editRole = (payload) => api.post(EDIT_ROLE, payload);

export const addRole = (payload) => api.post(ADD_ROLE, payload);

export const removeRole = (payload) => api.post(REMOVE_ROLE, payload);

