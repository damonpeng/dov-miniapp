"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = getApp();
var ShareType;
(function (ShareType) {
    ShareType[ShareType["App"] = 0] = "App";
    ShareType[ShareType["Timeline"] = 1] = "Timeline";
})(ShareType || (ShareType = {}));
;
function getShareInfo(shareType) {
    // priority: page > site
    const settings = app.dov.data.page.settings?.shareInfo || app.dov.data.site.settings?.shareInfo;
    if (!settings)
        return undefined;
    const { site, channel, page, activeTab, activeTabbar } = app.dov.data;
    const title = settings['title'].replace('${default}', page.title ? `${channel.title}•${page.title}` : (site.title));
    const queryData = `tabbar=${activeTabbar}&tab=${activeTab}`;
    const imageUrl = settings['image'].replace('${default}', '').replace('${logo}', site.icon || '');
    let shareInfo;
    switch (shareType) {
        case ShareType.Timeline:
            const query = settings['query'].replace('${default}', queryData);
            shareInfo = {
                title,
                query,
                imageUrl
            };
            break;
        case ShareType.App:
        default:
            // get current page's path
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            const path = settings['path'].replace('${default}', `${currentPage.route}?${queryData}`);
            shareInfo = {
                title,
                path,
                imageUrl
            };
            break;
    }
    console.log('shareInfo', shareInfo);
    return shareInfo;
}
module.exports = Behavior({
    methods: {
        onShareAppMessage() {
            return getShareInfo(ShareType.App);
        },
        onShareTimeline() {
            return getShareInfo(ShareType.Timeline);
        }
    }
});
