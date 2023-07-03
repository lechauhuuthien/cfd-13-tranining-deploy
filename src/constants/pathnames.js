const COURSES_PATH = '/courses'
const PROFILE_PATH = '/profile'

export const PATHS = {
    HOME: '/',
    COURSES: COURSES_PATH,
    COURSE_DETAIL: COURSES_PATH + '/:slug', // /courses/khoa-hoc-lap-trinh-frontend-newbie-28
    COURSE_REGISTER: '/register/:slug', // /register/khoa-hoc-lap-trinh-frontend-newbie-28
    PROFILE: {
        INDEX: PROFILE_PATH,
        COURSES: PROFILE_PATH + '/my-courses', // /profile/my-courses
        PAYMENT: PROFILE_PATH + '/my-payment' // /profile/my-payment
    },
    BLOG: '/blog',
    CONTACT: '/contact',
    ABOUT: '/about',

}