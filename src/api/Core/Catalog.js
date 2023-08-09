import { LIST_CATALOG, CREATE_CATALOG, REMOVE_CATALOG, DETAIL_CATALOG } from "../endpoints";
import api from "../interceptor";

export const getListCatalog = (payload) => api.post(LIST_CATALOG, payload);

export const createCatalog = (payload) => api.post(CREATE_CATALOG, payload);

export const removeCatalog = (payload) => api.post(REMOVE_CATALOG, payload);

export const detailCatalog = (payload) => api.post(DETAIL_CATALOG, payload);
