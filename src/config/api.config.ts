let basicURL: string = ''

if (process.env.NODE_ENV === 'development') {
    basicURL = '/api'
} else {
    basicURL = window.location.origin + '/api'
}

// 登录系统
export const USER_LOGIN = `${basicURL}/login`
// 用户注册
export const USER_REGISTER = `${basicURL}/register`

// 获取身体部位
export const GET_PART_LIST = `${basicURL}/part`

// 获取科室
export const GET_DEPARTMENT_LIST = `${basicURL}/department`

// 检索疾病
export const GET_DISEASE_LIST = `${basicURL}/disease`

// 获取漫画数据
export const GET_CARTOON_LIST = `${basicURL}/cartoon`
// 获取问答数据
export const GET_QUESTION_LIST = `${basicURL}/question`


