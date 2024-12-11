"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = getApp();
Component({
    options: {
        multipleSlots: true // 启用多slot支持
    },
    properties: {
        router: String,
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
        activeTab: '',
        activeTabbar: ''
    },
    lifetimes: {
        async ready() {
            console.log('channel attached', this.data);
            const { path, query } = wx.getLaunchOptionsSync();
            if (query && (query.tab || query.tabbar)) {
                if (query.tabbar) {
                    this.updateCurrentTabbar(query.tabbar);
                    await app.dov.setChannelData(query.tabbar);
                }
                if (query.tab) {
                    app.dov.setPageData(query.tab);
                    this.updateCurrentTab(query.tab);
                }
            }
            else {
                const defaultRouter = this.data.items[0].router;
                this.updateCurrentTabbar();
                app.dov.setPageData(defaultRouter);
                this.updateCurrentTab(defaultRouter);
            }
            wx.reportEvent('exposure', {
                'tabbar': this.data.activeTabbar,
                'tab': this.data.activeTab,
                'query': ''
            });
            console.info(`tabbar=${query.tabbar}&tab=${query.tab}`);
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
                'tabbar': this.data.activeTabbar,
                'tab': this.data.activeTab,
                'query': ''
            });
        },
        // switch tabbar
        async onChangeTabbar(event) {
            const router = event.detail;
            this.updateCurrentTabbar(router);
            await app.dov.setChannelData(router);
            this.updateCurrentTab();
            wx.reportEvent('exposure', {
                'tabbar': this.data.activeTabbar,
                'tab': this.data.activeTab,
                'query': ''
            });
        },
        // hight current tab
        updateCurrentTab(router) {
            let activeTab = '';
            if (router) {
                activeTab = router;
            }
            else {
                // set the first page
                activeTab = this.data.items[0].router;
            }
            this.setData({
                activeTab
            });
            app.dov.data.activeTab = activeTab;
        },
        // hight current tabbar
        updateCurrentTabbar(router) {
            let activeTabbar = '';
            // reset tab first, to avoid white screen.
            this.setData({
                activeTab: ''
            });
            if (router) {
                activeTabbar = router;
            }
            else {
                activeTabbar = this.data.router;
            }
            this.setData({
                activeTabbar
            });
            app.dov.data.activeTabbar = activeTabbar;
        }
    }
});
