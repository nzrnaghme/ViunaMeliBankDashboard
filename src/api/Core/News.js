import { ADD_NEWS, DELETE_NEWS, GETALL_NEWS, GETALL_NEWS_BY_ID, GET_TOP_ARTICLES, GET_TOP_NEWS, PAGINATION_GETALL_NEWS, UPDATE_NEWS_BY_ID } from "../endpoints";
import api from "../interceptor";

export const getAllNews = () => api.get(GETALL_NEWS)

export const getPaginationNews = payload => api.get(PAGINATION_GETALL_NEWS(payload))

export const topNews = () => api.get(GET_TOP_NEWS);

export const topArticles = () => api.get(GET_TOP_ARTICLES)

export const getNewsById = payload => api.get(GETALL_NEWS_BY_ID(payload))

export const updateNewsById = payload => api.put(UPDATE_NEWS_BY_ID(payload.id), {
    title: payload.title,
    text: payload.text,
    image: payload.image,
    category: payload.category
})


export const deleteNews = payload => api.delete(DELETE_NEWS(payload))

export const createNews_Articles = payload => api.post(ADD_NEWS,  payload )