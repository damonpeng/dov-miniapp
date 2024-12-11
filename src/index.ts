import http from './core/request';
import Manifest from './core/manifest';

interface StartPageOptions {
  video?: string,
  audio?: string,
  poster?: string
}

class Dov {
  manifest: Manifest;
  manifestURL: string;

  constructor(manifestURL: string) {
    this.manifest = new Manifest();
    this.manifestURL = manifestURL;
  }

  /**
   * Get scripts with version from the manifest. Call once.
   */
  async setupManifest() {
    return await this.manifest.parseFromURL(this.manifestURL);
  }

  /**
   * Parse router JSON data
   * @param pageName page name
   */
  async parseDataByRouter(router: string) {
    const script = this.manifest.getPageScriptURL(router);

    if (script) {
      const response: any = await http.get(script);
      this.manifest.parse(response);
    }
  }

  /**
   * Start page
   * @param options
   */
  start(options: StartPageOptions) {
    if (options.audio) {
      wx.setInnerAudioOption({
        obeyMuteSwitch: false  // 不遵循手机静音开关
      });

      const audioContext = wx.createInnerAudioContext({
        useWebAudioImplement: true
      });
      audioContext.src = options.audio;
      audioContext.play();
    }
  }

  /**
   * Open url
   * @param url 
   */
  // openUrl(url: string) {
  //   if (/^weapp:\/\//.test(url)) {
  //     const [ignore, appId, path] = url.match(/weapp:\/\/([^/|$]*)([^$]*)/);

  //     wx.navigateToMiniProgram({
  //       appId,
  //       path
  //     })
  //   } else if (/#小程序:\/\//.test(url)) {
  //     wx.navigateToMiniProgram({
  //       shortLink: url
  //     });
  //   }
  // }

  parsePageSettings(pageConfig: any) {
    if (pageConfig?.settings) {
      // settings.keepScreenOn
      if (pageConfig.settings.keepScreenOn) {
        wx.setKeepScreenOn({
          keepScreenOn: true
        });
      } else {
        wx.setKeepScreenOn({
          keepScreenOn: false
        });
      }
    }
  }
}

export {
  Dov,
  http
}
