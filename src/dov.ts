import FontFace from './core/fontface';

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
          module: dov.manifest.getModule(router)
        });

        dov.parsePageSettings(pageData);
      };

      dov.setChannelData = async (router: string) => {
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
      dov.openUrl = (url: string) => {
        if (url.startsWith('/') || url.startsWith('ImageViewer#')) {
          this.setData({
            pagelet: {
              visible: true,
              content: 'ada',
              url
            }
          });
        } else if (/^weapp:\/\//.test(url)) {
          const [ignore, appId, path] = url.match(/weapp:\/\/([^/|$]*)([^$]*)/);

          wx.navigateToMiniProgram({
            appId,
            path
          })
        } else if (/#小程序:\/\//.test(url)) {
          wx.navigateToMiniProgram({
            shortLink: url
          });
        }
      }
    },

    async attached() {
      const dov = app.dov;
      const { router } = this.data;

      // init framework data
      await dov.setupManifest();

      const { fontface } = dov.manifest.site?.settings;
      if (fontface) {
        new FontFace(fontface);
      }

      // get page data
      await dov.parseDataByRouter(router);

      const site = dov.manifest.getSite();
      const styleSettings = site?.settings?.style;

      let styles: any = [];
      if (styleSettings) {
        Object.keys(styleSettings).forEach(key => {
          // exclude custom added styles
          if (key && !['--font-family', '--background-image'].includes(key)) {
            if (key === '--base-font-family') {
              // append default fonts
              styles.push(`font-family:${styleSettings[key]}, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif`);
            } else {
              // vant defined css variables
              styles.push(`${key}:${styleSettings[key]}`);
            }
          }
        });
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

  relations: {
  },

  methods: {
  }
});
