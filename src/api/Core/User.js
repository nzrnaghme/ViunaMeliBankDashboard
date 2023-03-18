import { LIST_USERS, REMOVE_USER } from "../endpoints";
import api from "../interceptor";

export const getListUser = () => api.post(LIST_USERS);

export const removeUser = () => api.post(REMOVE_USER)

