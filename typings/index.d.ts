// 解决Node.js和微信小程序类型定义冲突
// 这个文件用于覆盖Node.js中的exports定义，防止与微信小程序的类型定义冲突

// 确保微信小程序的类型定义优先于Node.js的类型定义
/// <reference types="miniprogram-api-typings" />
