Component({
  options: {
    multipleSlots: true // 启用多slot支持
  },

  // 组件外部可传属性
  properties: {
    pagelet: {
      type: Object,
      value: {},
    },
    site: {
      type: Object,
      value: {},
    }
  },

  // 组件内部数据
  data: {
  },

  lifetimes: {
    created() {
      console.log(123123);
    },

    ready() {
      console.log('pagelet attached', this.data);
    }
  },

  relations: {
  },

  methods: {
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

  }
});
