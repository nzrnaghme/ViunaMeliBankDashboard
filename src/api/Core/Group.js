import { LIST_GROUPS } from "../endpoints";
import api from "../interceptor";

export const getAllGroups = () => api.post(LIST_GROUPS)