import FontFace from './core/fontface';
import util from './util';

const app = getApp();

Component({
  options: {
    multipleSlots: true // 启用多slot支持
  },

  properties: {
    router: null,
    page: null
  },

  data: {
    isShowPagelet: false,
    pageletData: {},
    // site: null,
    // channel: null,
    // page: null,
  },

  // 组件数据字段监听器，用于监听 properties 和 data 的变化
  observers: {

  },

  lifetimes: {
    created() {
      const dov = app.dov;

      // map data to dov.
      dov.data = this.data;

      // allow other components to set data here.
      dov.setPageData = async (router: string) => {
        await dov.parseDataByRouter(router);

        const pageData = dov.manifest.getPage(router);

        this.setData({
          page: pageData,
        });

        dov.parsePageSettings(pageData);
      };

      dov.setChannelData = async (router: string) => {
        await dov.parseDataByRouter(router);

        const channel = dov.manifest.getChannel(router);

        this.setData({
          channel,
        });

        // load the first page as default.
        const queryParams = util.parseCurrentURL();
        await dov.setPageData(queryParams.page || channel.items[0].router);
      };

      // allow other components to set pagelet data here.
      dov.setPageletData = async (script: string) => {
        console.log('script', script)
        const pageletData = await dov.parseDataByRouter(script);
        const data = {
          isShowPagelet: true,
          pageletData
        }

        this.setData(data);
      };

      /**
       * Open url
       * @param url 
       */
      dov.openURL = dov.openUrl = async (url: string, pagelet: string) => {
        // dov internal route, dov://pagelet
        if (url.startsWith('dov:')) {
          const targetURI = url.split('#');
          const action = targetURI[0].substring(6);

          switch (action) {
            case 'pagelet':
              await app.dov.setPageletData(targetURI[1]);
              app.dov.data.currentPagelet = pagelet || '';
              break;
            default:
              console.error('Invalid openUrl', url);
          }
        } else if (/^weapp:\/\//.test(url)) {
          // weapp internal schema
          const matched = url.match(/weapp:\/\/([^/|$]*)([^$]*)/);

          if (matched && matched.length >= 3) {
            const appId = matched[1];
            const path = matched[2];

            wx.navigateToMiniProgram({
              appId,
              path
            });
          } else {
            console.error('Invalid openUrl', url);
          }
        } else if (/#小程序:\/\//.test(url)) {
          // weapp public schema
          wx.navigateToMiniProgram({
            shortLink: url
          });
        } else {
          console.error('[dov/dov.ts]', url);
        }
      }
    },

    async attached() {
      const dov = app.dov;
      const currentURL = util.parseCurrentURL();
      const pageRouter = currentURL.page;
      const channelRouter = this.data.router;

      // init framework data
      await dov.setupManifest();

      // @todo 支持离线，优先取本地有效期内的配置，并异步更新远程配置

      const { fontface } = dov.manifest.site?.settings;
      if (fontface) {
        new FontFace(fontface);
      }

      const site = dov.manifest.getSite();
      const styleSettings = site?.settings?.style;
      const fontSettings = site?.settings?.fontface;

      let styles: any = [];
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
        channel: dov.manifest.getChannel(channelRouter),
        page: {
          items: []
        },
        style: styles.join(';') || ''
      };

      // get page data
      let pageManifest: string = '';
      let firstPageRouter: string = '';
      data.channel.items.forEach((page: { router?: string; script?: string; }) => {
        !firstPageRouter && (firstPageRouter = page.router || '');
        if (page.router === pageRouter) {
          pageManifest = page.script || '';
        }
      });
      data.page = await dov.parseDataByRouter(pageRouter || firstPageRouter);

      // 非默认路由，重新指向下
      pageRouter && dov.setPageData(pageRouter);

      console.log(`[Manifest]`, JSON.stringify(data, null, 2));

      // 渲染主页面
      this.setData(data);

      // 判断是否还需要通过url传递的路由，渲染子页面
      const queryParams = util.parseCurrentURL();

      if (queryParams.pagelet) {
        let targetURL = '';

        // 遍历匹配manifest配置里的路由，找到对应link
        data.page.items.forEach((item: { items: any[]; }) => {
          item.items.forEach(subitem => {
            subitem.items.forEach((thirdItem: { router: string; link: string; }) => {
              if (thirdItem.router === queryParams.pagelet) {
                targetURL = thirdItem.link;
              }
            });
          });
        });

        dov.openURL(targetURL, queryParams.pagelet);
      }
    },

    // 在组件在视图层布局完成后执行
    // ready() { },

    // 在组件实例被移动到节点树另一个位置时执行
    moved() { },

    // 在组件实例被从页面节点树移除时执行
    detached() { },

    // 每当组件方法抛出错误时执行
    error() { }
  },

  relations: {
  },

  methods: {
    onClosePagelet() {
      // 预留时间给弹窗关闭动画
      setTimeout(() => {
        this.setData({
          isShowPagelet: false,
          pageletData: {},
        });
      }, 300);

      app.dov.data.currentPagelet = '';
    },
  }
});
