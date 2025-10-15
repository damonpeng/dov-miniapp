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
    constructor(manifestURL, siteRoot) {
        this.manifest = new manifest_1.default(siteRoot);
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
    async parseDataByRouter(router) {
        let result = null;
        const page = this.manifest.getPage(router);
        if (page && page.items) {
            result = page;
        }
        else {
            const script = this.manifest.getPageScriptURL(router);
            if (script) {
                const response = await request_1.default.get(script);
                result = this.manifest.parse(response);
            }
        }
        return result;
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
