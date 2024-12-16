/**
 * 后台常用错误码定义
 */
import errorsConfig from '../config/errors.config.js';

let nameMapping = {};
const { code, message, status } = errorsConfig;
const init = () => {
    Object.keys(code).forEach(name => {
        nameMapping[code[name]] = name;
    });
};
init();

export default {
    status,
    code,
    message,

    getMessage(code, defaultMessage = '') {
        let message = [],
            codeName = nameMapping[code];

        // 默认展示：前端提示语 （返回码名）
        // 未定义前端提示语：（返回码名）
        // 什么都没定义：原始返回码
        if (codeName) {
            if (this.message[codeName]) {
                message.push(this.message[codeName]);
            } else {
                message.push(defaultMessage || '');
            }
        } else {
            message.push(defaultMessage || code);
        }

        return message.join(' ');
    }
};
