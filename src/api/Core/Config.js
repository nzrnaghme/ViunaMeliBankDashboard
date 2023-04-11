import {
    REMOVE_CONFIG,
    LIST_CONFIG,
    ADD_CONFIG,
    EDIT_CONFIG
} from "api/endpoints";
import api from "../interceptor";

export const getAllConfigs = (payload) => api.post(LIST_CONFIG, payload);

export const removeConfig = (payload) => api.post(REMOVE_CONFIG, payload);

export const addConfig = (payload) => api.post(ADD_CONFIG, payload);

export const editConfig = (payload) => api.post(EDIT_CONFIG, payload);
