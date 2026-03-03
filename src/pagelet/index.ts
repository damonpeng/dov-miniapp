const towxml = require('../towxml/index');

Component({
  options: {
    multipleSlots: true // 启用多slot支持
  },

  // 组件外部可传属性
  properties: {
    images: {
      type: Array,
      value: [],
    },
    texts: {
      type: Array,
      value: [],
    },
    title: {
      type: String,
      value: '',
    },
  },

  // 组件内部数据
  data: {
    isShow: true,
    parsedTexts: [] as any[]
  },

  lifetimes: {
    created() {
    },

    ready() {
      console.log(`[pagelet][attached]`, this.data);

      // 转换 texts 数组为 towxml 格式
      if (this.data.texts && this.data.texts.length > 0) {
        const parsedTexts = this.data.texts.map((text: string) => {
          return towxml(text, 'markdown');
        });
        this.setData({ parsedTexts });
      }

      // 设置分享数据
      const app = getApp();
      const firstImage: any = this.data.images[0];
      app.dov.data.currentShareData = {
        title: this.data.title || '',
        imageUrl: typeof firstImage === 'string' ? firstImage : firstImage?.url || '',
      };
      this.setData({ isShow: true })
    }
  },

  relations: {
  },

  methods: {
    onClose() {
      const app = getApp();

      // 清空分享数据
      app.dov.data.currentShareData = null;
      this.setData({ isShow: false })
      this.triggerEvent('closePagelet');
    },

    onClickImage(event: any) {
      let urls: string[] = [];

      if (this.data.images.length > 0) {
        if (typeof this.data.images[0] === 'string') {
          urls = this.data.images;
        } else {
          this.data.images.forEach((item: any) => {
            urls.push(item.url);
          });
        }
      }

      wx.previewImage({
        urls,
        current: event.detail.src
      });
    },

    /**
    onClickDownload(event: any) {
      const imageSrc = event.currentTarget.dataset.src,
        _this = this;

      // save image @todo Ads
      wx.getImageInfo({
        src: imageSrc,
        success(resImage) {
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    _this.savePhoto.bind(_this)(resImage.path);
                  }
                })
              } else {
                _this.savePhoto.bind(_this)(resImage.path);
              }
            }
          });
        },
        fail() {
          console.error(`[dov]save failed: ${imageSrc}`);
        }
      });
    },

    onClickClose(event: any) {
      this.setData({
        imageViewerVisible: false
      });
    },

    savePhoto(filePath: string) {
      const _this = this;

      wx.saveImageToPhotosAlbum({
        filePath,
        success() {
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          });
        },
        fail() {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          });
        },
        complete() {
          // close image viewer
          _this.setData({
            imageViewerVisible: false
          });
        }
      });
    }
    */
  }
});
