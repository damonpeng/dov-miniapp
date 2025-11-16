export { }

const app = getApp();

enum ShareType {
  App,
  Timeline
};

function getShareInfo(shareType: ShareType) {
  // priority: page > site
  const settings = app.dov.data.page.settings?.shareInfo || app.dov.data.site.settings?.shareInfo;
  if (!settings) return undefined;

  const { site, channel, page, currentChannel = '', currentPage = '', currentPagelet = '' } = app.dov.data;

  const queryData = `channel=${currentChannel}&page=${currentPage}&pagelet=${currentPagelet}`;
  let title = settings['title'].replace('${default}', page.title ? `${channel.title}•${page.title}` : (site.title));
  let imageUrl = settings['image'].replace('${default}', '').replace('${logo}', site.icon || '');

  // 优先使用页面的分享信息 app.data.currentShareData
  if (app.dov.data.currentShareData?.title) {
    title = app.dov.data.currentShareData.title;
  }
  if (app.dov.data.currentShareData?.imageUrl) {
    imageUrl = app.dov.data.currentShareData.imageUrl;
  }

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
  console.log('shareInfo', shareInfo)

  return shareInfo;
}

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Behavior.html
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
