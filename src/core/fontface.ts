
interface FontFace {
  family: string;
  source: string;
}

class FontFace {
  fontface: FontFace;

  constructor(fontface: FontFace) {
    this.fontface = fontface;

    const fontPath = this.getFontPath();
    wx.getFileSystemManager().access({
      path: fontPath,
      success: () => {
        console.info(`[dov]font read: ${fontPath}`);
        this.loadFontFace();
      },
      fail: () => {
        this.downloadFontFace();
      }
    });
  }

  getFontPath() {
    return `${wx.env.USER_DATA_PATH}/${this.fontface.family}.ttf`;
  }

  downloadFontFace() {
    const { source } = this.fontface;

    wx.downloadFile({
      url: source, //仅为示例，并非真实的资源
      success: (res) => {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          const fontPath = this.getFontPath();

          wx.getFileSystemManager().saveFile({
            tempFilePath: res.tempFilePath,
            filePath: fontPath,
            success: () => {
              console.info(`[dov]font saved: ${fontPath}`);
              this.loadFontFace();
            }
          });

        }
      }
    });
  }

  loadFontFace() {
    const { family } = this.fontface;

    wx.getFileSystemManager().readFile({
      filePath: this.getFontPath(),
      encoding: 'base64',
      success: (res) => {
        wx.loadFontFace({
          global: true,
          family,
          source: `url("data:font/ttf;base64,${res.data}")`,
        });
      }
    });
  }
}

export default FontFace;
