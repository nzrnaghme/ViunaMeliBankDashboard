import { LISTCONFIG } from "api/endpoints";
import api from "../interceptor";

export const getAllConfigs = (payload) => api.post(LISTCONFIG, payload);
