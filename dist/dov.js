"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fontface_1 = __importDefault(require("./core/fontface"));
const app = getApp();
Component({
    properties: {
        router: null
    },
    data: {
    // site: [],
    // channel: [],
    // page: [],
    // module: []
    },
    // 组件数据字段监听器，用于监听 properties 和 data 的变化
    observers: {},
    lifetimes: {
        created() {
            const dov = app.dov;
            // map data to dov.
            dov.data = this.data;
            // allow other components to set data here.
            dov.setPageData = async (router) => {
                await dov.parseDataByRouter(router);
                const pageData = dov.manifest.getPage(router);
                this.setData({
                    page: pageData,
                    module: dov.manifest.getModule(router)
                });
                dov.parsePageSettings(pageData);
            };
            dov.setChannelData = async (router) => {
                await dov.parseDataByRouter(router);
                const channel = dov.manifest.getChannel(router);
                this.setData({
                    channel,
                    page: undefined,
                    module: undefined
                });
                // load the first page as default.
                await dov.setPageData(channel.items[0].router);
            };
            /**
             * Open url
             * @param url
             */
            dov.openUrl = (url) => {
                if (url.startsWith('/') || url.startsWith('ImageViewer#')) {
                    this.setData({
                        pagelet: {
                            visible: true,
                            content: 'ada',
                            url
                        }
                    });
                }
                else if (/^weapp:\/\//.test(url)) {
                    const matched = url.match(/weapp:\/\/([^/|$]*)([^$]*)/);
                    if (matched && matched.length >= 3) {
                        const appId = matched[1];
                        const path = matched[2];
                        wx.navigateToMiniProgram({
                            appId,
                            path
                        });
                    }
                    else {
                        console.error('Invalid weapp url', url);
                    }
                }
                else if (/#小程序:\/\//.test(url)) {
                    wx.navigateToMiniProgram({
                        shortLink: url
                    });
                }
                else {
                    console.error('Invalid url', url);
                }
            };
        },
        async attached() {
            const dov = app.dov;
            const { router } = this.data;
            // init framework data
            await dov.setupManifest();
            const { fontface } = dov.manifest.site?.settings;
            if (fontface) {
                new fontface_1.default(fontface);
            }
            // get page data
            await dov.parseDataByRouter(router);
            const site = dov.manifest.getSite();
            const styleSettings = site?.settings?.style;
            const fontSettings = site?.settings?.fontface;
            let styles = [];
            if (styleSettings) {
                Object.keys(styleSettings).forEach(key => {
                    // vant defined css variables
                    key && styles.push(`${key}:${styleSettings[key]}`);
                });
            }
            // customize global fontface
            if (fontSettings) {
                styles.push(`font-family:${fontSettings.family || ''}, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif`);
            }
            const data = {
                site,
                channel: dov.manifest.getChannel(router),
                page: dov.manifest.getPage(router),
                module: dov.manifest.getModule(router),
                style: styles.join(';') || ''
            };
            console.log('JSON data', data);
            this.setData(data);
        },
        // 在组件在视图层布局完成后执行
        ready() {
        },
        // 在组件实例被移动到节点树另一个位置时执行
        moved() { },
        // 在组件实例被从页面节点树移除时执行
        detached() { },
        // 每当组件方法抛出错误时执行
        error() { }
    },
    pageLifetimes: {
        // 组件所在的页面被展示时执行
        show() {
        },
        // 组件所在的页面被隐藏时执行
        hide() {
            // 页面被隐藏
        },
        // 组件所在的页面尺寸变化时执行
        resize(size) {
            // 页面尺寸变化
        },
        // 组件所在页面路由动画完成时执行
        // routeDone() {
        // }
    },
    relations: {},
    methods: {}
});
