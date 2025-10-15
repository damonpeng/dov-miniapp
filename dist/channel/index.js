"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = getApp();
Component({
    options: {
        multipleSlots: true // 启用多slot支持
    },
    properties: {
        router: String,
        channel: {
            type: null,
            value: {},
        },
        items: {
            type: Array,
            value: [],
        },
        site: {
            type: Object,
            value: {},
        }
    },
    data: {
        currentPage: '',
        currentChannel: '',
    },
    lifetimes: {
        async ready() {
            console.log(`[channel][attached] ${this.data.channel.title}`, this.data);
            console.log('app.dov.data', app.dov.data);
            const { path, query } = wx.getLaunchOptionsSync();
            let currentChannel = '', currentPage = '';
            if (query && (query.channel || query.page)) {
                if (query.channel) {
                    currentChannel = query.channel;
                    app.dov.setChannelData(currentChannel);
                }
                if (query.page) {
                    currentPage = query.page;
                }
                else {
                    currentPage = this.data.channel.items[0].router;
                }
            }
            else {
                currentPage = this.data.items[0].router; // ???
            }
            this.updateCurrentTabbar(currentChannel);
            app.dov.setPageData(currentPage);
            this.updateCurrentTab(currentPage);
            wx.reportEvent('exposure', {
                'channel': this.data.currentChannel,
                'page': this.data.currentPage,
                'query': ''
            });
        }
    },
    relations: {},
    methods: {
        // switch tab
        onChangeTab(event) {
            const router = event.detail.name;
            app.dov.setPageData(router);
            this.updateCurrentTab(router);
            wx.reportEvent('exposure', {
                'channel': this.data.currentChannel,
                'page': this.data.currentPage,
                'query': ''
            });
        },
        // switch tabbar
        async onChangeTabbar(event) {
            // 设置一级tab
            const router = event.detail;
            this.updateCurrentTabbar(router);
            await app.dov.setChannelData(router);
            // 设置二级tab
            const pageRouter = this.getFirstPageRouter();
            app.dov.setPageData(pageRouter);
            this.updateCurrentTab(pageRouter);
            wx.reportEvent('exposure', {
                'channel': this.data.currentChannel,
                'page': this.data.currentPage,
                'query': ''
            });
        },
        // hight current tab
        updateCurrentTab(router) {
            let currentPage = '';
            if (router) {
                currentPage = router;
            }
            else {
                // set the first page
                currentPage = this.getFirstPageRouter();
            }
            this.setData({
                currentPage
            });
            app.dov.data.currentPage = currentPage;
        },
        // hight current tabbar
        updateCurrentTabbar(router) {
            let currentChannel = '';
            // reset tab first, to avoid white screen.
            this.setData({
                currentPage: ''
            });
            if (router) {
                currentChannel = router;
            }
            else {
                currentChannel = this.data.router;
            }
            this.setData({
                currentChannel
            });
            app.dov.data.currentChannel = currentChannel;
        },
        getFirstPageRouter() {
            return this.data.channel.items[0].router || '';
        }
    }
});
