export const API = 'https://api.noorgon.sepehracademy.ir/api/';
export const API_V = 'http://5.201.178.229:9502/Utopia/rest/';

//user
export const LIST_USERS = `${API_V}user/lstusers?api_key=X-API-Key&API_KEY_VALUE=sd3209Sdkl2DF3dfzsDGEsZ8476`;
export const REMOVE_USER = `${API_V}user/removeusers?api_key=X-API-Key&API_KEY_VALUE=sd3209Sdkl2DF3dfzsDGEsZ8476`;


//Group
export const LIST_GROUPS = `${API_V}group/lstgroups?api_key=X-API-Key&API_KEY_VALUE=sd3209Sdkl2DF3dfzsDGEsZ8476`;
export const REMOVE_GROUP = `${API_V}group/removegroups?api_key=X-API-Key&API_KEY_VALUE=sd3209Sdkl2DF3dfzsDGEsZ8476`;
export const EDIT_GROUP = `${API_V}group/editgroups?api_key=X-API-Key&API_KEY_VALUE=sd3209Sdkl2DF3dfzsDGEsZ8476`;
export const ADD_GROUP = `${API_V}group/addgroups??api_key=X-API-Key&API_KEY_VALUE=sd3209Sdkl2DF3dfzsDGEsZ8476`;
export const ADD_GROUP_MEMBER = `${API_V}group/addusertogroup??api_key=X-API-Key&API_KEY_VALUE=sd3209Sdkl2DF3dfzsDGEsZ8476`;


//Roll
export const LIST_ROLLS = `${API_V}role/lstroles?api_key=X-API-Key&API_KEY_VALUE=sd3209Sdkl2DF3dfzsDGEsZ8476`;

//login register
export const REGISTER = `${API}auth/register`
export const LOGIN = `${API}auth/login`
export const FORGET_PASS = `${API}forgetpassword`
export const RESET_PASS = payload => `${API}resetPassword/${payload}`

//register employee
export const REGISTER_EMPLOYEE = `${API}auth/employee/register`
export const LOGIN_EMPLOYEE = `${API}auth/employee/login`

//student managment
export const GETALL_STUDENT = `${API}student/getall`
export const PAGINATION_GETALL_STUDENT = payload => `${API}student/list?pagenumber=${payload.pageNumber}&pagesize=${payload.pageSize}`
export const GET_STUDENT_BY_ID = payload => `${API}student/${payload}`
export const UPDATE_STUDENT = payload => `${API}student/${payload}`
export const DELETE_STUDENT = payload => `${API}student/${payload}`
export const ACTIVE_STUDENT = payload => `${API}student/active/${payload}`
export const DEACTIVE_STUDENT = payload => `${API}student/deactive/${payload}`

//course
export const GETALL_COURSES = `${API}course/getall`
export const PAGINATION_GETALL_COURSES = payload => `${API}course/list?pagenumber=${payload.pageNumber}&pagesize=${payload.pageSize}`
export const GETALL_COURSES_BY_ID = payload => `${API}course/${payload}`
export const CREATE_COURSE = `${API}course`
export const UPDATE_COURSE = payload => `${API}course/${payload}`
export const DELETE_COURSE = payload => `${API}course/${payload}`
export const ADD_STUDENT_IN_COURSE = payload => `${API}course/addStudentToCourse/${payload}`
export const REMOVE_STUDENT_IN_COURSE = payload => `${API}course/removeStudentFromCourse/${payload}`
export const LIKE_COURSE = `${API}course/like`
export const DISLIKE_COURSE = `${API}course/dislike`
export const COUNT_LIKE_COURSE = payload => `${API}course/likeCount/${payload}`

//lesson
export const GETALL_LESSONS = `${API}lesson`
export const GETALL_LESSON_BY_ID = payload => `${API}lesson/${payload}`
export const PAGINATION_GETALL_LESSONS = payload => `${API}lesson/list?pagenumber=${payload.pageNumber}&pagesize=${payload.pageSize}`
export const GET_LESSON_FOR_COURSE_BY_ID = payload => `${API}lesson/course/${payload}`
export const ADD_LESSON = `${API}lesson/add`
export const UPDATE_LESSON = payload => `${API}lesson/${payload}`
export const DELETE_LESSON = payload => `${API}lesson/${payload}`

//news
export const GETALL_NEWS = `${API}news`
export const PAGINATION_GETALL_NEWS = payload => `${API}news/list?pagenumber=${payload.pageNumber}&pagesize=${payload.pageSize}&category=${payload.news}`
export const GET_TOP_NEWS = `${API}news/topNews`
export const GET_TOP_ARTICLES = `${API}news/topArticles`
export const GETALL_NEWS_BY_ID = payload => `${API}news/${payload}`
export const GET_CATEGORY = `${API}news/category`
export const ADD_NEWS = `${API}news`
export const UPDATE_NEWS_BY_ID = payload => `${API}news/${payload}`
export const DELETE_NEWS = payload => `${API}news/${payload}`

//contact us
export const CONTACT_US = `${API}contactUs`

//comment
export const GETALL_COMMENTS = `${API}comments`
export const SEND_NEW_COMMENT = `${API}comments/send`
export const VERIFY_COMMENT = `${API}comments/verify`
export const ANSWER_COMMENT = `${API}comments/answer`

//employee
export const ALL_TEACHER = `${API}employee/getallteachers`
export const LAST_TEACHERS = `${API}employee/getlastteachers`
export const GET_EMPLOYEE_BY_ID = payload => `${API}employee/${payload}`
export const UPDATE_EMPLOYEE = payload => `${API}employee/${payload}`
export const ACTIVE_EMPLOYEE = payload => `${API}employee/active/${payload}`
export const DEACTIVE_EMPLOYEE = payload => `${API}employee/deactive/${payload}`
export const REMOVE_EMPLOYEE = payload => `${API}employee/${payload}`

export const GETALL_MAIN_CATEGORY = `${API}category/getall`
