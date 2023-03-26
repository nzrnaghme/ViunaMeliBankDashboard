import { LOGINUSER } from "../endpoints";
import api from "../interceptor";

export const loginUser = (payload) => api.post(LOGINUSER, payload);