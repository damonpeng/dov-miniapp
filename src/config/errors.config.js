/**
 * 后台常用错误码定义
 */

// HTTP status error
const status = {
    400: '请求格式错误',
    401: '登录失效',
    403: '未授权的访问',
    500: '服务器错误，请稍后再来',
    503: '服务器繁忙，请稍后再来',
};

// required, copy from c++ defined
const code = {
    MYSQL_ERROR: 1
};

// optional, user friendly tips
const message = {
    MYSQL_ERROR: '系统错误'
};

export default {
    status,
    code,
    message,
};
