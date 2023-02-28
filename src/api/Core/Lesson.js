import { ADD_LESSON, DELETE_LESSON, GETALL_LESSONS, GETALL_LESSON_BY_ID, GETALL_MAIN_CATEGORY, GET_LESSON_FOR_COURSE_BY_ID, PAGINATION_GETALL_LESSONS, UPDATE_LESSON } from "../endpoints";
import api from "../interceptor";

export const getAllLesson = () => api.get(GETALL_LESSONS)

export const getLessonById = payload => api.get(GETALL_LESSON_BY_ID(payload))

export const lessonByPagination = payload => api.get(PAGINATION_GETALL_LESSONS(payload))

export const getLessonForCourseById = payload => api.get(GET_LESSON_FOR_COURSE_BY_ID(payload))

export const getAllCategory = () => api.get(GETALL_MAIN_CATEGORY)

export const removeLesson = payload => api.delete(DELETE_LESSON(payload))

export const updateLesson = payload => api.put(UPDATE_LESSON(payload.id), {
    lessonName: payload.lessonName,
    topics: payload.topics,
    description: payload.description,
    image: payload.image,
    category: payload.category
})

export const createLesson = payload => api.post(ADD_LESSON, {
    lessonName: payload.lessonName,
    topics: payload.topics,
    description: payload.description,
    image: payload.image,
    category: payload.category
})