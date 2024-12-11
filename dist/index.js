"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = exports.Dov = void 0;
const request_1 = __importDefault(require("./core/request"));
exports.http = request_1.default;
const manifest_1 = __importDefault(require("./core/manifest"));
class Dov {
    constructor(manifestURL) {
        this.manifest = new manifest_1.default();
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
    async parseDataByRouter(router) {
        const script = this.manifest.getPageScriptURL(router);
        if (script) {
            const response = await request_1.default.get(script);
            this.manifest.parse(response);
        }
    }
    /**
     * Start page
     * @param options
     */
    start(options) {
        if (options.audio) {
            wx.setInnerAudioOption({
                obeyMuteSwitch: false // 不遵循手机静音开关
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
    parsePageSettings(pageConfig) {
        if (pageConfig?.settings) {
            // settings.keepScreenOn
            if (pageConfig.settings.keepScreenOn) {
                wx.setKeepScreenOn({
                    keepScreenOn: true
                });
            }
            else {
                wx.setKeepScreenOn({
                    keepScreenOn: false
                });
            }
        }
    }
}
exports.Dov = Dov;
