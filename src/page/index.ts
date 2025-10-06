Component({
  options: {
    multipleSlots: true // 启用多slot支持
  },

  // 组件外部可传属性
  properties: {
    items: {
      type: Array,
      value: [],
    },
    page: {
      type: null,
      value: {},
    },
    pagelets: {
      type: null,
      value: {},
    },
    site: {
      type: null,
      value: {},
    }
  },

  // 组件内部数据
  data: {
  },

  lifetimes: {
    ready() {
      console.log(`[page][attached] ${this.data.page.title}`, this.data);
    }
  },

  relations: {
  },

  methods: {
    onClickFeedback(event: any) {
      const productId = event.target.dataset.productId;
      if (!productId) {
        return;
      }

      // 上报到兔小槽 https://txc.qq.com/helper/WEAPPGuide
      const deviceInfo = wx.getDeviceInfo(),
        windowInfo = wx.getWindowInfo(),
        appBaseInfo = wx.getAppBaseInfo(),
        systemSetting = wx.getSystemSetting(),
        appAuthorizeSetting = wx.getAppAuthorizeSetting(),
        launchOptions = wx.getLaunchOptionsSync();

      const [os, osVersion] = deviceInfo.system.split(' ');

      wx.getNetworkType({
        success(netResult) {
          wx.openEmbeddedMiniProgram({
            appId: "wx8abaf00ee8c3202e",
            extraData: {
              id: productId,
              customData: {
                clientInfo: JSON.stringify(deviceInfo),
                clientVersion: appBaseInfo.version,
                os,
                osVersion,
                netType: netResult.networkType,
                customInfo: JSON.stringify({
                  windowInfo,
                  appBaseInfo,
                  systemSetting,
                  appAuthorizeSetting,
                  launchOptions
                })
              }
            }
          })
        }
      })
    }
  }
});
