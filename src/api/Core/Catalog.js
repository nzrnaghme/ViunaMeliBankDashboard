import { LIST_CATALOG } from "../endpoints";
import api from "../interceptor";

export const getListCatalog = (payload) => api.post(LIST_CATALOG, payload);