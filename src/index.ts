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
  siteRoot: string;

  constructor(manifestURL: string, siteRoot: string) {
    this.manifest = new Manifest(siteRoot);
    this.manifestURL = manifestURL;
    this.siteRoot = siteRoot;
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
    let result = null;
    const page = this.manifest.getPage(router);

    if (page && page.items) {
      result = page;
    } else {
      const script = this.manifest.getPageScriptURL(router);
      if (script) {
        const response: any = await http.get(script);
        result = this.manifest.parse(response);
      }
    }

    return result;
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
